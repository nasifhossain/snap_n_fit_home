import { NextRequest, NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/auth';
import { executeQuery, executeQuerySingle } from '@/lib/database';

interface Book {
  id: string;
  title: string;
  author: string;
  createdAt: string;
}

interface UserBook {
  id: string;
  userId: string;
  bookId: string;
  status: string;
  updatedAt: string;
}

interface BookWithStatus extends Book {
  readByCount: number;
  userStatus: 'read' | 'unread';
}

export async function GET(request: NextRequest) {
  try {
    const user = await getCurrentUser();
    
    if (!user) {
      return NextResponse.json(
        { error: 'Not authenticated' },
        { status: 401 }
      );
    }

    // Get all books with read counts and user's status
    const booksQuery = `
      SELECT 
        b.id,
        b.title,
        b.author,
        b.createdAt,
        COUNT(CASE WHEN ub.status = 'read' THEN 1 END) as readByCount,
        COALESCE(user_status.status, 'unread') as userStatus
      FROM books b
      LEFT JOIN user_books ub ON b.id = ub.bookId AND ub.status = 'read'
      LEFT JOIN user_books user_status ON b.id = user_status.bookId AND user_status.userId = ?
      GROUP BY b.id, b.title, b.author, b.createdAt, user_status.status
      ORDER BY b.createdAt DESC
    `;

    const books = await executeQuery<BookWithStatus>(booksQuery, [user.userId]);

    // Get user's reading statistics
    const statsQuery = `
      SELECT 
        (SELECT COUNT(*) FROM books) as totalBooks,
        (SELECT COUNT(*) FROM user_books WHERE userId = ? AND status = 'read') as booksRead
    `;

    const stats = await executeQuerySingle<{ totalBooks: number; booksRead: number }>(
      statsQuery, 
      [user.userId]
    );

    const totalBooks = stats?.totalBooks || 0;
    const booksRead = stats?.booksRead || 0;
    const completion = totalBooks > 0 ? Math.round((booksRead / totalBooks) * 100) : 0;

    return NextResponse.json({
      success: true,
      data: {
        books,
        stats: {
          totalBooks,
          booksRead,
          completion
        },
        user: {
          name: user.name,
          email: user.email
        }
      }
    });

  } catch (error) {
    console.error('Reading list fetch error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch reading list' },
      { status: 500 }
    );
  }
}