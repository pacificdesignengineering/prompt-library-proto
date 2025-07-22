import React from 'react';

const PromptCard = ({ prompt, onClick }) => (
  <div className="bg-white rounded shadow p-4 cursor-pointer hover:bg-gray-50" onClick={onClick}>
    <h3 className="text-lg font-semibold mb-2">{prompt.name}</h3>
    <p className="text-sm text-gray-600 mb-1">Category: {prompt.category}</p>
    <p className="text-sm text-gray-600 mb-1">LLM: {prompt.llm}</p>
    <p className="text-gray-700 truncate">{prompt.description}</p>
  </div>
);

export default PromptCard; 