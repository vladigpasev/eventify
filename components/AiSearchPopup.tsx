//Copyright (C) 2024  Vladimir Pasev
"use client"
import React from 'react';

//@ts-ignore
const AISearchPopup = ({ isOpen, onClose, onSubmit }) => {
  const [prompt, setPrompt] = React.useState('');

  const handleSubmit = () => {
    if (prompt.length <= 0) {
      alert("Please fill out the field!")
    } else {
      onSubmit(prompt);
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center">
      <div className="bg-white p-5 rounded-lg w-full max-w-2xl max-h-screen">
        <h2 className="text-lg mb-2">Въведете заявката си за търсене с AI</h2>
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          className="w-full border p-2 input border-gray-300"
          //@ts-ignore
          rows="4"
          placeholder='Какво бихте искали да направите днес? (Пример: Слуша ми се музика)'
          required
        />
        <div className="mt-4 flex justify-end gap-2">
          <button onClick={onClose} className="bg-gray-200 px-4 py-2 rounded btn">Отказ</button>
          <button onClick={handleSubmit} className="bg-blue-500 text-white px-4 py-2 rounded btn">Търсене</button>
        </div>
      </div>
    </div>
  );
};

export default AISearchPopup;
