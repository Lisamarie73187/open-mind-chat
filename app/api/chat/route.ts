import { NextResponse } from 'next/server';
import clientPromise from '../../lib/mongodb';
import { botSystemRole, botSystemRoleTwo } from '../botSystemRole';

interface MessageObj {
  message: string;
  timestamp: string;
  role: string;
}

const apiKey = process.env.NEXT_PUBLIC_OPENAI_KEY;
const apiUrl = process.env.NEXT_PUBLIC_OPENAI_URL || '';

export async function POST(request: Request) {
  const messageObj: MessageObj = await request.json();

  if (!messageObj || !messageObj.message) {
    return NextResponse.json({ error: 'Message is required' }, { status: 400 });
  }

  try {
    const client = await clientPromise;
    const db = client.db();

    const collection = db.collection('messages');

    const result = await collection.insertOne({
      message: messageObj.message,
      timestamp: new Date().toISOString(),
      role: messageObj.role,
    });

    if (!apiUrl) {
      return NextResponse.json({ error: 'API URL is not defined' }, { status: 500 });
    }

    const openaiResponse = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [
          { role: 'system', content: botSystemRole },
          { role: messageObj.role, content: messageObj.message },
        ],
        max_tokens: 70,
        temperature: 0.5,
      }),
    });

    const data = await openaiResponse.json();

    if (openaiResponse.ok) {
      return NextResponse.json({ response: data.choices[0].message.content });
    } else {
      return NextResponse.json({ error: data.error.message }, { status: openaiResponse.status });
    }
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}


export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db('myDatabase');
    const collection = db.collection('messages');

    const messages = await collection.find({}).toArray();

    return NextResponse.json({ messages }, { status: 200 });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}