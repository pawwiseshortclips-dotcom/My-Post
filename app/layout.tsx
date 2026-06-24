import type { Metadata } from "next";
import Link from "next/link";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Posts App",
  description: "A simple Next.js and Prisma blog app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-zinc-50 text-black dark:bg-black dark:text-zinc-50">
        <div className="min-h-screen px-6 py-8">
          <main className="mx-auto w-full max-w-5xl">
            <header className="mb-10 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.35em] text-zinc-500 dark:text-zinc-400">
                  Posts App
                </p>
                <h1 className="mt-3 text-3xl font-semibold tracking-tight text-zinc-950 dark:text-zinc-50">
                  Manage posts, drafts, and new content.
                </h1>
              </div>
              <nav className="flex flex-wrap items-center gap-3 text-sm font-medium text-zinc-600 dark:text-zinc-300">
                <Link
                  className="rounded-full px-4 py-2 bg-zinc-950 text-white transition hover:bg-zinc-800 dark:bg-zinc-50 dark:text-zinc-950 dark:hover:bg-zinc-100"
                  href="/"
                >
                  Home
                </Link>
                <Link
                  className="rounded-full px-4 py-2 transition hover:bg-zinc-100 hover:text-zinc-950 dark:hover:bg-zinc-900"
                  href="/post"
                >
                  Posts
                </Link>
                <Link
                  className="rounded-full px-4 py-2 transition hover:bg-zinc-100 hover:text-zinc-950 dark:hover:bg-zinc-900"
                  href="/draft"
                >
                  Drafts
                </Link>
                <Link
                  className="rounded-full px-4 py-2 transition hover:bg-zinc-100 hover:text-zinc-950 dark:hover:bg-zinc-900"
                  href="/addpost"
                >
                  Add Post
                </Link>
              </nav>
            </header>
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
