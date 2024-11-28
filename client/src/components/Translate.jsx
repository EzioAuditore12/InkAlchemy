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
    <div>
      <h2>Translate</h2>
      <textarea value={text} onChange={(e) => setText(e.target.value)} placeholder="Enter text to translate" />
      <input
        type="text"
        value={targetLanguage}
        onChange={(e) => setTargetLanguage(e.target.value)}
        placeholder="Target Language (e.g., es for Spanish)"
      />
      <button onClick={handleTranslate}>Translate</button>
      <p>Translated Text: {translatedText}</p>
    </div>
  );
};

export default Translate;
