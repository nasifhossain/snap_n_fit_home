import { NextRequest, NextResponse } from 'next/server';
import { executeQuerySingle } from '@/lib/database';
import { verifyPassword, setAuthToken } from '@/lib/auth';

interface User {
  id: string;
  name: string;
  email: string;
  passwordHash: string;
}

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    // Basic validation
    if (!email || !password) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Find user by email
    const user = await executeQuerySingle<User>(
      'SELECT id, name, email, passwordHash FROM users WHERE email = ?',
      [email]
    );

    if (!user) {
      return NextResponse.json(
        { error: 'Invalid email or password' },
        { status: 401 }
      );
    }

    // Verify password
    const isPasswordValid = await verifyPassword(password, user.passwordHash);
    if (!isPasswordValid) {
      return NextResponse.json(
        { error: 'Invalid email or password' },
        { status: 401 }
      );
    }

    // Set auth token
    await setAuthToken(user.id);

    return NextResponse.json(
      { success: true, message: 'Login successful', userId: user.id },
      { status: 200 }
    );
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}