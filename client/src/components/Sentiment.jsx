import React, { useState } from 'react';
import { analyzeSentiment } from '../services/api';

const Sentiment = () => {
  const [text, setText] = useState('');
  const [sentimentResult, setSentimentResult] = useState(null);

  const handleAnalyze = async () => {
    try {
      const response = await analyzeSentiment(text);
      setSentimentResult(response.data);
    } catch (error) {
      console.error('Sentiment Analysis Error:', error);
      alert('Failed to analyze sentiment.');
    }
  };

  return (
    <div>
      <h2>Sentiment Analysis</h2>
      <textarea value={text} onChange={(e) => setText(e.target.value)} placeholder="Enter text for analysis" />
      <button onClick={handleAnalyze}>Analyze Sentiment</button>
      {sentimentResult && (
        <div>
          <p>Sentiment: {sentimentResult.sentiment}</p>
          <pre>{JSON.stringify(sentimentResult.sentimentScore, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default Sentiment;
