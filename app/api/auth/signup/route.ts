import { NextRequest, NextResponse } from 'next/server';
import { executeQuerySingle, executeQuery } from '@/lib/database';
import { hashPassword, setAuthToken } from '@/lib/auth';
import { randomBytes } from 'crypto';

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

    // Check if user already exists
    const existingUser = await executeQuerySingle(
      'SELECT id FROM users WHERE email = ?',
      [email]
    );

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
    await executeQuery(
      'INSERT INTO users (id, name, email, passwordHash) VALUES (?, ?, ?, ?)',
      [userId, name, email, passwordHash]
    );

    // Set auth token for automatic login
    await setAuthToken(userId);

    return NextResponse.json(
      { success: true, message: 'Account created successfully', userId },
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