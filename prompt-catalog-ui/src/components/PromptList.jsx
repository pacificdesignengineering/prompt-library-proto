import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const PromptList = () => {
  const [filenames, setFilenames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetch('http://localhost:5000/api/prompts')
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch prompt list');
        return res.json();
      })
      .then(data => {
        setFilenames(data);
        setError(null);
      })
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="p-4 text-center text-gray-500">Loading prompts...</div>;
  if (error) return <div className="p-4 text-center text-red-500">{error}</div>;

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Available Prompts</h2>
      <ul className="divide-y divide-gray-200 bg-white rounded shadow">
        {filenames.map(filename => (
          <li key={filename} className="p-3 hover:bg-gray-50 transition">
            <Link to={`/prompt/${encodeURIComponent(filename)}`} className="text-blue-600 hover:underline">
              {filename}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PromptList; 