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

// Helper to extract metadata from the frontmatter
function extractMetadata(content) {
  const metadata = {};
  
  // Extract frontmatter between --- markers (handle various formats)
  const frontmatterMatch = content.match(/^---\s*\n([\s\S]*?)\n---\s*\n/);
  if (frontmatterMatch) {
    const frontmatter = frontmatterMatch[1];
    const lines = frontmatter.split('\n');
    
    lines.forEach(line => {
      const colonIndex = line.indexOf(':');
      if (colonIndex > 0) {
        const key = line.substring(0, colonIndex).trim();
        let value = line.substring(colonIndex + 1).trim();
        
        // Remove quotes if present
        if ((value.startsWith('"') && value.endsWith('"')) || 
            (value.startsWith("'") && value.endsWith("'"))) {
          value = value.slice(1, -1);
        }
        
        // Handle array values
        if (value.startsWith('[') && value.endsWith(']')) {
          value = value.slice(1, -1).split(',').map(v => v.trim());
        }
        
        metadata[key] = value;
      }
    });
  }
  
  // Fallback: try to extract individual metadata fields if frontmatter parsing failed
  if (Object.keys(metadata).length === 0) {
    const get = (key) => {
      const re = new RegExp(`^${key}:\s*"?([^\n"]+)"?`, 'im');
      const found = content.match(re);
      return found ? found[1].trim() : '';
    };
    
    metadata.name = get('name');
    metadata.description = get('description');
    metadata.author = get('author');
    metadata.version = get('version');
    metadata.category = get('category');
    
    // Handle compatible_llms array
    const llmsMatch = content.match(/compatible_llms:\s*\[([^\]]+)\]/i);
    if (llmsMatch) {
      metadata.compatible_llms = llmsMatch[1].split(',').map(v => v.trim());
    }
    
    // Handle inputs array
    const inputsMatch = content.match(/inputs:\s*\[([^\]]+)\]/i);
    if (inputsMatch) {
      metadata.inputs = inputsMatch[1].split(',').map(v => v.trim());
    }
    
    // Handle outputs array
    const outputsMatch = content.match(/outputs:\s*\[([^\]]+)\]/i);
    if (outputsMatch) {
      metadata.outputs = outputsMatch[1].split(',').map(v => v.trim());
    }
  }
  
  return metadata;
}

