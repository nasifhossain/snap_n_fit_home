'use client';

import { useEffect, useState } from 'react';
import ProtectedPage from "@/app/components/ProtectedPage";
import Navbar from "@/app/components/Navbar";

interface Book {
  id: string;
  title: string;
  author: string;
  createdAt: string;
  readByCount: number;
  userStatus: 'read' | 'unread';
}

interface UserStats {
  totalBooks: number;
  booksRead: number;
  completion: number;
}

interface User {
  name: string;
  email: string;
}

interface ReadingListData {
  books: Book[];
  stats: UserStats;
  user: User;
}

export default function ReadingList() {
  const [data, setData] = useState<ReadingListData | null>(null);
  const [loading, setLoading] = useState(true);
  const [updatingBookId, setUpdatingBookId] = useState<string | null>(null);

  useEffect(() => {
    fetchReadingList();
  }, []);

  const fetchReadingList = async () => {
    try {
      const response = await fetch('/api/reading-list');
      if (response.ok) {
        const result = await response.json();
        setData(result.data);
      } else {
        console.error('Failed to fetch reading list');
      }
    } catch (error) {
      console.error('Error fetching reading list:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateReadingStatus = async (bookId: string, newStatus: 'read' | 'unread') => {
    setUpdatingBookId(bookId);
    try {
      const response = await fetch('/api/reading-list/update-status', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ bookId, status: newStatus }),
      });

      if (response.ok) {
        const result = await response.json();

        // Update local state
        setData(prev => {
          if (!prev) return null;

          const updatedBooks = prev.books.map(book => {
            if (book.id === bookId) {
              return {
                ...book,
                userStatus: newStatus,
                readByCount: result.data.readByCount
              };
            }
            return book;
          });

          // Recalculate stats
          const booksRead = updatedBooks.filter(b => b.userStatus === 'read').length;
          const completion = prev.stats.totalBooks > 0
            ? Math.round((booksRead / prev.stats.totalBooks) * 100)
            : 0;

          return {
            ...prev,
            books: updatedBooks,
            stats: {
              ...prev.stats,
              booksRead,
              completion
            }
          };
        });
      } else {
        console.error('Failed to update reading status');
      }
    } catch (error) {
      console.error('Error updating reading status:', error);
    } finally {
      setUpdatingBookId(null);
    }
  };

  if (loading) {
    return (
      <ProtectedPage>
        <div className="min-h-screen bg-[var(--background)]">
          <Navbar />
          <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-12">
            <div className="animate-pulse">
              <div className="h-6 sm:h-8 bg-gray-200 rounded w-1/2 sm:w-1/3 mb-4 sm:mb-6"></div>
              <div className="bg-white rounded-2xl p-4 sm:p-6 lg:p-8 mb-6 sm:mb-8 shadow-sm border border-[var(--card-border)]">
                <div className="h-4 sm:h-6 bg-gray-200 rounded w-1/3 sm:w-1/4 mb-4"></div>
                <div className="grid grid-cols-3 gap-3 sm:gap-4 lg:gap-6">
                  <div className="h-16 sm:h-20 bg-gray-100 rounded-xl"></div>
                  <div className="h-16 sm:h-20 bg-gray-100 rounded-xl"></div>
                  <div className="h-16 sm:h-20 bg-gray-100 rounded-xl"></div>
                </div>
              </div>
              <div className="space-y-3 sm:space-y-4">
                {[1, 2, 3].map(i => (
                  <div key={i} className="h-12 sm:h-16 bg-gray-200 rounded-xl"></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </ProtectedPage>
    );
  }

  if (!data) {
    return (
      <ProtectedPage>
        <div className="min-h-screen bg-[var(--background)]">
          <Navbar />
          <div className="flex items-center justify-center" style={{ minHeight: 'calc(100vh - 4rem)' }}>
            <div className="text-center">
              <h2 className="text-2xl font-semibold text-[var(--text-primary)] mb-2">
                Unable to load reading list
              </h2>
              <p className="text-[var(--text-muted)] mb-6">
                Please try refreshing the page.
              </p>
              <button
                onClick={fetchReadingList}
                className="px-4 sm:px-6 py-2 sm:py-3 bg-[var(--primary)] text-white rounded-lg hover:bg-[var(--primary-hover)] transition-colors duration-[var(--animation-fast)] text-sm sm:text-base"
              >
                Retry
              </button>
            </div>
          </div>
        </div>
      </ProtectedPage>
    );
  }

  const { books, stats, user } = data;

  return (
    <ProtectedPage>
      <div className="min-h-screen bg-[var(--background)]">
        <Navbar user={data?.user} />
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-12">
          {/* Header Section */}
          <div className="mb-8 sm:mb-12">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 sm:mb-8">
              <div>
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[var(--text-primary)] mb-2">
                  Reading Dashboard
                </h1>
                <p className="text-[var(--text-secondary)] text-sm sm:text-base lg:text-lg">
                  Track your reading progress and explore the shared library
                </p>
              </div>
            </div>

            {/* User Info & Stats Section */}
            <div className="bg-white rounded-2xl p-4 sm:p-6 lg:p-8 shadow-sm border border-[var(--card-border)] mb-8 sm:mb-12">
              <div className="flex flex-col gap-6 lg:gap-8">
                {/* User Info */}
                <div>
                  <div className="flex items-center gap-3 sm:gap-4">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[var(--primary-light)] rounded-full flex items-center justify-center">
                      <span className="text-[var(--primary)] font-semibold text-base sm:text-lg">
                        {user.name.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <div>
                      <h2 className="text-lg sm:text-xl lg:text-2xl font-semibold text-[var(--text-primary)]">
                        Hello, {user.name}
                      </h2>
                      <p className="text-[var(--text-secondary)] text-sm sm:text-base">
                        {user.email}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Reading Summary Stats */}
                <div>
                  <h3 className="text-base sm:text-lg font-semibold text-[var(--text-primary)] mb-4 sm:mb-6">
                    Your Reading Summary
                  </h3>
                  <div className="grid grid-cols-3 gap-3 sm:gap-4 lg:gap-6">
                    <div className="text-center p-3 sm:p-4 bg-[var(--secondary-light)] rounded-xl">
                      <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-[var(--text-primary)] mb-1">
                        {stats.totalBooks}
                      </div>
                      <div className="text-xs sm:text-sm text-[var(--text-secondary)] font-medium">
                        Total Books
                      </div>
                    </div>
                    <div className="text-center p-3 sm:p-4 bg-[var(--status-completed-bg)] rounded-xl">
                      <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-[var(--status-completed)] mb-1">
                        {stats.booksRead}
                      </div>
                      <div className="text-xs sm:text-sm text-[var(--text-secondary)] font-medium">
                        Books Read
                      </div>
                    </div>
                    <div className="text-center p-3 sm:p-4 bg-[var(--status-active-bg)] rounded-xl">
                      <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-[var(--status-active)] mb-1">
                        {stats.completion}%
                      </div>
                      <div className="text-xs sm:text-sm text-[var(--text-secondary)] font-medium">
                        Completion
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Shared Reading List Section */}
          <div>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 sm:mb-8 gap-3">
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-[var(--text-primary)]">
                Shared Reading List
              </h2>
              <div className="flex items-center gap-2 text-[var(--text-muted)] text-xs sm:text-sm">
                <div className="w-2 h-2 bg-[var(--status-active)] rounded-full animate-pulse"></div>
                Live updates
              </div>
            </div>

            {books.length === 0 ? (
              <div className="bg-white rounded-2xl p-8 sm:p-12 lg:p-16 text-center shadow-sm border border-[var(--card-border)]">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-[var(--secondary-light)] rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
                  <svg className="w-6 h-6 sm:w-8 sm:h-8 text-[var(--secondary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <h3 className="text-lg sm:text-xl font-semibold text-[var(--text-primary)] mb-2">
                  No books available yet
                </h3>
                <p className="text-[var(--text-secondary)] text-sm sm:text-base">
                  There are no books in the reading list yet.
                </p>
              </div>
            ) : (
              <>
                {/* Desktop Table View */}
                <div className="hidden md:block bg-white rounded-2xl shadow-sm border border-[var(--card-border)] overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-[var(--secondary-light)] border-b border-[var(--border-light)]">
                        <tr>
                          <th className="px-4 lg:px-6 py-4 text-left text-sm font-semibold text-[var(--text-primary)]">
                            Book Details
                          </th>
                          <th className="px-4 lg:px-6 py-4 text-left text-sm font-semibold text-[var(--text-primary)]">
                            Community Status
                          </th>
                          <th className="px-4 lg:px-6 py-4 text-left text-sm font-semibold text-[var(--text-primary)]">
                            Your Status
                          </th>
                          <th className="px-4 lg:px-6 py-4 text-left text-sm font-semibold text-[var(--text-primary)]">
                            Action
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[var(--border-light)]">
                        {books.map((book) => (
                          <tr
                            key={book.id}
                            className="hover:bg-[var(--hover-bg)] transition-colors duration-[var(--animation-fast)]"
                          >
                            <td className="px-4 lg:px-6 py-4 lg:py-6">
                              <div>
                                <h3 className="text-base lg:text-lg font-semibold text-[var(--text-primary)] mb-1">
                                  {book.title}
                                </h3>
                                <p className="text-sm text-[var(--text-secondary)]">
                                  by {book.author}
                                </p>
                              </div>
                            </td>
                            <td className="px-4 lg:px-6 py-4 lg:py-6">
                              <div className="flex items-center gap-2">
                                <span className="inline-flex items-center px-2 lg:px-3 py-1 rounded-full text-xs lg:text-sm font-medium bg-[var(--primary-light)] text-[var(--primary)]">
                                  Read by {book.readByCount} user{book.readByCount !== 1 ? 's' : ''}
                                </span>
                              </div>
                            </td>
                            <td className="px-4 lg:px-6 py-4 lg:py-6">
                              <span
                                className={`inline-flex items-center px-2 lg:px-3 py-1 rounded-full text-xs lg:text-sm font-medium ${book.userStatus === 'read'
                                  ? 'bg-[var(--status-completed-bg)] text-[var(--status-completed)]'
                                  : 'bg-[var(--secondary-light)] text-[var(--secondary)]'
                                  }`}
                              >
                                {book.userStatus === 'read' ? 'Read' : 'Not Read'}
                              </span>
                            </td>
                            <td className="px-4 lg:px-6 py-4 lg:py-6">
                              <button
                                onClick={() => updateReadingStatus(
                                  book.id,
                                  book.userStatus === 'read' ? 'unread' : 'read'
                                )}
                                disabled={updatingBookId === book.id}
                                className={`inline-flex items-center px-3 lg:px-4 py-2 rounded-lg text-xs lg:text-sm font-medium transition-all duration-[var(--animation-fast)] ${book.userStatus === 'read'
                                  ? 'bg-[var(--secondary-light)] text-[var(--text-primary)] hover:bg-[var(--border-medium)]'
                                  : 'bg-[var(--primary)] text-white hover:bg-[var(--primary-hover)]'
                                  } disabled:opacity-50 disabled:cursor-not-allowed`}
                              >
                                {updatingBookId === book.id ? (
                                  <>
                                    <svg className="w-3 h-3 lg:w-4 lg:h-4 mr-2 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" className="opacity-25"></circle>
                                      <path fill="currentColor" d="m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" className="opacity-75"></path>
                                    </svg>
                                    Updating...
                                  </>
                                ) : (
                                  <>
                                    <span className="hidden lg:inline">
                                      {book.userStatus === 'read' ? 'Mark as Unread' : 'Mark as Read'}
                                    </span>
                                    <span className="lg:hidden">
                                      {book.userStatus === 'read' ? 'Unread' : 'Read'}
                                    </span>
                                  </>
                                )}
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Mobile Card View */}
                <div className="md:hidden space-y-4">
                  {books.map((book) => (
                    <div
                      key={book.id}
                      className="bg-white rounded-2xl p-4 shadow-sm border border-[var(--card-border)]"
                    >
                      <div className="space-y-4">
                        {/* Book Details */}
                        <div>
                          <h3 className="text-base font-semibold text-[var(--text-primary)] mb-1">
                            {book.title}
                          </h3>
                          <p className="text-sm text-[var(--text-secondary)]">
                            by {book.author}
                          </p>
                        </div>

                        {/* Status Info */}
                        <div className="flex flex-wrap gap-2">
                          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-[var(--primary-light)] text-[var(--primary)]">
                            Read by {book.readByCount} user{book.readByCount !== 1 ? 's' : ''}
                          </span>
                          <span
                            className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${book.userStatus === 'read'
                              ? 'bg-[var(--status-completed-bg)] text-[var(--status-completed)]'
                              : 'bg-[var(--secondary-light)] text-[var(--secondary)]'
                              }`}
                          >
                            Your Status: {book.userStatus === 'read' ? 'Read' : 'Not Read'}
                          </span>
                        </div>

                        {/* Action Button */}
                        <button
                          onClick={() => updateReadingStatus(
                            book.id,
                            book.userStatus === 'read' ? 'unread' : 'read'
                          )}
                          disabled={updatingBookId === book.id}
                          className={`w-full inline-flex items-center justify-center px-4 py-3 rounded-lg text-sm font-medium transition-all duration-[var(--animation-fast)] ${book.userStatus === 'read'
                            ? 'bg-[var(--secondary-light)] text-[var(--text-primary)] hover:bg-[var(--border-medium)]'
                            : 'bg-[var(--primary)] text-white hover:bg-[var(--primary-hover)]'
                            } disabled:opacity-50 disabled:cursor-not-allowed`}
                        >
                          {updatingBookId === book.id ? (
                            <>
                              <svg className="w-4 h-4 mr-2 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" className="opacity-25"></circle>
                                <path fill="currentColor" d="m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" className="opacity-75"></path>
                              </svg>
                              Updating...
                            </>
                          ) : (
                            book.userStatus === 'read' ? 'Mark as Unread' : 'Mark as Read'
                          )}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </ProtectedPage>
  );
}