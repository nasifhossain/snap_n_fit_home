# 📚 Readers - Personal Reading Journey & Book Tracking

A modern web application built with Next.js that allows users to track, organize, and discover their favorite books. Create your personal reading list, mark progress, and manage your book collection with ease.

![Next.js](https://img.shields.io/badge/Next.js-16.0.7-black?style=flat-square&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat-square&logo=typescript)
![MySQL](https://img.shields.io/badge/MySQL-8.0-orange?style=flat-square&logo=mysql)
![Prisma](https://img.shields.io/badge/Prisma-7.1.0-2D3748?style=flat-square&logo=prisma)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3-38B2AC?style=flat-square&logo=tailwind-css)

## 🚀 Features

- 📖 **Personal Reading Lists** - Create and manage your book collection
- 📊 **Reading Progress Tracking** - Mark books as read or unread
- 🔍 **Book Discovery** - Explore curated book collections
- 👤 **User Authentication** - Secure signup/login with JWT
- 📱 **Responsive Design** - Works perfectly on all devices
- 🎨 **Modern UI** - Clean, intuitive interface built with Tailwind CSS
- 🔒 **Secure** - Password hashing and JWT authentication
- 🗄️ **Database Management** - MySQL with Prisma ORM

## 🛠️ Tech Stack

- **Frontend**: Next.js 16, React 19, TypeScript
- **Styling**: Tailwind CSS 4
- **Backend**: Next.js API Routes
- **Database**: MySQL 8.0
- **ORM**: Prisma 7.1.0
- **Authentication**: JWT with bcryptjs
- **Icons**: Heroicons
- **Development**: Docker Compose, ESLint

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v18 or higher)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- [Docker](https://www.docker.com/) and [Docker Compose](https://docs.docker.com/compose/) (for database)

## 🚀 Quick Start

### 1. Clone the Repository

```bash
git clone https://github.com/nasifhossain/snap_n_fit_home.git
cd snap-n-fit_task
```

### 2. Install Dependencies

```bash
npm install
# or
yarn install
```

### 3. Environment Setup

Create a `.env` file in the root directory by copying the example:

```bash
cp .env.example .env
```

Update the `.env` file with your configuration:

```env
DATABASE_URL="mysql://root:rootpassword@localhost:3306/reading_list"

DB_USER=root
DB_PASSWORD=rootpassword
DB_HOST=localhost
DB_PORT=3306
DB_NAME=reading_list

# JWT Secret (change this in production)
JWT_SECRET="your-super-secret-jwt-key"
```

## 🐳 Setup Options

### Option 1: Docker Setup (Recommended)

This setup uses Docker for the database and runs the Next.js app locally.

1. **Start the database with Docker:**

```bash
docker-compose up -d
```

This will start:
- MySQL 8.0 database on port 3306
- phpMyAdmin on port 8080 (optional database management)

2. **Setup the database schema:**

```bash
npx prisma migrate dev
```

3. **Seed the database with sample books:**

```bash
npx tsx scripts/seed-books.ts
```

4. **Start the development server:**

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to see the application.

**Access phpMyAdmin**: [http://localhost:8080](http://localhost:8080)
- Server: `db`
- Username: `root`
- Password: `rootpassword`

### Option 2: Local App + Hosted Database

If you prefer to use a hosted MySQL database (like PlanetScale, AWS RDS, etc.):

1. **Update your `.env` file** with your hosted database credentials:

```env
DATABASE_URL="mysql://username:password@your-host:3306/your-database"
```

2. **Setup the database schema:**

```bash
npx prisma db push
```

3. **Seed the database:**

```bash
npx tsx scripts/seed-books.ts
```

4. **Start the development server:**

```bash
npm run dev
```

### Option 3: Full Local Setup

If you have MySQL installed locally:

1. **Create a database:**

```sql
CREATE DATABASE reading_list;
```

2. **Update your `.env` file** with your local MySQL credentials.

3. **Follow steps 2-4 from Option 2.**

## 📝 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint
- `npm run enter-mysql` - Access MySQL container CLI

## 🗄️ Database Commands

### Prisma Commands

```bash
# Generate Prisma client
npx prisma generate

# Push schema changes to database
npx prisma db push

# Create and run migrations
npx prisma migrate dev

# View database in Prisma Studio
npx prisma studio

# Reset database
npx prisma migrate reset
```

### Docker Database Commands

```bash
# Start database
docker-compose up -d

# Stop database
docker-compose down

# View logs
docker-compose logs

# Access MySQL CLI
npm run enter-mysql
```

## 📁 Project Structure

```
├── app/                    # Next.js app directory
│   ├── api/               # API routes
│   │   ├── auth/          # Authentication endpoints
│   │   └── reading-list/  # Book management endpoints
│   ├── components/        # React components
│   ├── login/            # Login page
│   ├── signup/           # Signup page
│   ├── reading-list/     # Reading list page
│   └── layout.tsx        # Root layout
├── lib/                   # Utility libraries
│   ├── auth.ts           # Authentication utilities
│   ├── database.ts       # Database connection
│   └── index.ts          # Library exports
├── prisma/               # Database schema and migrations
│   ├── schema.prisma     # Database schema
│   └── migrations/       # Migration files
├── scripts/              # Utility scripts
│   ├── seed-books.ts     # Database seeding
│   └── test-connection.ts # Connection testing
├── public/               # Static assets
│   ├── images/           # Image assets
│   └── logo.png          # App logo
├── docker-compose.yml    # Docker services
├── .env.example          # Environment variables template
└── package.json          # Dependencies and scripts
```

## 🔐 API Endpoints

### Authentication
- `POST /api/auth/signup` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout
- `GET /api/auth/profile` - Get user profile
- `POST /api/auth/verify` - Verify JWT token

### Reading List
- `GET /api/reading-list` - Get user's books
- `POST /api/reading-list` - Add book to reading list
- `PUT /api/reading-list/update-status` - Update book status

## 🚀 Deployment

### Vercel (Recommended)

1. **Connect your GitHub repository** to [Vercel](https://vercel.com)

2. **Set environment variables** in Vercel dashboard:
   - `DATABASE_URL`
   - `JWT_SECRET`

3. **Deploy** - Vercel will automatically build and deploy your app

### Other Platforms

The app can be deployed on any platform that supports Node.js:

- **Netlify**: Use `npm run build` and deploy the `.next` folder
- **Railway**: Connect GitHub repo and set environment variables
- **DigitalOcean App Platform**: Use the provided buildpack

## 🔧 Development

### Adding New Features

1. **Database changes**: Update `prisma/schema.prisma`
2. **API routes**: Add files in `app/api/`
3. **Components**: Add React components in `app/components/`
4. **Pages**: Add pages in the `app/` directory

### Code Quality

- **ESLint**: Configured for Next.js and TypeScript
- **TypeScript**: Strict type checking enabled
- **Prettier**: Code formatting (configure in your editor)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 💡 Support

If you have any questions or need help:

1. Check the [Issues](https://github.com/nasifhossain/snap_n_fit_home/issues) page
2. Create a new issue if your problem isn't already listed
3. Reach out to the development team

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) - The React framework
- [Prisma](https://prisma.io/) - Database ORM
- [Tailwind CSS](https://tailwindcss.com/) - Styling framework
- [Heroicons](https://heroicons.com/) - Beautiful icons

---

Made with ❤️ by the Readers Team
