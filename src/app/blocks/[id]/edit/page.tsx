import { db } from "@/db";
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function BlockEditPage({ params }: any) {

  const block = await db.block.findUnique({
    where: { id: parseInt(params.id) }
  });

  async function editBlock(formData: FormData) {
    "use server";

    const title = formData.get("title") as string;
    const tag = formData.get("tag") as string;
    const code = formData.get("code") as string;

    await db.block.update({
      where: { id: block?.id },
      data: { title, tag, code }
    });

    redirect(`/blocks/${block?.id}`);
  }

  return (
    <main>
      <h1 className="mb-8 font-bold text-3xl">Edit Block</h1>

      <form action={editBlock} className="flex flex-col gap-4">
        <div className="flex gap-4 items-center">
          <label htmlFor="title" className="w-16">
            Title:
          </label>
          <input
            id="title"
            name="title"
            type="text"
            defaultValue={block?.title}
            className="rounded border border-gray-500 w-full p-2"
          />
        </div>

        <div className="flex gap-4 items-center">
          <label htmlFor="tag" className="w-16">
            Tag:
          </label>
          <input
            id="tag"
            name="tag"
            type="text"
            defaultValue={block?.tag}
            className="rounded border border-gray-500 w-full p-2"
          />
        </div>

        <div className="flex gap-4 items-center">
          <label htmlFor="code" className="w-16">
            Code:
          </label>
          <textarea
            id="code"
            name="code"
            defaultValue={block?.code}
            className="rounded border border-gray-500 w-full p-2">
          </textarea>
        </div>

        <div className="flex gap-4 justify-end mt-4">
          <Link href={`/blocks/${block?.id}`} className="px-4 py-2 rounded-lg text-white bg-sky-500 hover:bg-sky-700">
            <button type="button" className="w-full">
              Cancel
            </button>
          </Link>

          <button type="submit" className="px-4 py-2 rounded-lg text-white bg-sky-500 hover:bg-sky-700">
            Save
          </button>
        </div>
      </form>
    </main>
  );
}