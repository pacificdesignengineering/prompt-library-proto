import React from 'react';

const About = () => (
  <div className="max-w-3xl mx-auto p-4">
    <h1 className="text-2xl font-bold mb-2">About the Prompt Catalog</h1>
    <p className="mb-2">This catalog helps you discover, preview, and use high-quality prompts for various LLMs. Browse prompts, filter by category or LLM, and copy or configure prompts for your needs.</p>
    <ul className="list-disc pl-6 mb-2">
      <li>Browse all prompts on the Home page.</li>
      <li>Filter by category or LLM, or search by name.</li>
      <li>Click a prompt card to view details and copy the prompt.</li>
      <li>If a prompt has inputs, fill them in to preview a customized prompt.</li>
    </ul>
    <p>Enjoy exploring and using the prompt library!</p>
  </div>
);

export default About; 