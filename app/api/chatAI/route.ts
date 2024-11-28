import { NextResponse } from 'next/server';
import { botSystemRole } from '../botSystemRole';

const apiKey = process.env.NEXT_PUBLIC_OPENAI_KEY;
const apiUrl = process.env.NEXT_PUBLIC_OPENAI_URL;

export async function POST(request: Request) {
  const message: string = await request.json();
  console.log('message:', message);

  if (!message) {
    return NextResponse.json({ error: 'Message is required' }, { status: 400 });
  }

  try {
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
          { role: 'assistant', content: message },
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
