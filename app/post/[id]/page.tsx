import Link from "next/link";
import prisma from "../../lib/prisma";
import { redirect } from "next/navigation";

async function createComment(formData: FormData) {
  "use server";

  const postId = formData.get("postId");
  const content = formData.get("content");

  if (!postId || typeof postId !== "string") {
    throw new Error("Post ID is required");
  }

  await prisma.comment.create({
    data: {
      content: typeof content === "string" ? content : null,
      post: { connect: { id: postId } },
      published: true,
    },
  });

  redirect(`/post/${postId}`);
}

export default async function PostDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const post = await prisma.post.findUnique({
    where: { id },
    include: { comments: true },
  });

  if (!post) {
    return (
      <div className="min-h-screen bg-zinc-50 px-6 py-8 text-black dark:bg-black dark:text-zinc-50">
        <main className="mx-auto w-full max-w-5xl rounded-3xl bg-white p-8 shadow-lg shadow-black/5 dark:bg-zinc-950">
          <h1 className="text-xl font-semibold text-zinc-950 dark:text-zinc-50">Post not found</h1>
          <p className="mt-4 text-sm text-zinc-600 dark:text-zinc-400">This post may have been deleted or does not exist.</p>
          <Link href="/post" className="mt-6 inline-flex rounded-full border border-zinc-200 px-4 py-2 text-sm text-zinc-950 transition hover:bg-zinc-100 dark:border-zinc-800 dark:text-zinc-50">
            Back to Posts
          </Link>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-50 px-6 py-8 text-black dark:bg-black dark:text-zinc-50">
      <main className="mx-auto w-full max-w-5xl rounded-3xl bg-white p-8 shadow-lg shadow-black/5 dark:bg-zinc-950">
        <header className="mb-10 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.35em] text-zinc-500 dark:text-zinc-400">Posts App</p>
            <h1 className="mt-3 text-3xl font-semibold tracking-tight text-zinc-950 dark:text-zinc-50">{post.title}</h1>
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
          </nav>
        </header>

        <article className="space-y-8 rounded-3xl border border-zinc-200 bg-zinc-50 p-8 dark:border-zinc-800 dark:bg-zinc-900">
          <div className="space-y-5">
            <p className="text-sm leading-7 text-zinc-600 dark:text-zinc-400">{post.content ?? "No content available."}</p>
          </div>
          <section className="rounded-3xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-950">
            <h2 className="text-lg font-semibold text-zinc-950 dark:text-zinc-50">Comments</h2>
            {post.comments.length === 0 ? (
              <p className="mt-3 text-sm text-zinc-600 dark:text-zinc-400">No comments yet. Leave feedback below.</p>
            ) : (
              <div className="mt-4 space-y-4">
                {post.comments.map((comment) => (
                  <div key={comment.id} className="rounded-3xl border border-zinc-200 bg-zinc-50 p-4 dark:border-zinc-800 dark:bg-zinc-900">
                    <p className="text-sm leading-7 text-zinc-600 dark:text-zinc-400">{comment.content ?? "No comment content."}</p>
                  </div>
                ))}
              </div>
            )}

            <form action={createComment} className="mt-6 space-y-4">
              <input type="hidden" name="postId" value={post.id} />
              <div>
                <label htmlFor="content" className="mb-2 block text-sm font-medium text-zinc-700 dark:text-zinc-300">Add feedback</label>
                <textarea
                  id="content"
                  name="content"
                  rows={4}
                  className="w-full rounded-2xl border border-zinc-200 bg-transparent px-4 py-3 text-sm text-zinc-950 outline-none transition focus:border-zinc-950 dark:border-zinc-800 dark:text-zinc-50"
                  placeholder="Write your comment here..."
                />
              </div>
              <button
                type="submit"
                className="inline-flex items-center justify-center rounded-full bg-zinc-950 px-6 py-3 text-sm font-semibold text-white transition hover:bg-zinc-800 dark:bg-zinc-50 dark:text-zinc-950 dark:hover:bg-zinc-100"
              >
                Submit Comment
              </button>
            </form>
          </section>
        </article>
      </main>
    </div>
  );
}
