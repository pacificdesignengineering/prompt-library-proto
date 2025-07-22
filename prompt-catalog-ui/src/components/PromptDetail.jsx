import React, { useEffect, useState, useMemo } from 'react';
import ReactMarkdown from 'react-markdown';
import PromptConfigurator from './PromptConfigurator';

// Helper to extract variables like {{FIELD_NAME}}
function extractVariables(text) {
  const regex = /{{\s*([A-Z0-9_]+)\s*}}/g;
  const vars = new Set();
  let match;
  while ((match = regex.exec(text))) {
    vars.add(match[1]);
  }
  return Array.from(vars);
}

// Helper to replace variables with user values
function fillTemplate(text, values) {
  return text.replace(/{{\s*([A-Z0-9_]+)\s*}}/g, (_, v) => values[v] || '');
}

// Helper to extract default values from a code block
function extractDefaults(text) {
  const match = text.match(/```([\s\S]*?)```/);
  if (!match) return {};
  const lines = match[1].split('\n');
  const defaults = {};
  lines.forEach(line => {
    const m = line.match(/([A-Z0-9_]+)\s*=\s*"([^"]*)"/);
    if (m) {
      defaults[m[1]] = m[2];
    }
  });
  return defaults;
}

// Helper to extract the prompt section only
function extractPromptSection(text) {
  const lines = text.split('\n');
  let start = -1;
  for (let i = 0; i < lines.length; ++i) {
    if (lines[i].trim().toLowerCase().startsWith('## prompt')) {
      start = i + 1;
      break;
    }
  }
  if (start === -1) return '';
  let end = lines.length;
  // Look for <!-- END PROMPT --> marker first
  for (let i = start; i < lines.length; ++i) {
    if (lines[i].includes('<!-- END PROMPT -->')) {
      end = i;
      break;
    }
  }
  // If marker not found, fallback to next ## header
  if (end === lines.length) {
    for (let i = start; i < lines.length; ++i) {
      if (/^##\s+/.test(lines[i]) && !/^##\s+prompt/i.test(lines[i])) {
        end = i;
        break;
      }
    }
  }
  return lines.slice(start, end).join('\n').trim();
}

const PromptDetail = ({ filename }) => {
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [values, setValues] = useState({});
  const [copied, setCopied] = useState(false);
  const [defaults, setDefaults] = useState({});

  useEffect(() => {
    if (!filename) return;
    setLoading(true);
    setValues({});
    setCopied(false);
    fetch(`http://localhost:5000/api/prompts/${encodeURIComponent(filename)}`)
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch prompt content');
        return res.text();
      })
      .then(data => {
        setContent(data);
        setError(null);
        // Extract defaults and set as initial values
        const d = extractDefaults(data);
        setDefaults(d);
        setValues(d);
      })
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, [filename]);

  const variables = useMemo(() => extractVariables(content), [content]);
  const isMarkdown = filename.endsWith('.md');
  const preview = useMemo(() => fillTemplate(extractPromptSection(content), values), [content, values]);

  const handleInputChange = e => {
    setValues(v => ({ ...v, [e.target.name]: e.target.value }));
    setCopied(false);
  };

  const handleCopy = () => {
    const promptOnly = fillTemplate(extractPromptSection(content), values);
    navigator.clipboard.writeText(promptOnly);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  if (loading) return <div className="p-4 text-center text-gray-500">Loading prompt...</div>;
  if (error) return <div className="p-4 text-center text-red-500">Error: {error}</div>;

  return (
    <div className="max-w-2xl mx-auto p-4 bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-4">{filename}</h2>
      {isMarkdown ? (
        <ReactMarkdown className="prose max-w-none">{content}</ReactMarkdown>
      ) : (
        <pre className="bg-gray-100 p-3 rounded whitespace-pre-wrap">{content}</pre>
      )}
      {variables.length > 0 && (
        <div className="mt-6">
          <h3 className="font-semibold mb-2">Customize Prompt</h3>
          <PromptConfigurator
            inputs={variables.map(name => ({ name, label: name }))}
            values={values}
            onChange={handleInputChange}
            preview={preview}
          />
          <button
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
            onClick={handleCopy}
            type="button"
          >
            {copied ? 'Copied!' : 'Copy to Clipboard'}
          </button>
        </div>
      )}
    </div>
  );
};

export default PromptDetail; 