// Helper to extract how-to guide section
function extractHowToGuide(content) {
  const lines = content.split('\n');
  let start = -1;
  let end = -1;
  
  for (let i = 0; i < lines.length; ++i) {
    const line = lines[i].trim();
    // Case-insensitive matching for the how-to guide section
    if (line.toLowerCase() === '## how to use this prompt') {
      start = i;
    } else if (start !== -1 && line.toLowerCase() === '## prompt') {
      end = i;
      break;
    }
  }
  
  if (start !== -1 && end !== -1) {
    return lines.slice(start, end).join('\n').trim();
  }
  
  return null;
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

const MetadataCard = ({ metadata }) => (
  <div className="bg-white/80 dark:bg-gray-800/80 rounded-xl p-4 border border-gray-200 dark:border-gray-700 mb-4">
    <h3 className="font-semibold text-lg mb-3 text-gray-800 dark:text-gray-200">Prompt Information</h3>
    <div className="space-y-3">
      {metadata.name && (
        <div className="flex items-center">
          <span className="text-sm font-medium text-gray-600 dark:text-gray-400 w-20">Name:</span>
          <span className="text-sm text-gray-800 dark:text-gray-200">{metadata.name}</span>
        </div>
      )}
      {metadata.version && (
        <div className="flex items-center">
          <span className="text-sm font-medium text-gray-600 dark:text-gray-400 w-20">Version:</span>
          <span className="text-sm text-gray-800 dark:text-gray-200">v{metadata.version}</span>
        </div>
      )}
      {metadata.author && (
        <div className="flex items-center">
          <span className="text-sm font-medium text-gray-600 dark:text-gray-400 w-20">Author:</span>
          <span className="text-sm text-gray-800 dark:text-gray-200">{metadata.author}</span>
        </div>
      )}
      {metadata.category && (
        <div className="flex items-center">
          <span className="text-sm font-medium text-gray-600 dark:text-gray-400 w-20">Category:</span>
          <span className="text-sm text-gray-800 dark:text-gray-200">{metadata.category}</span>
        </div>
      )}
      {metadata.compatible_llms && (
        <div className="flex items-start">
          <span className="text-sm font-medium text-gray-600 dark:text-gray-400 w-20">LLMs:</span>
          <div className="flex flex-wrap gap-1">
            {Array.isArray(metadata.compatible_llms) ? metadata.compatible_llms.map((llm, idx) => (
              <span key={idx} className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs rounded-full">
                {llm}
              </span>
            )) : (
              <span className="text-sm text-gray-800 dark:text-gray-200">{metadata.compatible_llms}</span>
            )}
          </div>
        </div>
      )}
      {metadata.inputs && (
        <div className="flex items-start">
          <span className="text-sm font-medium text-gray-600 dark:text-gray-400 w-20">Inputs:</span>
          <div className="flex flex-wrap gap-1">
            {Array.isArray(metadata.inputs) ? metadata.inputs.map((input, idx) => (
              <span key={idx} className="px-2 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 text-xs rounded-full">
                {input}
              </span>
            )) : (
              <span className="text-sm text-gray-800 dark:text-gray-200">{metadata.inputs}</span>
            )}
          </div>
        </div>
      )}
      {metadata.outputs && (
        <div className="flex items-start">
          <span className="text-sm font-medium text-gray-600 dark:text-gray-400 w-20">Outputs:</span>
          <div className="flex flex-wrap gap-1">
            {Array.isArray(metadata.outputs) ? metadata.outputs.map((output, idx) => (
              <span key={idx} className="px-2 py-1 bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 text-xs rounded-full">
                {output}
              </span>
            )) : (
              <span className="text-sm text-gray-800 dark:text-gray-200">{metadata.outputs}</span>
            )}
          </div>
        </div>
      )}
    </div>
  </div>
);

const HowToGuideCard = ({ howToGuide }) => {
  if (!howToGuide) return null;
  
  return (
    <div className="bg-white/80 dark:bg-gray-800/80 rounded-xl p-4 border border-gray-200 dark:border-gray-700 mb-4">
      <h3 className="font-semibold text-lg mb-3 text-gray-800 dark:text-gray-200 flex items-center">
        <svg className="w-5 h-5 mr-2 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        How to Use This Prompt
      </h3>
      <div className="prose prose-sm dark:prose-invert max-w-none">
        <ReactMarkdown>{howToGuide}</ReactMarkdown>
      </div>
    </div>
  );
};

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

  // Extract metadata and how-to guide
  const metadata = useMemo(() => {
    const extracted = extractMetadata(content);
    console.log('Extracted metadata:', extracted);
    return extracted;
  }, [content]);
  const howToGuide = useMemo(() => {
    const extracted = extractHowToGuide(content);
    console.log('Extracted how-to guide:', extracted ? 'Found' : 'Not found');
    return extracted;
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
        {/* Left: Summary Cards */}
        <div className="md:w-1/3 w-full flex flex-col gap-6">
          {/* Main Title Card */}
          <div className="backdrop-blur bg-white/70 dark:bg-gray-900/70 rounded-2xl shadow-xl p-6 border border-gray-200 dark:border-gray-700">
            <h2 className="text-3xl font-extrabold mb-2 tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-300 dark:to-purple-400">
              {metadata.name || filename}
            </h2>
            <div className="text-base text-gray-700 dark:text-gray-300 mb-4">
              {metadata.description}
            </div>
          </div>

          {/* Metadata Card */}
          <MetadataCard metadata={metadata} />

          {/* How-to Guide Card */}
          <HowToGuideCard howToGuide={howToGuide} />

          {/* Advanced Details Collapsible */}
          <Collapsible title="Show Full Prompt Details">
            <div className="mb-4">
              <ReactMarkdown className="prose prose-sm dark:prose-invert max-w-none">{content}</ReactMarkdown>
            </div>
          </Collapsible>
        </div>

        {/* Right: Form & Preview */}
        <div className="md:w-2/3 w-full flex flex-col gap-6">
          {variables.length > 0 ? (
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
          ) : (
            <div className="backdrop-blur bg-white/80 dark:bg-gray-800/80 rounded-2xl shadow-xl p-6 border border-gray-200 dark:border-gray-700 relative flex flex-col gap-4 items-start">
              <div className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-2">No user input required for this prompt.</div>
              <div className="text-sm text-gray-500 dark:text-gray-400 mb-2">Just attach your files and run the prompt as-is.</div>
              <button
                className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full shadow-lg hover:scale-105 active:scale-95 transition-transform font-semibold z-20"
                onClick={handleCopy}
                type="button"
                style={{ minWidth: 120 }}
              >
                {showCopied ? 'Copied!' : 'Copy to Clipboard'}
              </button>
              <pre className="mt-2 bg-gray-900/90 text-green-200 border border-gray-700 rounded-xl p-4 font-mono text-sm overflow-x-auto max-h-[40vh] shadow-inner transition-all duration-300">
                {promptSection}
              </pre>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PromptDetail; 