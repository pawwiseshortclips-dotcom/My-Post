import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-zinc-50 px-6 py-8 text-black dark:bg-black dark:text-zinc-50">
      <main className="mx-auto w-full max-w-5xl rounded-3xl bg-white p-8 shadow-lg shadow-black/5 dark:bg-zinc-950">
        <header className="mb-10 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.35em] text-zinc-500 dark:text-zinc-400">Posts App</p>
            <h1 className="mt-3 text-3xl font-semibold tracking-tight text-zinc-950 dark:text-zinc-50">
              Welcome to Posts App
            </h1>
          </div>
          <nav className="flex flex-wrap items-center gap-3 text-sm font-medium text-zinc-600 dark:text-zinc-300">
            <Link className="rounded-full px-4 py-2 bg-zinc-950 text-white transition hover:bg-zinc-800 dark:bg-zinc-50 dark:text-zinc-950 dark:hover:bg-zinc-100" href="/">
              Home
            </Link>
            <Link className="rounded-full px-4 py-2 transition hover:bg-zinc-100 hover:text-zinc-950 dark:hover:bg-zinc-900" href="/post">
              Posts
            </Link>
            <Link className="rounded-full px-4 py-2 transition hover:bg-zinc-100 hover:text-zinc-950 dark:hover:bg-zinc-900" href="/draft">
              Drafts
            </Link>
            <Link className="rounded-full px-4 py-2 transition hover:bg-zinc-100 hover:text-zinc-950 dark:hover:bg-zinc-900" href="/addpost">
              Add Post
            </Link>
          </nav>
        </header>

        <section className="space-y-8 rounded-3xl border border-zinc-200 bg-zinc-50 p-10 dark:border-zinc-800 dark:bg-zinc-900">
          <div className="max-w-3xl space-y-6">
            <h2 className="text-2xl font-semibold text-zinc-950 dark:text-zinc-50">Build posts with Prisma and Next.js</h2>
            <p className="text-sm leading-7 text-zinc-600 dark:text-zinc-400">
              This app uses a clean layout for published posts, drafts, and creating a new post. Visit the pages above to manage your content.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            <Link
              href="/post"
              className="rounded-3xl border border-zinc-200 bg-white p-6 text-center transition hover:border-zinc-300 hover:shadow-lg dark:border-zinc-800 dark:bg-zinc-950"
            >
              <p className="text-sm font-medium text-zinc-950 dark:text-zinc-50">Posts</p>
              <p className="mt-2 text-xs text-zinc-500 dark:text-zinc-400">See all published posts</p>
            </Link>
            <Link
              href="/draft"
              className="rounded-3xl border border-zinc-200 bg-white p-6 text-center transition hover:border-zinc-300 hover:shadow-lg dark:border-zinc-800 dark:bg-zinc-950"
            >
              <p className="text-sm font-medium text-zinc-950 dark:text-zinc-50">Drafts</p>
              <p className="mt-2 text-xs text-zinc-500 dark:text-zinc-400">View and edit draft posts</p>
            </Link>
            <Link
              href="/addpost"
              className="rounded-3xl border border-zinc-200 bg-white p-6 text-center transition hover:border-zinc-300 hover:shadow-lg dark:border-zinc-800 dark:bg-zinc-950"
            >
              <p className="text-sm font-medium text-zinc-950 dark:text-zinc-50">Add Post</p>
              <p className="mt-2 text-xs text-zinc-500 dark:text-zinc-400">Create a new post</p>
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}
