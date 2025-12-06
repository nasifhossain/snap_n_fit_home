import { NextRequest, NextResponse } from 'next/server';
import { executeQuerySingle, executeQuery } from '@/lib/database';
import { hashPassword, setAuthToken } from '@/lib/auth';
import { randomBytes } from 'crypto';
import { prisma } from '@/lib/prsimadb';

export async function POST(request: NextRequest) {
  try {
    const { name, email, password } = await request.json();

    // Basic validation
    if (!name || !email || !password) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const existingUser = await prisma.user.findUnique({
      where: { email: email }
    });
    console.log(existingUser);
    // Check if user already exists
    // const existingUser = await executeQuerySingle(
    //   'SELECT id FROM users WHERE email = ?',
    //   [email]
    // );

    if (existingUser) {
      return NextResponse.json(
        { error: 'An account with this email already exists.' },
        { status: 400 }
      );
    }

    // Generate user ID and hash password
    const userId = randomBytes(12).toString('hex');
    const passwordHash = await hashPassword(password);
    
    // Create user
    await prisma.user.create({
      data: {
        id: userId,
        name: name,
        email: email,
        passwordHash: passwordHash
      }
    })
    // await executeQuery(
    //   'INSERT INTO users (id, name, email, passwordHash) VALUES (?, ?, ?, ?)',
    //   [userId, name, email, passwordHash]
    // );

    // Set auth token for automatic login with full profile
    await setAuthToken({
      id: userId,
      name: name,
      email: email
    });

    return NextResponse.json(
      { 
        success: true, 
        message: 'Account created successfully', 
        user: {
          userId: userId,
          name: name,
          email: email
        }
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Signup error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}