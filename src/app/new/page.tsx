
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function NewDrawer() {
  const [content, setContent] = useState('');
  const [images, setImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      setLoading(true);
      const imagePromises = Array.from(files).map(file => {
        return new Promise<string>((resolve, reject) => {
          const reader = new FileReader();
          reader.onloadend = () => {
            resolve(reader.result as string);
          };
          reader.onerror = reject;
          reader.readAsDataURL(file);
        });
      });

      Promise.all(imagePromises).then(base64Images => {
        setImages(prevImages => [...prevImages, ...base64Images]);
        setLoading(false);
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const res = await fetch('/api/drawers', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ content, images }),
    });

    if (res.ok) {
      router.push('/');
    } else {
      setLoading(false);
      // Handle error
    }
  };

  return (
    <div className="rounded-lg shadow-lg p-8">
      <h1 className="text-gray-800 text-4xl font-bold mb-8">Create a New Drawer</h1>
      <form onSubmit={handleSubmit}>
        <textarea
          className="w-full h-64 text-gray-800 p-4 border rounded-lg focus:ring-2 focus:ring-orange-500 transition-shadow"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="What are you thinking about?"
          required
        ></textarea>
        <div className="mt-6">
          <label className="block text-lg font-semibold text-orange-800">
            <span className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded-lg shadow-md transition-transform transform hover:scale-105 cursor-pointer">
              Upload Images
            </span>
            <input type="file" multiple onChange={handleImageUpload} className="hidden" />
          </label>
        </div>
        <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
          {images.map((image, index) => (
            <img key={index} src={image} alt={`Preview ${index + 1}`} className="w-full h-auto rounded-lg shadow-md" />
          ))}
        </div>
        <button type="submit" disabled={loading} className="mt-8 w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-6 rounded-lg shadow-md transition-transform transform hover:scale-105 disabled:bg-gray-400 disabled:cursor-not-allowed">
          {loading ? 'Submitting...' : 'Submit Drawer'}
        </button>
      </form>
    </div>
  );
}
