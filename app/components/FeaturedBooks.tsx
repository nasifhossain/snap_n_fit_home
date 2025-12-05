import { executeQuery } from '@/lib/database';

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
    <section className="bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-100 py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
            📚 Popular Books
          </h2>
        </div>
        
        <div className="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-4 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {books.slice(0, 3).map((book, index) => {
            const cardGradients = [
              'bg-gradient-to-br from-cyan-100 to-blue-200',
              'bg-gradient-to-br from-green-100 to-emerald-200',
              'bg-gradient-to-br from-yellow-100 to-orange-200'
            ];
            return (
            <div
              key={book.id}
              className={`group relative flex flex-col overflow-hidden rounded-xl ${cardGradients[index % 3]} p-6 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-200`}
            >
              <div className="flex-auto">
                <h3 className="text-base font-semibold leading-6 text-gray-900 group-hover:text-indigo-600 transition-colors">
                  {book.title}
                </h3>
                <p className="mt-1 text-sm text-gray-600">
                  by {book.author}
                </p>
              </div>
            </div>
          )})}
        </div>
      </div>
    </section>
  );
}