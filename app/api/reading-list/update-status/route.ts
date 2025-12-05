import { NextRequest, NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/auth';
import { executeQuery, executeQuerySingle } from '@/lib/database';

export async function POST(request: NextRequest) {
  try {
    const user = await getCurrentUser();
    
    if (!user) {
      return NextResponse.json(
        { error: 'Not authenticated' },
        { status: 401 }
      );
    }

    const { bookId, status } = await request.json();

    if (!bookId || !status || !['read', 'unread'].includes(status)) {
      return NextResponse.json(
        { error: 'Invalid bookId or status' },
        { status: 400 }
      );
    }

    // Check if the book exists
    const bookExists = await executeQuerySingle(
      'SELECT id FROM books WHERE id = ?',
      [bookId]
    );

    if (!bookExists) {
      return NextResponse.json(
        { error: 'Book not found' },
        { status: 404 }
      );
    }

    // Check if user already has a record for this book
    const existingRecord = await executeQuerySingle(
      'SELECT id FROM user_books WHERE userId = ? AND bookId = ?',
      [user.userId, bookId]
    );

    if (status === 'unread') {
      // Remove the record if it exists
      if (existingRecord) {
        await executeQuery(
          'DELETE FROM user_books WHERE userId = ? AND bookId = ?',
          [user.userId, bookId]
        );
      }
    } else {
      // Insert or update record
      if (existingRecord) {
        await executeQuery(
          'UPDATE user_books SET status = ?, updatedAt = NOW() WHERE userId = ? AND bookId = ?',
          [status, user.userId, bookId]
        );
      } else {
        // Generate a new ID for the record
        const newId = `ub_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        await executeQuery(
          'INSERT INTO user_books (id, userId, bookId, status, updatedAt) VALUES (?, ?, ?, ?, NOW())',
          [newId, user.userId, bookId, status]
        );
      }
    }

    // Get updated read count for this book
    const readCount = await executeQuerySingle<{ count: number }>(
      'SELECT COUNT(*) as count FROM user_books WHERE bookId = ? AND status = ?',
      [bookId, 'read']
    );

    return NextResponse.json({
      success: true,
      data: {
        bookId,
        status,
        readByCount: readCount?.count || 0
      }
    });

  } catch (error) {
    console.error('Update reading status error:', error);
    return NextResponse.json(
      { error: 'Failed to update reading status' },
      { status: 500 }
    );
  }
}