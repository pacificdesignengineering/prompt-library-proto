import React from 'react';

const SearchBar = ({ search, onSearchChange, categoryOptions, selectedCategory, onCategoryChange, llmOptions, selectedLLM, onLLMChange }) => (
  <div className="flex flex-wrap gap-2 mb-4 items-center">
    <input
      className="p-2 border rounded flex-1 min-w-[180px]"
      type="text"
      placeholder="Search prompts..."
      value={search}
      onChange={e => onSearchChange(e.target.value)}
    />
    <select
      className="p-2 border rounded"
      value={selectedCategory}
      onChange={e => onCategoryChange(e.target.value)}
    >
      <option value="">All Categories</option>
      {categoryOptions.map(cat => (
        <option key={cat} value={cat}>{cat}</option>
      ))}
    </select>
    <select
      className="p-2 border rounded"
      value={selectedLLM}
      onChange={e => onLLMChange(e.target.value)}
    >
      <option value="">All LLMs</option>
      {llmOptions.map(llm => (
        <option key={llm} value={llm}>{llm}</option>
      ))}
    </select>
  </div>
);

export default SearchBar; 