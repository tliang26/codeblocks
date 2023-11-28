import { db } from "@/db";
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function BlockShowPage({ params }: any) {

  const block = await db.block.findUnique({
    where: { id: parseInt(params.id) }
  });

  async function deleteBlock() {
    "use server";

    await db.block.delete({
      where: { id: block?.id }
    });

    redirect("/");
  }

  return (
    <main className="flex flex-col gap-8">
      <div className="border rounded-full px-4 py-2 self-start text-sm bg-gray-300">
        {block?.tag}
      </div>

      <div className="flex gap-4 content-center">
        <h1 className="mr-2 font-bold text-3xl">
          {block?.title}
        </h1>
        <Link href={`/blocks/${block?.id}/edit`} className="px-4 py-2 rounded-lg text-white bg-sky-500 hover:bg-sky-700">
          <button className="w-full">
            Edit
          </button>
        </Link>
        <form action={deleteBlock}>
          <button type="submit" className="px-4 py-2 rounded-lg text-white bg-sky-500 hover:bg-sky-700">
            Delete
          </button>
        </form>
      </div>

      <code className="border rounded p-6">
        {block?.code}
      </code>

      <Link href="/" className="px-4 py-2 self-start rounded-lg text-white bg-sky-500 hover:bg-sky-700">
        <button type="button">
          Back to Home
        </button>
      </Link>
    </main>
  );
}