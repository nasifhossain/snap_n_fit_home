import { NextRequest, NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/auth';
import { executeQuery, executeQuerySingle } from '@/lib/database';
import { prisma } from '@/lib/prsimadb';
import { read } from 'fs';

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
   const bookExists = await prisma.book.findUnique({
      where: { id: bookId }
   })

    if (!bookExists) {
      return NextResponse.json(
        { error: 'Book not found' },
        { status: 404 }
      );
    }

    // Check if user already has a record for this book
    const existingRecord = await prisma.userBook.findUnique({
      where:{
        userId_bookId: {
          userId: user.userId,
          bookId: bookId
        }
      }
    })

    if (status === 'unread') {
      // Remove the record if it exists
      if (existingRecord) {
        prisma.userBook.delete({
          where:{
            id: existingRecord.id
          }
        })
      }
    } else {
      // Insert or update record
      if (existingRecord) {
       prisma.userBook.update({
        where:{
          id: existingRecord.id
        },
        data:{
          status: (existingRecord.status==="read")?"unread":"read",
          updatedAt: new Date()
        }
       });
      } else {
        // Generate a new ID for the record
        const newId = `ub_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        await prisma.userBook.create({
          data:{
            id: newId,
            userId: user.userId,
            bookId: bookId,
            status: status,
            updatedAt: new Date()
          }
        })
      }
    }

    // Get updated read count for this book
    const readBooks = await prisma.userBook.findMany({
      where:{
        bookId: bookId,
        status: 'read'
      }
    });
    const readCount = readBooks?readBooks.length:0;

    return NextResponse.json({
      success: true,
      data: {
        bookId,
        status,
        readByCount: readCount || 0
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