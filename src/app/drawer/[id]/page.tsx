
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';

async function getDrawer(id: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/drawers/${id}`, { cache: 'no-store' });
  if (!res.ok) {
    throw new Error('Failed to fetch drawer');
  }
  return res.json();
}

export default async function DrawerPage({ params }: any) {
  const awaitedParams = await params;
  const { data: drawer } = await getDrawer(awaitedParams.id);

  return (
    <div>
      <Link href="/" className="inline-block mb-8 text-blue-500 hover:text-blue-700 font-semibold">
        &larr; Back to all drawers
      </Link>
      <div className="text-gray-800 rounded-lg shadow-lg p-8">
        <div className="prose prose-invert lg:prose-xl">
          <ReactMarkdown>{drawer.content}</ReactMarkdown>
        </div>
        <div className="mt-8">
          {drawer.images && drawer.images.map((image: string, index: number) => (
            <img key={index} src={image} alt={`Drawer image ${index + 1}`} className="max-w-full h-auto rounded-lg mt-4 " />
          ))}
        </div>
      </div>
    </div>
  );
}
