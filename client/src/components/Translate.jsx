import React, { useState } from 'react';
import { translateText } from '../services/api';

const Translate = () => {
  const [text, setText] = useState('');
  const [targetLanguage, setTargetLanguage] = useState('es'); // Default to Spanish
  const [translatedText, setTranslatedText] = useState('');

  const handleTranslate = async () => {
    try {
      const response = await translateText(text, targetLanguage);
      setTranslatedText(response.data.translatedText);
    } catch (error) {
      console.error('Translate Error:', error);
      alert('Failed to translate text.');
    }
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100 p-6">
      <div className="w-full max-w-lg bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Translate Text
        </h2>
        <textarea
          className="w-full h-32 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 mb-4"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter text to translate"
        />
        <input
          type="text"
          value={targetLanguage}
          onChange={(e) => setTargetLanguage(e.target.value)}
          placeholder="Target Language (e.g., es for Spanish)"
          className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 mb-4"
        />
        <button
          onClick={handleTranslate}
          className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 focus:ring-2 focus:ring-blue-400 focus:outline-none"
        >
          Translate
        </button>
        {translatedText && (
          <div className="mt-6 bg-gray-50 p-4 rounded-lg shadow-inner">
            <h3 className="text-lg font-semibold text-gray-700 mb-2">
              Translated Text:
            </h3>
            <p className="text-gray-600">{translatedText}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Translate;
