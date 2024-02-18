"use client"
import React from 'react';

//@ts-ignore
const AISearchPopup = ({ isOpen, onClose, onSubmit }) => {
  const [prompt, setPrompt] = React.useState('');

  const handleSubmit = () => {
    onSubmit(prompt);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center">
      <div className="bg-white p-5 rounded-lg">
        <h2 className="text-lg mb-2">Enter your AI Search Prompt</h2>
        <textarea 
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          className="w-full border p-2"
          //@ts-ignore
          rows="4"
        />
        <div className="mt-4 flex justify-end gap-2">
          <button onClick={onClose} className="bg-gray-200 px-4 py-2 rounded">Cancel</button>
          <button onClick={handleSubmit} className="bg-blue-500 text-white px-4 py-2 rounded">Submit</button>
        </div>
      </div>
    </div>
  );
};

export default AISearchPopup;
