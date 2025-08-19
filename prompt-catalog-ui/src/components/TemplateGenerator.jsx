import React, { useEffect, useState } from 'react';

const apiUrl = import.meta.env.VITE_API_URL || "localhost:5000";

const TemplateGenerator = () => {
  const [formData, setFormData] = useState({
    promptName: '',
    category: '',
    description: '',
    version: '1.0',
    author: '',
    compatibleLlms: 'claude, chatgpt',
    compatibleInterfaces: 'ui',
    inputs: '',
    outputs: '',
    chainingCompatible: false,
    quickStartStep1: '',
    quickStartStep2: '',
    quickStartStep4: '',
    videoTutorialUrl: 'https://example.com/tutorial',
    inputRequirements: '',
    expectedOutput: '',
    bestPractices: '',
    commonUseCases: '',
    promptContent: '',
    exampleUsage: '',
    additionalBestPractices: '',
    commonPitfalls: '',
    adaptationTips: '',
    compatibleWith: '',
    recommendedUse: ''
  });

  const [showPreview, setShowPreview] = useState(false);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    // Fetch categories from backend derived from prompts directory
    fetch(`http://${apiUrl}/api/categories`)
      .then(res => res.ok ? res.json() : [])
      .then(list => setCategories(list))
      .catch(() => setCategories([]));
  }, []);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const generateTemplate = () => {
    const template = `# ${formData.promptName}

---
name: "${formData.promptName}"
category: "${formData.category}"
description: "${formData.description}"
version: ${formData.version}
author: "${formData.author}"
compatible_llms: [${formData.compatibleLlms}]
compatible_interfaces: [${formData.compatibleInterfaces}]
inputs: [${formData.inputs}]
outputs: [${formData.outputs}]
chaining_compatible: ${formData.chainingCompatible}
---

## How to Use This Prompt

### Quick Start Guide
1. **Prepare Your Input**: ${formData.quickStartStep1}
2. **Set Parameters**: ${formData.quickStartStep2}
3. **Run the Prompt**: ${formData.quickStartStep3 || 'Copy the prompt and paste it into your preferred LLM interface'}
4. **Review & Process**: ${formData.quickStartStep4}

### Video Tutorial
📹 **Screen Recording**: [How to Use ${formData.promptName}](${formData.videoTutorialUrl})

### Step-by-Step Instructions
1. **Input Requirements**:
   ${formData.inputRequirements}
   
2. **Expected Output**:
   ${formData.expectedOutput}

3. **Best Practices**:
   ${formData.bestPractices}

### Common Use Cases
${formData.commonUseCases}

---

## prompt

${formData.promptContent}

<!-- END PROMPT -->

## Example Usage
\`\`\`
${formData.exampleUsage}
\`\`\`

## Best Practices
${formData.additionalBestPractices}

## Common Pitfalls to Avoid
${formData.commonPitfalls}

## Adaptation Tips
${formData.adaptationTips}

---
Version: ${formData.version}  
Last Updated: ${new Date().toISOString().split('T')[0]}  
Compatible With: ${formData.compatibleWith}  
Recommended Use: ${formData.recommendedUse}`;

    return template;
  };

  const downloadTemplate = () => {
    const template = generateTemplate();
    const blob = new Blob([template], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${formData.promptName.toLowerCase().replace(/\s+/g, '_')}.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const isFormValid = () => {
    return formData.promptName && formData.category && formData.description && 
           formData.author && formData.promptContent;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-purple-100 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white/80 backdrop-blur rounded-2xl shadow-xl p-8 border border-gray-200">
          <h1 className="text-3xl font-extrabold mb-6 tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
            Prompt Template Generator
          </h1>
          <p className="text-gray-600 mb-8">
            Create a standardized prompt.md file that will display correctly in the prompt library webapp.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Basic Information */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Basic Information</h2>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Prompt Name *
                </label>
                <input
                  type="text"
                  name="promptName"
                  value={formData.promptName}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., Meeting Minutes from Transcript"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category *
                </label>
                {categories.length > 0 ? (
                  <div className="flex flex-col gap-2">
                    <select
                      name="category"
                      value={categories.includes(formData.category) ? formData.category : ''}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Select from existing…</option>
                      {categories.map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                    <input
                      type="text"
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Or type a custom path, e.g., project_management/new_area"
                      required
                    />
                  </div>
                ) : (
                  <input
                    type="text"
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="e.g., project_management/meeting_minutes"
                    required
                  />
                )}
                <p className="text-xs text-gray-500 mt-1">Matches the folder path under <code>prompts/</code>. Pick an existing path or type your own.</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description *
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Brief description of what this prompt does"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Version
                  </label>
                  <input
                    type="text"
                    name="version"
                    value={formData.version}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Author *
                  </label>
                  <input
                    type="text"
                    name="author"
                    value={formData.author}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Your name"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Compatible LLMs
                </label>
                <input
                  type="text"
                  name="compatibleLlms"
                  value={formData.compatibleLlms}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="claude, chatgpt, gemini"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Compatible Interfaces
                </label>
                <input
                  type="text"
                  name="compatibleInterfaces"
                  value={formData.compatibleInterfaces}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="ui, api, cli"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Inputs
                  </label>
                  <input
                    type="text"
                    name="inputs"
                    value={formData.inputs}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="INPUT_VARIABLE_1, INPUT_VARIABLE_2"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Outputs
                  </label>
                  <input
                    type="text"
                    name="outputs"
                    value={formData.outputs}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="formatted_output"
                  />
                </div>
              </div>

              <div>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    name="chainingCompatible"
                    checked={formData.chainingCompatible}
                    onChange={handleInputChange}
                    className="mr-2"
                  />
                  <span className="text-sm font-medium text-gray-700">Chaining Compatible</span>
                </label>
              </div>
            </div>

            {/* How to Use Section */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">How to Use Guide</h2>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Quick Start - Step 1
                </label>
                <input
                  type="text"
                  name="quickStartStep1"
                  value={formData.quickStartStep1}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Have your input ready"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Quick Start - Step 2
                </label>
                <input
                  type="text"
                  name="quickStartStep2"
                  value={formData.quickStartStep2}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Set your parameters"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Quick Start - Step 3
                </label>
                <input
                  type="text"
                  name="quickStartStep3"
                  value={formData.quickStartStep3 || ''}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Run the prompt (e.g., paste into LLM or click Run)"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Quick Start - Step 4
                </label>
                <input
                  type="text"
                  name="quickStartStep4"
                  value={formData.quickStartStep4}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Review the output"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Input Requirements
                </label>
                <textarea
                  name="inputRequirements"
                  value={formData.inputRequirements}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Describe what inputs are needed"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Expected Output
                </label>
                <textarea
                  name="expectedOutput"
                  value={formData.expectedOutput}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Describe what the prompt will produce"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Best Practices
                </label>
                <textarea
                  name="bestPractices"
                  value={formData.bestPractices}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Tips for best results"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Screen Recording URL (optional)
                </label>
                <input
                  type="url"
                  name="videoTutorialUrl"
                  value={formData.videoTutorialUrl}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="https://…"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Common Use Cases
                </label>
                <textarea
                  name="commonUseCases"
                  value={formData.commonUseCases}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="List common scenarios where this prompt is useful"
                />
              </div>
            </div>
          </div>

          {/* Prompt Content */}
          <div className="mt-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Prompt Content</h2>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Your Prompt *
              </label>
              <textarea
                name="promptContent"
                value={formData.promptContent}
                onChange={handleInputChange}
                rows={10}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Paste your complete prompt here..."
                required
              />
            </div>
          </div>

          {/* Additional Sections */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Example Usage
              </label>
              <textarea
                name="exampleUsage"
                value={formData.exampleUsage}
                onChange={handleInputChange}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Provide an example of how to use the prompt"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Common Pitfalls
              </label>
              <textarea
                name="commonPitfalls"
                value={formData.commonPitfalls}
                onChange={handleInputChange}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="What to avoid when using this prompt"
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-8 flex flex-wrap gap-4">
            <button
              onClick={() => setShowPreview(!showPreview)}
              className="px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
            >
              {showPreview ? 'Hide Preview' : 'Show Preview'}
            </button>
            
            <button
              onClick={downloadTemplate}
              disabled={!isFormValid()}
              className={`px-6 py-2 rounded-lg transition-colors ${
                isFormValid()
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:scale-105'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              Download Template
            </button>
          </div>

          {/* Preview */}
          {showPreview && (
            <div className="mt-8">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Preview</h2>
              <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto text-sm whitespace-pre-wrap">
                {generateTemplate()}
              </pre>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TemplateGenerator;
