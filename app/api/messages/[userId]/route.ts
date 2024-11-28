import { NextResponse } from 'next/server';
import clientPromise from '../../../lib/mongodb';
import { ObjectId, WithId } from 'mongodb';
import { getChatBotAI } from '../chatbot';

interface Message {
  userId: string;
  message: string;
  role: string;
  timestamp: string;
}

const addMessage = async (messageObj: Message): Promise<ObjectId> => {
  try {
    const client = await clientPromise;
    const db = client.db('OpenMindChatCluter');
    const collection = db.collection('messages');

    const result = await collection.insertOne(messageObj);
    return result.insertedId;
  } catch (error) {
    console.error('Error adding message:', error);
    throw new Error('Failed to add message to the database');
  }
};

const getMessagesByUser = async (userId: string): Promise<Message[]> => {
  try {
    const client = await clientPromise;
    const db = client.db('OpenMindChatCluter');
    const collection = db.collection('messages');
    const messages = await collection.find({ userId }).toArray();

    return messages.map((message) => ({
      userId: message.userId,
      message: message.message,
      role: message.role,
      timestamp: message.timestamp,
    }));
  } catch (error) {
    console.error('Error fetching messages:', error);
    throw new Error('Failed to fetch messages');
  }
};

const createErrorResponse = (message: string, status: number) =>
  NextResponse.json({ error: message }, { status });

export async function GET(
  _request: Request,
  { params }: { params: { userId: string } },
) {
  const { userId } = params;

  if (!userId) {
    return createErrorResponse('User ID is required', 400);
  }

  try {
    const messages = await getMessagesByUser(userId);
    return NextResponse.json({ messages }, { status: 200 });
  } catch (error) {
    return createErrorResponse('Internal server error', 500);
  }
}
export async function POST(
  request: Request,
  { params }: { params: { userId: string } },
) {
  const { userId } = params;

  if (!userId) {
    return createErrorResponse('User ID is required', 400);
  }

  try {
    const body = await request.json();
    const { message, role } = body;

    if (!message || !role) {
      return createErrorResponse(
        'Missing required fields: message or role',
        400,
      );
    }

    const userMessage: Message = {
      userId,
      message,
      role,
      timestamp: new Date().toISOString(),
    };
    await addMessage(userMessage);

    const chatBotResponse = await getChatBotAI(message);

    if ('error' in chatBotResponse) {
      return createErrorResponse(chatBotResponse.error, 500);
    }

    const chatBotMessage: Message = {
      userId,
      message: chatBotResponse.response,
      role: 'assistant',
      timestamp: new Date().toISOString(),
    };
    await addMessage(chatBotMessage);

    return NextResponse.json({ chatBotMessage }, { status: 201 });
  } catch (error) {
    console.error('Error during POST:', error);
    return createErrorResponse('Internal server error', 500);
  }
}
