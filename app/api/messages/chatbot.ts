import { botSystemRole } from '../botSystemRole';

const apiKey = process.env.NEXT_PUBLIC_OPENAI_KEY;
const apiUrl = process.env.NEXT_PUBLIC_OPENAI_URL;

export async function getChatBotAI(
  message: string,
): Promise<{ response: string } | { error: string }> {
  console.log('message:', message);

  if (!message) {
    return { error: 'Message is required' };
  }

  try {
    if (!apiUrl) {
      return { error: 'API URL is not defined' };
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
      return { response: data.choices[0].message.content };
    } else {
      return { error: data.error.message };
    }
  } catch (error) {
    console.error('Error during API call:', error);
    return { error: 'Internal server error' };
  }
}
