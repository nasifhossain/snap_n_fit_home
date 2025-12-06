import { NextRequest, NextResponse } from 'next/server';
import { executeQuerySingle } from '@/lib/database';
import { verifyPassword, setAuthToken } from '@/lib/auth';
import { prisma } from '@/lib/prsimadb';

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

    const user = await prisma.user.findUnique({
      where: { email: email }
    });
    console.log(user);
    // // Find user by email
    // const user = await executeQuerySingle<User>(
    //   'SELECT id, name, email, passwordHash FROM users WHERE email = ?',
    //   [email]
    // );

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

    // Set auth token with full profile
    await setAuthToken({
      id: user.id,
      name: user.name,
      email: user.email
    });

    return NextResponse.json(
      { 
        success: true, 
        message: 'Login successful', 
        user: {
          userId: user.id,
          name: user.name,
          email: user.email
        }
      },
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