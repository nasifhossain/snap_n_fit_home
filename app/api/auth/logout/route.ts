import { NextResponse } from 'next/server';
import { removeAuthToken } from '@/lib/auth';

export async function POST() {
  try {
    await removeAuthToken();
    return NextResponse.json({ message: 'Logged out successfully' });
  } catch (error) {
    console.error('Logout error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}