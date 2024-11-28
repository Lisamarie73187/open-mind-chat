import { NextResponse } from 'next/server';
import clientPromise from '../../../lib/mongodb';
import { ObjectId } from 'mongodb';
import { getChatBotAI } from '../chatbot';
import { time } from 'console';

interface Message {
    userId: string;
    message: string;
    role: string;
}

export async function GET(
  request: Request,
  { params }: { params: { userId: string } }
) {
  const { userId } = params;

  try {
    const messages = await getMessagesByUser(userId);

    return NextResponse.json(
      { messages },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error during GET:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}


export async function POST(
    request: Request,
    { params }: { params: { userId: string } }
  ) {
    const { userId } = params;
  
    try {
      const body = await request.json();
      const { message, role } = body;

      if (!userId || !message || !role) {
        return NextResponse.json(
          { error: 'Missing required fields' },
          { status: 400 }
        );
      }

      const messageObj = {
        userId,
        message,
        role,
        timestamp: new Date().toISOString(),
      }
      
      addMessage(messageObj);

      const chatBotResponse = await getChatBotAI(message);

      if ('error' in chatBotResponse) {
        return NextResponse.json(
          { error: chatBotResponse.error },
          { status: 500 }
        );
      }
      const chatBotObj = {
        userId,
        message: chatBotResponse.response,
        role: 'assistant',
        timestamp: new Date().toISOString(),

      }
      addMessage(chatBotObj);

      return NextResponse.json(
        { chatBotObj },
        { status: 201 }
      );
    } catch (error) {
      console.error('Error during POST:', error);
      return NextResponse.json(
        { error: 'Internal server error' },
        { status: 500 }
      );
    }
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
      throw new Error('Failed to add message');
    }
  }

  export async function getMessagesByUser(userId: string): Promise<any[]> {
    try {
      const client = await clientPromise;
      const db = client.db('OpenMindChatCluter');
      const collection = db.collection('messages');
  
      const messages = await collection.find({ userId }).toArray();
      console.log({messages})
  
      return messages;
    } catch (error) {
      console.error('Error fetching messages:', error);
      throw new Error('Internal server error'); // Throw an error to be handled by the caller
    }
  }
  
