import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ProfileStorage from "./components/ProfileStorage";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Readers - Personal Reading Journey & Book Tracking",
    template: "%s | Readers"
  },
  description: "Track, organize, and discover your favorite books with Readers. Join thousands of book lovers managing their personal libraries. Start your reading journey today!",
  metadataBase: new URL('https://readers.app'),
  viewport: 'width=device-width, initial-scale=1',
  robots: {
    index: true,
    follow: true,
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ProfileStorage />
        {children}
      </body>
    </html>
  );
}
