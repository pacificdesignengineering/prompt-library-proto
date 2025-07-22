import React from 'react';

const PromptConfigurator = ({ inputs = [], values = {}, onChange, preview }) => (
  <div className="mb-4">
    <form className="space-y-2">
      {inputs.map(input => (
        <div key={input.name}>
          <label className="block text-sm font-medium text-gray-700">{input.label || input.name}</label>
          <input
            className="mt-1 p-2 border rounded w-full"
            type="text"
            name={input.name}
            value={values[input.name] || ''}
            onChange={onChange}
            placeholder={input.placeholder || ''}
          />
        </div>
      ))}
    </form>
    {preview && (
      <div className="mt-4">
        <strong>Preview:</strong>
        <pre className="bg-gray-100 p-2 rounded whitespace-pre-wrap">{preview}</pre>
      </div>
    )}
  </div>
);

export default PromptConfigurator; 