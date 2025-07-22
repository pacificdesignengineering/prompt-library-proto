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

const Collapsible = ({ title, children }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="mb-4">
      <button
        className="text-blue-500 hover:text-blue-400 font-semibold mb-2 transition-colors"
        onClick={() => setOpen(o => !o)}
        type="button"
      >
        {open ? '▼' : '►'} {title}
      </button>
      <div className={`transition-all duration-300 ${open ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>{open && <div className="mt-2">{children}</div>}</div>
    </div>
  );
};

const DarkModeToggle = ({ dark, setDark }) => (
  <button
    className="absolute top-4 right-4 z-20 bg-gray-200 dark:bg-gray-800 rounded-full p-2 shadow hover:scale-110 transition-transform"
    onClick={() => setDark(d => !d)}
    aria-label="Toggle dark mode"
    type="button"
  >
    {dark ? (
      <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M21 12.79A9 9 0 1111.21 3a7 7 0 109.79 9.79z" /></svg>
    ) : (
      <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="5" /><path d="M12 1v2m0 18v2m11-11h-2M3 12H1m16.95 6.95l-1.41-1.41M6.34 6.34L4.93 4.93m12.02 0l-1.41 1.41M6.34 17.66l-1.41 1.41" /></svg>
    )}
  </button>
);

const PromptDetail = ({ filename }) => {
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [values, setValues] = useState({});
  const [copied, setCopied] = useState(false);
  const [defaults, setDefaults] = useState({});
  const [showCopied, setShowCopied] = useState(false);
  const [dark, setDark] = useState(false);

  useEffect(() => {
    if (!filename) return;
    setLoading(true);
    setValues({});
    setCopied(false);
    setShowCopied(false);
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

  // Extract metadata for summary card
  const meta = useMemo(() => {
    const m = {};
    const get = (key) => {
      const re = new RegExp(`^${key}:\s*"?([^\n"]+)`, 'im');
      const found = content.match(re);
      return found ? found[1].trim() : '';
    };
    m.name = get('name');
    m.description = get('description');
    m.author = get('author');
    m.version = get('version');
    return m;
  }, [content]);

  const variables = useMemo(() => extractVariables(content), [content]);
  const isMarkdown = filename.endsWith('.md');
  const promptSection = useMemo(() => extractPromptSection(content), [content]);
  const preview = useMemo(() => fillTemplate(promptSection, values), [promptSection, values]);

  const handleInputChange = e => {
    setValues(v => ({ ...v, [e.target.name]: e.target.value }));
    setCopied(false);
    setShowCopied(false);
  };

  const handleCopy = () => {
    const promptOnly = fillTemplate(promptSection, values);
    navigator.clipboard.writeText(promptOnly);
    setCopied(true);
    setShowCopied(true);
    setTimeout(() => setShowCopied(false), 1500);
  };

  useEffect(() => {
    if (dark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [dark]);

  if (loading) return <div className="p-4 text-center text-gray-500">Loading prompt...</div>;
  if (error) return <div className="p-4 text-center text-red-500">Error: {error}</div>;

  return (
    <div className={`relative min-h-screen transition-colors duration-500 ${dark ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 text-gray-100' : 'bg-gradient-to-br from-blue-100 via-white to-purple-100 text-gray-900'}`}>
      <DarkModeToggle dark={dark} setDark={setDark} />
      <div className="max-w-5xl mx-auto py-8 px-4 flex flex-col md:flex-row gap-8">
        {/* Left: Summary Card */}
        <div className="md:w-1/3 w-full flex flex-col gap-6">
          <div className="backdrop-blur bg-white/70 dark:bg-gray-900/70 rounded-2xl shadow-xl p-6 border border-gray-200 dark:border-gray-700">
            <h2 className="text-3xl font-extrabold mb-2 tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-300 dark:to-purple-400">{meta.name || filename}</h2>
            <div className="text-base text-gray-700 dark:text-gray-300 mb-2">{meta.description}</div>
            <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400">
              <span>v{meta.version}</span>
              <span>Author: {meta.author}</span>
            </div>
          </div>
          <Collapsible title="Show Metadata & Advanced Details">
            <div className="mb-4">
              <ReactMarkdown className="prose prose-sm dark:prose-invert max-w-none">{content}</ReactMarkdown>
            </div>
          </Collapsible>
        </div>
        {/* Right: Form & Preview */}
        <div className="md:w-2/3 w-full flex flex-col gap-6">
          {variables.length > 0 && (
            <div className="backdrop-blur bg-white/80 dark:bg-gray-800/80 rounded-2xl shadow-xl p-6 border border-gray-200 dark:border-gray-700 relative">
              <h3 className="font-semibold mb-4 text-xl tracking-tight">Customize Prompt</h3>
              <PromptConfigurator
                inputs={variables.map(name => ({ name, label: name, placeholder: defaults[name] }))}
                values={values}
                onChange={handleInputChange}
                preview={null}
              />
              <div className="mt-6 relative">
                <span className="font-semibold text-base">Preview:</span>
                <button
                  className="fixed md:static top-6 right-6 md:ml-4 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full shadow-lg hover:scale-105 active:scale-95 transition-transform font-semibold z-20 animate-bounce"
                  onClick={handleCopy}
                  type="button"
                  style={{ minWidth: 120 }}
                >
                  {showCopied ? 'Copied!' : 'Copy to Clipboard'}
                </button>
                <pre className="mt-4 bg-gray-900/90 text-green-200 border border-gray-700 rounded-xl p-4 font-mono text-sm overflow-x-auto max-h-[40vh] shadow-inner transition-all duration-300">
                  {preview}
                </pre>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PromptDetail; 