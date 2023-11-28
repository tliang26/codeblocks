// "use client"; // REQUIRED if states (useState) or event handlers are needed

import { db } from "@/db";
import Link from "next/link";

export default async function Home() {

  const blocks = await db.block.findMany();
  const renderedBlocks = blocks.map((block) => (
    <Link key={block.id} href={`/blocks/${block.id}`} className="border rounded p-2">
      <div>{block.title}</div>
    </Link>
  ));

  return (
    <main>
      <div className="flex justify-between">
        <h1 className="mb-8 font-bold text-3xl">
          Blocks
        </h1>
        <Link href="/blocks/new" className="px-4 py-2 self-start rounded-lg text-white bg-sky-500 hover:bg-sky-700">
          <button type="button" className="w-full">
            New
          </button>
        </Link>
      </div>

      <div className="flex flex-col gap-4">
        {renderedBlocks}
      </div>
    </main>
  );
}