import { executeQuery } from '../lib/database';

async function seedBooks() {
  const sampleBooks = [
    { id: 'book_1', title: 'Atomic Habits', author: 'James Clear' },
    { id: 'book_2', title: 'Deep Work', author: 'Cal Newport' },
    { id: 'book_3', title: 'Clean Code', author: 'Robert C. Martin' },
    { id: 'book_4', title: 'The Pragmatic Programmer', author: 'David Thomas and Andrew Hunt' },
    { id: 'book_5', title: 'You Don\'t Know JS', author: 'Kyle Simpson' },
    { id: 'book_6', title: 'Designing Data-Intensive Applications', author: 'Martin Kleppmann' },
    { id: 'book_7', title: 'The Clean Coder', author: 'Robert C. Martin' },
    { id: 'book_8', title: 'Refactoring', author: 'Martin Fowler' },
    { id: 'book_9', title: 'System Design Interview', author: 'Alex Xu' },
    { id: 'book_10', title: 'The Phoenix Project', author: 'Gene Kim' },
    { id: 'book_11', title: 'Code Complete', author: 'Steve McConnell' },
    { id: 'book_12', title: 'Cracking the Coding Interview', author: 'Gayle Laakmann McDowell' },
    { id: 'book_13', title: 'The Mythical Man-Month', author: 'Frederick P. Brooks Jr.' },
    { id: 'book_14', title: 'Clean Architecture', author: 'Robert C. Martin' },
    { id: 'book_15', title: 'The DevOps Handbook', author: 'Gene Kim' }
  ];

  console.log('Seeding books...');

  for (const book of sampleBooks) {
    try {
      // Check if book already exists
      const existingBook = await executeQuery(
        'SELECT id FROM books WHERE id = ?',
        [book.id]
      );

      if (existingBook.length === 0) {
        await executeQuery(
          'INSERT INTO books (id, title, author, createdAt) VALUES (?, ?, ?, NOW())',
          [book.id, book.title, book.author]
        );
        console.log(`Added book: ${book.title} by ${book.author}`);
      } else {
        console.log(`Book already exists: ${book.title}`);
      }
    } catch (error) {
      console.error(`Error adding book ${book.title}:`, error);
    }
  }

  console.log('Seeding complete!');
}

seedBooks()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error('Seeding failed:', error);
    process.exit(1);
  });