import React, { useEffect, useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import SearchBar from './SearchBar';

const getCategory = filename => filename.split('/')[0] || '';

const PromptList = () => {
  const [filenames, setFilenames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [contentCache, setContentCache] = useState({});
  const [contentLoading, setContentLoading] = useState(false);

  // Fetch filenames on mount
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

  // Fetch content for all prompts if searching by content
  useEffect(() => {
    if (!search.trim()) return;
    // Only fetch content for files not already cached
    const toFetch = filenames.filter(f => !(f in contentCache));
    if (toFetch.length === 0) return;
    setContentLoading(true);
    Promise.all(
      toFetch.map(filename =>
        fetch(`http://localhost:5000/api/prompts/${encodeURIComponent(filename)}`)
          .then(res => res.ok ? res.text() : '')
          .then(text => [filename, text])
          .catch(() => [filename, ''])
      )
    ).then(results => {
      setContentCache(prev => {
        const updated = { ...prev };
        results.forEach(([filename, text]) => {
          updated[filename] = text;
        });
        return updated;
      });
    }).finally(() => setContentLoading(false));
  }, [search, filenames, contentCache]);

  // Extract categories from filenames
  const categoryOptions = useMemo(() => {
    const cats = new Set(filenames.map(getCategory));
    return Array.from(cats).filter(Boolean);
  }, [filenames]);

  // Filter prompts
  const filteredFilenames = useMemo(() => {
    let filtered = filenames;
    if (selectedCategory) {
      filtered = filtered.filter(f => getCategory(f) === selectedCategory);
    }
    if (search.trim()) {
      const s = search.toLowerCase();
      filtered = filtered.filter(f => {
        if (f.toLowerCase().includes(s)) return true;
        const content = contentCache[f] || '';
        return content.toLowerCase().includes(s);
      });
    }
    return filtered;
  }, [filenames, selectedCategory, search, contentCache]);

  if (loading) return <div className="p-4 text-center text-gray-500">Loading prompts...</div>;
  if (error) return <div className="p-4 text-center text-red-500">{error}</div>;

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Available Prompts</h2>
      <SearchBar
        search={search}
        onSearchChange={setSearch}
        categoryOptions={categoryOptions}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
        llmOptions={[]}
        selectedLLM={''}
        onLLMChange={() => {}}
      />
      {contentLoading && search.trim() && (
        <div className="p-2 text-sm text-gray-400">Searching prompt content...</div>
      )}
      <ul className="divide-y divide-gray-200 bg-white rounded shadow">
        {filteredFilenames.length === 0 ? (
          <li className="p-3 text-gray-500">No prompts found.</li>
        ) : (
          filteredFilenames.map(filename => (
            <li key={filename} className="p-3 hover:bg-gray-50 transition">
              <Link to={`/prompt/${encodeURIComponent(filename)}`} className="text-blue-600 hover:underline">
                {filename}
              </Link>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default PromptList; 