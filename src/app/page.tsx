

import Link from 'next/link';

async function getDrawers() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/drawers`, { cache: 'no-store' });
  if (!res.ok) {
    throw new Error('Failed to fetch drawers');
  }
  return res.json();
}

const getPastelColor = (id: string) => {
  const lightColors = [
    'bg-red-100', 'bg-orange-100', 'bg-amber-100', 'bg-yellow-100', 'bg-lime-100',
    'bg-green-100', 'bg-emerald-100', 'bg-teal-100', 'bg-cyan-100', 'bg-sky-100',
    'bg-blue-100', 'bg-indigo-100', 'bg-violet-100', 'bg-purple-100', 'bg-fuchsia-100',
    'bg-pink-100', 'bg-rose-100',
  ];
  const darkColors = [
    'text-red-800', 'text-orange-800', 'text-amber-800', 'text-yellow-800', 'text-lime-800',
    'text-green-800', 'text-emerald-800', 'text-teal-800', 'text-cyan-800', 'text-sky-800',
    'text-blue-800', 'text-indigo-800', 'text-violet-800', 'text-purple-800', 'text-fuchsia-800',
    'text-pink-800', 'text-rose-800',
  ];
  let hash = 0;
  for (let i = 0; i < id.length; i++) {
    hash = id.charCodeAt(i) + ((hash << 5) - hash);
  }
  const index = Math.abs(hash) % lightColors.length;
  return { light: lightColors[index], dark: darkColors[index] };
};

const DrawerIcon = ({ color }: { color: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={`h-16 w-16 ${color}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="4" y="11" width="16" height="2" rx="1" ry="1" />
  </svg>
);

export default async function Home() {
  const { data: drawers } = await getDrawers();

  return (
    <div className="text-center my-16">
      <h1 className="text-4xl font-bold text-black">Intro</h1>
      <p className="text-lg mt-4 text-black">I have this intrusive impulse of rummaging through strangers’ drawers, <br /> breaching their intimacy without them knowing.</p>
      <p className="text-lg mt-2 text-black">Feeling guilty about this, I now invite you to wander through mine, or <br /> encourage anyone who feels like sharing theirs.</p>
      
      <div className="my-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {drawers && drawers.map((drawer: any) => {
          const colors = getPastelColor(drawer._id);
          return (
            <Link key={drawer._id} href={`/drawer/${drawer._id}`}>
              <div className={`${colors.light} rounded-lg shadow-lg h-32 flex items-center justify-center transform hover:-translate-y-2 transition-transform duration-300 cursor-pointer`}>
                <DrawerIcon color={colors.dark} />
              </div>
            </Link>
          );
        })}
      </div>

      <div className="my-16">
        <h2 className="text-4xl font-bold text-black">Feeling guilty too?</h2>
        <p className="text-lg mt-4 text-black">This website wasn’t made to be a one-man-show, so feel free to create your drawer too.</p>
        <div className="mt-8">
          <Link href="/new" className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-6 rounded-lg shadow-md transition-transform transform hover:scale-105">
            Create your drawer
          </Link>
          <Link href="/admin" className="ml-4 bg-gray-700 hover:bg-gray-800 text-white font-bold py-3 px-6 rounded-lg shadow-md transition-transform transform hover:scale-105">
            Approve Drawers
          </Link>
        </div>
      </div>
    </div>
  );
}
