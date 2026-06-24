import Link from "next/link";
import { redirect } from "next/navigation";
import prisma from "../lib/prisma";

async function createPost(formData: FormData) {
  "use server";

  const title = formData.get("title");
  const content = formData.get("content");

  if (!title || typeof title !== "string") {
    throw new Error("Title is required");
  }

  await prisma.post.create({
    data: {
      title,
      content: typeof content === "string" ? content : null,
      published: true,
    },
  });

  redirect("/post");
}

export default function AddPostPage() {
  return (
    <div className="min-h-screen bg-zinc-50 px-6 py-8 text-black dark:bg-black dark:text-zinc-50">
      <main className="mx-auto w-full max-w-5xl rounded-3xl bg-white p-8 shadow-lg shadow-black/5 dark:bg-zinc-950">
        <header className="mb-10 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.35em] text-zinc-500 dark:text-zinc-400">Posts App</p>
            <h1 className="mt-3 text-3xl font-semibold tracking-tight text-zinc-950 dark:text-zinc-50">
              Add Post
            </h1>
          </div>
          <nav className="flex flex-wrap items-center gap-3 text-sm font-medium text-zinc-600 dark:text-zinc-300">
            <Link className="rounded-full px-4 py-2 transition hover:bg-zinc-100 hover:text-zinc-950 dark:hover:bg-zinc-900" href="/">
              Home
            </Link>
            <Link className="rounded-full px-4 py-2 transition hover:bg-zinc-100 hover:text-zinc-950 dark:hover:bg-zinc-900" href="/post">
              Posts
            </Link>
            <Link className="rounded-full px-4 py-2 transition hover:bg-zinc-100 hover:text-zinc-950 dark:hover:bg-zinc-900" href="/draft">
              Drafts
            </Link>
            <Link className="rounded-full px-4 py-2 bg-zinc-950 text-white transition hover:bg-zinc-800 dark:bg-zinc-50 dark:text-zinc-950 dark:hover:bg-zinc-100" href="/addpost">
              Add Post
            </Link>
          </nav>
        </header>
        <section className="space-y-8 rounded-3xl border border-zinc-200 p-10 dark:border-zinc-800">
          <form action={createPost} className="space-y-6">
            <div>
              <label className="mb-2 block text-sm font-medium text-zinc-700 dark:text-zinc-300" htmlFor="title">
                Title
              </label>
              <input
                id="title"
                name="title"
                type="text"
                placeholder="Working with Databases in Next.js Using Prisma"
                className="w-full rounded-2xl border border-zinc-200 bg-transparent px-4 py-3 text-sm text-zinc-950 outline-none transition focus:border-zinc-950 dark:border-zinc-800 dark:text-zinc-50"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-zinc-700 dark:text-zinc-300" htmlFor="content">
                Content
              </label>
              <textarea
                id="content"
                name="content"
                rows={8}
                placeholder="Write your post content here..."
                className="w-full rounded-2xl border border-zinc-200 bg-transparent px-4 py-3 text-sm text-zinc-950 outline-none transition focus:border-zinc-950 dark:border-zinc-800 dark:text-zinc-50"
              />
            </div>

            <button
              type="submit"
              className="inline-flex items-center justify-center rounded-full bg-zinc-950 px-6 py-3 text-sm font-semibold text-white transition hover:bg-zinc-800 dark:bg-zinc-50 dark:text-zinc-950 dark:hover:bg-zinc-100"
            >
              Add Post
            </button>
          </form>
        </section>
      </main>
    </div>
  );
}
