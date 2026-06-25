import Link from "next/link";
import prisma from "../../lib/prisma";
import { redirect } from "next/navigation";

async function updateDraft(formData: FormData) {
  "use server";

  const id = formData.get("id");
  const title = formData.get("title");
  const content = formData.get("content");
  const publish = formData.get("publish") === "true";

  if (!id || typeof id !== "string") {
    throw new Error("Draft ID is required");
  }
  if (!title || typeof title !== "string") {
    throw new Error("Title is required");
  }

  await prisma.post.update({
    where: { id },
    data: {
      title,
      content: typeof content === "string" ? content : null,
      published: publish,
    },
  });

  redirect(publish ? "/post" : "/draft");
}

export default async function DraftEditPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const draft = await prisma.post.findUnique({
    where: { id },
    select: { id: true, title: true, content: true },
  });

  if (!draft) {
    return (
      <div className="min-h-screen bg-zinc-50 px-6 py-8 text-black dark:bg-black dark:text-zinc-50">
        <main className="mx-auto w-full max-w-5xl rounded-3xl bg-white p-8 shadow-lg shadow-black/5 dark:bg-zinc-950">
          <h1 className="text-xl font-semibold text-zinc-950 dark:text-zinc-50">Draft not found</h1>
          <p className="mt-4 text-sm text-zinc-600 dark:text-zinc-400">This draft does not exist or may have been published already.</p>
          <Link href="/draft" className="mt-6 inline-flex rounded-full border border-zinc-200 px-4 py-2 text-sm text-zinc-950 transition hover:bg-zinc-100 dark:border-zinc-800 dark:text-zinc-50">
            Back to Drafts
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
            <h1 className="mt-3 text-3xl font-semibold tracking-tight text-zinc-950 dark:text-zinc-50">Edit Draft</h1>
          </div>
          <nav className="flex flex-wrap items-center gap-3 text-sm font-medium text-zinc-600 dark:text-zinc-300">
            <Link className="rounded-full px-4 py-2 transition hover:bg-zinc-100 hover:text-zinc-950 dark:hover:bg-zinc-900" href="/">
              Home
            </Link>
            <Link className="rounded-full px-4 py-2 transition hover:bg-zinc-100 hover:text-zinc-950 dark:hover:bg-zinc-900" href="/post">
              Posts
            </Link>
            <Link className="rounded-full px-4 py-2 bg-zinc-950 text-white transition hover:bg-zinc-800 dark:bg-zinc-50 dark:text-zinc-950 dark:hover:bg-zinc-100" href="/draft">
              Drafts
            </Link>
          </nav>
        </header>

        <form action={updateDraft} className="space-y-6">
          <input type="hidden" name="id" value={draft.id} />

          <div>
            <label htmlFor="title" className="mb-2 block text-sm font-medium text-zinc-700 dark:text-zinc-300">Title</label>
            <input
              id="title"
              name="title"
              defaultValue={draft.title}
              className="w-full rounded-2xl border border-zinc-200 bg-transparent px-4 py-3 text-sm text-zinc-950 outline-none transition focus:border-zinc-950 dark:border-zinc-800 dark:text-zinc-50"
            />
          </div>

          <div>
            <label htmlFor="content" className="mb-2 block text-sm font-medium text-zinc-700 dark:text-zinc-300">Content</label>
            <textarea
              id="content"
              name="content"
              rows={8}
              defaultValue={draft.content ?? ""}
              className="w-full rounded-2xl border border-zinc-200 bg-transparent px-4 py-3 text-sm text-zinc-950 outline-none transition focus:border-zinc-950 dark:border-zinc-800 dark:text-zinc-50"
            />
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              type="submit"
              name="publish"
              value="false"
              className="rounded-full border border-zinc-200 bg-white px-6 py-3 text-sm font-semibold text-zinc-950 transition hover:border-zinc-300 hover:bg-zinc-100 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-50"
            >
              Save Draft
            </button>
            <button
              type="submit"
              name="publish"
              value="true"
              className="rounded-full bg-zinc-950 px-6 py-3 text-sm font-semibold text-white transition hover:bg-zinc-800 dark:bg-zinc-50 dark:text-zinc-950 dark:hover:bg-zinc-100"
            >
              Publish
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}
