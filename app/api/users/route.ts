import { NextRequest, NextResponse } from 'next/server';
import clientPromise from '../../lib/mongodb';

export interface User {
  name: string;
  email: string;
  loginTime: string;
  uid: string;
}

export async function POST(request: Request) {
  try {
    const user: User = await request.json();

    if (!user || !user.name || !user.email) {
      return NextResponse.json(
        { error: 'Name and email are required' },
        { status: 400 },
      );
    }

    const client = await clientPromise;
    const db = client.db('OpenMindChatCluter');
    const usersCollection = db.collection('users');

    const existingUser = await usersCollection.findOne({ email: user.email });
    if (existingUser) {
      return NextResponse.json(
        { message: 'User already exists', user: existingUser },
        { status: 200 },
      );
    }

    await usersCollection.insertOne({
      ...user,
      loginTime: new Date().toISOString(),
    });

    return NextResponse.json(
      { message: 'User added successfully', userId: user.uid },
      { status: 201 },
    );
  } catch (error) {
    console.error('Error adding user:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 },
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const client = await clientPromise;
    const db = client.db('OpenMindChatCluter');
    const usersCollection = db.collection<User>('users');

    const { searchParams } = new URL(request.url);
    const uid = searchParams.get('uid');

    if (!uid) {
      return NextResponse.json({ error: 'UID is required' }, { status: 400 });
    }

    const user = await usersCollection.findOne({ uid });

    if (!user) {
      return null;
    }

    return NextResponse.json({ user }, { status: 200 });
  } catch (error) {
    console.error('Error fetching user:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 },
    );
  }
}
