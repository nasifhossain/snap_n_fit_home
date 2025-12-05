import bcrypt from 'bcryptjs';
import { SignJWT, jwtVerify } from 'jose';
import { cookies } from 'next/headers';

const JWT_SECRET = process.env.JWT_SECRET || 'fallback-secret-key-change-in-production';
const secret = new TextEncoder().encode(JWT_SECRET);

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 12);
}

export async function verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
  return bcrypt.compare(password, hashedPassword);
}

export async function generateToken(userProfile: { id: string; name: string; email: string }): Promise<string> {
  const token = await new SignJWT({ 
    userId: userProfile.id,
    name: userProfile.name,
    email: userProfile.email
  })
    .setProtectedHeader({ alg: 'HS256' })
    .setExpirationTime('24h')
    .setIssuedAt()
    .sign(secret);
  return token;
}

export async function verifyToken(token: string): Promise<{ userId: string; name: string; email: string } | null> {
  try {
    const { payload } = await jwtVerify(token, secret);
    return { 
      userId: payload.userId as string,
      name: payload.name as string,
      email: payload.email as string
    };
  } catch {
    return null;
  }
}

export async function setAuthToken(userProfile: { id: string; name: string; email: string }): Promise<void> {
  const token = await generateToken(userProfile);
  const cookieStore = await cookies();
  cookieStore.set('auth-token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 24 * 60 * 60 // 24 hours
  });
}

export async function getAuthToken(): Promise<string | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get('auth-token');
  return token?.value || null;
}

export async function removeAuthToken(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete('auth-token');
}

export async function getCurrentUser(): Promise<{ userId: string; name: string; email: string } | null> {
  const token = await getAuthToken();
  if (!token) return null;
  
  return await verifyToken(token);
}