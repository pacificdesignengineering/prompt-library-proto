import React from 'react';
import { useParams } from 'react-router-dom';
import PromptDetail from '../components/PromptDetail';

const PromptDetailPage = () => {
  const { filename } = useParams();
  if (!filename) return <div className="p-4 text-red-500">No filename provided.</div>;
  return <PromptDetail filename={filename} />;
};

export default PromptDetailPage; 