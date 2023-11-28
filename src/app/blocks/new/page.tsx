import { db } from "@/db";
import { redirect } from "next/navigation";
import Link from "next/link";

export default function BlockCreatePage() {

  async function createBlock(formData: FormData) {
    // indicate that this function runs on the SERVER
    "use server";

    // get the data out of formData
    const title = formData.get("title") as string; // uses the name property of the input
    const tag = formData.get("tag") as string;
    const code = formData.get("code") as string;

    // create a new block in our database using prisma
    const newBlock = await db.block.create({ data: { title, tag, code } });

    // redirect the user back to the homepage
    redirect(`/blocks/${newBlock.id}`);
  }

  return (
    <main>
      <h1 className="mb-8 font-bold text-3xl">Create a Block</h1>

      <form action={createBlock} className="flex flex-col gap-4">
        <div className="flex gap-4 items-center">
          <label htmlFor="title" className="w-16">
            Title:
          </label>
          <input
            id="title"
            name="title"
            type="text"
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
            className="rounded border border-gray-500 w-full p-2">
          </textarea>
        </div>

        <div className="flex gap-4 justify-end mt-4">
          <Link href="/" className="px-4 py-2 rounded-lg text-white bg-sky-500 hover:bg-sky-700">
            <button type="button" className="w-full">
              Back to Home
            </button>
          </Link>

          <button type="submit" className="px-4 py-2 rounded-lg text-white bg-sky-500 hover:bg-sky-700">
            Create
          </button>
        </div>
      </form>
    </main>
  );
}