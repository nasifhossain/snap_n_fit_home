import { getCurrentUser } from '@/lib/auth';
import { prisma } from '@/lib/prsimadb';
import { NextRequest, NextResponse } from 'next/server';


export async function GET(request: NextRequest) {
  try {
    const user = await getCurrentUser();
    
    if (!user) {
      return NextResponse.json(
        { error: 'Not authenticated' },
        { status: 401 }
      );
    }
    // Run independent queries in parallel for better performance
    const [rawBooks, totalBooks, booksRead] = await Promise.all([
      // 1. Fetch Books with counts and user status
      prisma.book.findMany({
        orderBy: {
          createdAt: 'desc',
        },
        select: {
          id: true,
          title: true,
          author: true,
          createdAt: true,
          // Count how many people have read this book
          _count: {
            select: {
              userBooks: {
                where: { status: 'read' },
              },
            },
          },
          // Get the current user's specific status for this book
          userBooks: {
            where: {
              userId: user.userId, // CAUTION: Ensure this matches your schema type (String/Int)
            },
            select: {
              status: true,
            },
            take: 1,
          },
        },
      }),

      // 2. Get Total Books count
      prisma.book.count(),

      // 3. Get Count of books read by current user
      prisma.userBook.count({
        where: {
          userId: user.userId,
          status: 'read',
        },
      }),
    ]);

    // Flatten the Prisma result to match your frontend expectation
    const books = rawBooks.map((book) => ({
      id: book.id,
      title: book.title,
      author: book.author,
      createdAt: book.createdAt,
      readByCount: book._count.userBooks,
      // If no record exists for this user, default to 'unread'
      userStatus: book.userBooks[0]?.status ?? 'unread',
    }));

    // Calculate completion percentage
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