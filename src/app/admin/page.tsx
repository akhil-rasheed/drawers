
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function AdminPage() {
  const [password, setPassword] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);
  const [drawers, setDrawers] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    const res = await fetch('/api/admin/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ password }),
    });

    if (res.ok) {
      setLoggedIn(true);
    } else {
      alert('Invalid password');
    }
    setLoading(false);
  };

  const fetchDrawers = async () => {
    const res = await fetch('/api/admin/drawers');
    const { data } = await res.json();
    setDrawers(data);
  };

  const approveDrawer = async (id: string) => {
    const res = await fetch(`/api/admin/approve/${id}`, {
      method: 'PATCH',
    });

    if (res.ok) {
      fetchDrawers();
    }
  };

  useEffect(() => {
    if (loggedIn) {
      fetchDrawers();
    }
  }, [loggedIn]);

  if (!loggedIn) {
    return (
      <div className="flex items-center text-gray-800 justify-center min-h-screen ">
        <div className="bg-orange-100 rounded-lg shadow-lg p-8 max-w-sm w-full">
          <h1 className="text-3xl font-bold mb-6 text-center">Admin Login</h1>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-orange-500 transition-shadow"
            placeholder="Password"
          />
          <button onClick={handleLogin} disabled={loading} className="mt-6 w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 rounded-lg shadow-md transition-transform transform hover:scale-105 disabled:bg-gray-400">
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-gray-800 text-4xl font-bold">Admin Dashboard</h1>
        <Link href="/" className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-6 rounded-lg shadow-md transition-transform transform hover:scale-105">
          Go to Homepage
        </Link>
      </div>
      <div className="bg-orange-100 rounded-lg shadow-lg">
        <ul className="divide-y divide-gray-200">
          {drawers.map((drawer: any) => (
            <li key={drawer._id} className="p-6 flex justify-between items-center">
              <div>
                <p className="text-lg text-gray-600">{drawer.content.substring(0, 50)}...</p>
                <p className={`mt-2 text-sm font-bold ${drawer.status === 'approved' ? 'text-green-500' : 'text-orange-600'}`}>
                  {drawer.status.charAt(0).toUpperCase() + drawer.status.slice(1)}
                </p>
              </div>
              {drawer.status === 'draft' && (
                <button onClick={() => approveDrawer(drawer._id)} className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg shadow-md transition-transform transform hover:scale-105">
                  Approve
                </button>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
