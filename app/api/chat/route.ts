import { NextResponse } from 'next/server';
import clientPromise from '../../lib/mongodb';
import { botSystemRole } from '../botSystemRole';

interface MessageObj {
  userId?: string;
  message: string;
  timestamp: string;
  role: string;
}

const apiKey = process.env.NEXT_PUBLIC_OPENAI_KEY;
const apiUrl = process.env.NEXT_PUBLIC_OPENAI_URL;

export async function POST(request: Request) {
  const messageObj: MessageObj = await request.json();

  if (!messageObj || !messageObj.message) {
    return NextResponse.json({ error: 'Message is required' }, { status: 400 });
  }

  try {
    const client = await clientPromise;
    const db = client.db('OpenMindChatCluter');
    const collection = db.collection('messages');

    if (!apiUrl) {
      return NextResponse.json(
        { error: 'API URL is not defined' },
        { status: 500 },
      );
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
        max_tokens: 150,
        temperature: 0.8,
      }),
    });

    const data = await openaiResponse.json();

    if (openaiResponse.ok) {
      return NextResponse.json({ response: data.choices[0].message.content });
    } else {
      return NextResponse.json(
        { error: data.error.message },
        { status: openaiResponse.status },
      );
    }
  } catch (error) {
    console.error('Error during POST:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 },
    );
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
    console.error('Error during GET:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 },
    );
  }
}

interface MessageInput {
  conversationId: string;
  userId: string;
  senderId: string;
  message: string;
  role: string;
}

export async function addMessageWithUser(input: MessageInput) {
  const client = await clientPromise;
  const db = client.db('openMindChat');
  const collection = db.collection('messages');

  const messageDoc = {
    conversationId: input.conversationId,
    userId: input.userId,
    senderId: input.senderId,
    message: input.message,
    timestamp: new Date().toISOString(),
    role: input.role,
  };

  const result = await collection.insertOne(messageDoc);
  return result.insertedId;
}
