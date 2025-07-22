import React, { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';

const PromptDetail = ({ filename }) => {
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!filename) return;
    setLoading(true);
    fetch(`http://localhost:5000/api/prompts/${encodeURIComponent(filename)}`)
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch prompt content');
        return res.text();
      })
      .then(data => {
        setContent(data);
        setError(null);
      })
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, [filename]);

  if (loading) return <div className="p-4 text-center text-gray-500">Loading prompt...</div>;
  if (error) return <div className="p-4 text-center text-red-500">{error}</div>;

  const isMarkdown = filename.endsWith('.md');

  return (
    <div className="max-w-2xl mx-auto p-4 bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-4">{filename}</h2>
      {isMarkdown ? (
        <ReactMarkdown className="prose max-w-none">{content}</ReactMarkdown>
      ) : (
        <pre className="bg-gray-100 p-3 rounded whitespace-pre-wrap">{content}</pre>
      )}
    </div>
  );
};

export default PromptDetail; 