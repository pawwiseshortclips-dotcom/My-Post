import Link from "next/link";
import prisma from "../lib/prisma";

export default async function PostPage() {
  let posts: any[] = [];
  let fetchError: string | null = null;

  try {
    posts = await prisma.post.findMany({ where: { published: true } });
  } catch (error) {
    fetchError = error instanceof Error ? error.message : String(error);
  }

  return (
    <div className="min-h-screen bg-zinc-50 px-6 py-8 text-black dark:bg-black dark:text-zinc-50">
      <main className="mx-auto w-full max-w-5xl rounded-3xl bg-white p-8 shadow-lg shadow-black/5 dark:bg-zinc-950">
        <header className="mb-10 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.35em] text-zinc-500 dark:text-zinc-400">Posts App</p>
            <h1 className="mt-3 text-3xl font-semibold tracking-tight text-zinc-950 dark:text-zinc-50">
              Published Posts
            </h1>
          </div>
          <nav className="flex flex-wrap items-center gap-3 text-sm font-medium text-zinc-600 dark:text-zinc-300">
            <Link className="rounded-full px-4 py-2 transition hover:bg-zinc-100 hover:text-zinc-950 dark:hover:bg-zinc-900" href="/">
              Home
            </Link>
            <Link className="rounded-full px-4 py-2 bg-zinc-950 text-white transition hover:bg-zinc-800 dark:bg-zinc-50 dark:text-zinc-950 dark:hover:bg-zinc-100" href="/post">
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
        {fetchError ? (
          <section className="rounded-3xl border border-red-200 bg-red-50 p-10 text-center text-red-900 dark:border-red-800 dark:bg-red-950 dark:text-red-100">
            <h2 className="text-xl font-medium">Database error loading posts</h2>
            <p className="mt-4 max-w-2xl mx-auto text-sm leading-7">
              May problema sa koneksyon ng database. Subukang i-check ang iyong MySQL server o i-restore ang `posts` table.
            </p>
            <pre className="mt-6 overflow-x-auto rounded-xl bg-white/80 p-4 text-left text-xs text-zinc-900 dark:bg-zinc-900 dark:text-zinc-100">
              {fetchError}
            </pre>
          </section>
        ) : posts.length === 0 ? (
          <section className="rounded-3xl border border-zinc-200 p-10 text-center dark:border-zinc-800">
            <h2 className="text-xl font-medium text-zinc-950 dark:text-zinc-50">No published posts found.</h2>
            <p className="mt-4 max-w-2xl mx-auto text-sm leading-7 text-zinc-600 dark:text-zinc-400">
              Add new posts to see them appear here. You can also manage draft posts or start writing a new post in the Add Post page.
            </p>
          </section>
        ) : (
          <div className="space-y-4">
            {posts.map((post) => (
              <article key={post.id} className="rounded-3xl border border-zinc-200 bg-zinc-50 p-6 dark:border-zinc-800 dark:bg-zinc-900">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <h2 className="text-xl font-semibold text-zinc-950 dark:text-zinc-50">{post.title}</h2>
                    <p className="mt-3 text-sm leading-7 text-zinc-600 dark:text-zinc-400">
                      {post.content ?? "No content available."}
                    </p>
                  </div>
                  <Link
                    href={`/post/${post.id}`}
                    className="rounded-full bg-zinc-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-zinc-800 dark:bg-zinc-50 dark:text-zinc-950 dark:hover:bg-zinc-100"
                  >
                    View & Comment
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
