import { NextResponse } from 'next/server';
import { botSystemRole, botSystemRoleTwo } from '../botSystemRole';

const apiKey = process.env.NEXT_PUBLIC_OPENAI_KEY;
const apiUrl = process.env.NEXT_PUBLIC_OPENAI_URL || '';

export async function POST(request: Request) {
  const { message } = await request.json();

  if (!message) {
    return NextResponse.json({ error: 'Message is required' }, { status: 400 });
  }

  try {
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
          { 
            role: 'system', 
            content: botSystemRoleTwo,
          },
            { role: 'user', content: message },
        ],
        max_tokens: 70,
        temperature: 0.9,
      }),
    });

    const data = await openaiResponse.json();
    // const data = mockResponse

    if (openaiResponse.ok) {
      return NextResponse.json({ response: data.choices[0].message.content });
    } else {
      return NextResponse.json({ error: data.error.message }, { status: openaiResponse.status });
    }
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}


const mockResponse = {
  id: "chatcmpl-ANQetFpKPfn2E4s4usUaTPHFIkOMq",
  object: "chat.completion",
  created: 1730147383,
  model: "gpt-3.5-turbo-0125",
  choices: [
    {
      index: 0,
      message: {
        role: "assistant",
        content:
          "I'm sorry to hear that you're feeling overwhelmed. It's important to remember that it's okay to feel this way sometimes. Would you like to talk more about what's been on your mind and causing you to feel overwhelmed? Remember, you're not alone, and I'm here to listen and offer support.",
        refusal: null,
      },
      logprobs: null,
      finish_reason: "stop",
    },
  ],
  usage: {
    prompt_tokens: 31,
    completion_tokens: 63,
    total_tokens: 94,
    prompt_tokens_details: {
      cached_tokens: 0,
    },
    completion_tokens_details: {
      reasoning_tokens: 0,
    },
  },
  system_fingerprint: null,
};
