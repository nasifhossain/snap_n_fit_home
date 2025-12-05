import { executeQuery } from '@/lib/database';
import Image from 'next/image';

interface Book {
  id: string;
  title: string;
  author: string;
  createdAt: Date;
}

async function getFeaturedBooks(): Promise<Book[]> {
  try {
    const query = `
      SELECT id, title, author, createdAt 
      FROM books 
      ORDER BY createdAt DESC 
      LIMIT 3
    `;
    const books = await executeQuery<Book>(query);
    return books;
  } catch (error) {
    console.error('Failed to fetch books:', error);
    return [];
  }
}

export default async function FeaturedBooks() {
  const books = await getFeaturedBooks();

  if (books.length === 0) {
    return (
      <section className="bg-gray-50 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Featured Books
            </h2>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Discover popular books from our community
            </p>
            <div className="mt-12 text-gray-500">
              <p>No books available at the moment. Check back soon!</p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-100 py-10 sm:py-12">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <div className="flex items-center justify-center gap-3 mb-2">
            <Image
              src="/images/social.png"
              alt="Community reading icon"
              width={40}
              height={40}
              className="animate-pulse"
            />
            <h2 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
              📚 Popular Books
            </h2>
          </div>
          <p className="mt-1 text-sm text-gray-600">Discover what others are reading in our community</p>
        </div>
        
        <div className="mx-auto mt-6 grid max-w-2xl grid-cols-1 gap-6 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {books.slice(0, 3).map((book, index) => {
            const cardGradients = [
              'bg-gradient-to-br from-cyan-100 to-blue-200',
              'bg-gradient-to-br from-green-100 to-emerald-200',
              'bg-gradient-to-br from-yellow-100 to-orange-200'
            ];
            const bookPlaceholders = [
              '/images/book_placeholder1.png',
              '/images/book_placeholder2.png',
              '/images/book_placeholder3.png'
            ];
            return (
            <div
              key={book.id}
              className={`group relative flex flex-col overflow-hidden rounded-xl ${cardGradients[index % 3]} shadow-sm hover:shadow-lg hover:-translate-y-2 transition-all duration-300`}
            >
              {/* Book Cover Image */}
              <div className="relative h-48 mb-4 flex items-center justify-center">
                <Image
                  src={bookPlaceholders[index % 3]}
                  alt={`${book.title} book cover`}
                  width={120}
                  height={160}
                  className="rounded-lg shadow-md group-hover:scale-105 transition-transform duration-300"
                  placeholder="blur"
                  blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
                />
              </div>
              
              {/* Book Details */}
              <div className="flex-auto px-6 pb-6">
                <h3 className="text-lg font-semibold leading-6 text-gray-900 group-hover:text-indigo-600 transition-colors">
                  {book.title}
                </h3>
                <p className="mt-2 text-sm text-gray-600 font-medium">
                  by {book.author}
                </p>
                <p className="mt-1 text-xs text-gray-500">
                  Added {new Date(book.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>
          )})}
        </div>
      </div>
    </section>
  );
}