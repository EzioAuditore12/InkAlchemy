import React, { useState } from 'react';
import { analyzeSentiment } from '../services/api';

const Sentiment = ({ copyToClipboard }) => {
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
    <div className="flex flex-col items-center min-h-screen bg-gray-100 p-6">
      <div className="w-full max-w-lg bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Sentiment Analysis</h2>
        <textarea
          className="w-full h-32 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 mb-4"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter text for analysis"
        />
        <button
          onClick={handleAnalyze}
          className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 focus:ring-2 focus:ring-blue-400 focus:outline-none"
        >
          Analyze Sentiment
        </button>
        {sentimentResult && (
          <div className="mt-6 bg-gray-50 p-4 rounded-lg shadow-inner">
            <h3 className="text-lg font-semibold text-gray-700 mb-2">Sentiment:</h3>
            <p className="text-gray-600">{sentimentResult.sentiment}</p>
            <button
              onClick={() => copyToClipboard(sentimentResult.sentiment)}
              className="mt-2 bg-green-500 text-white py-1 px-3 rounded-lg hover:bg-green-600 focus:outline-none"
            >
              Copy Sentiment
            </button>
            <pre className="text-sm text-gray-600 mt-4">{JSON.stringify(sentimentResult.sentimentScore, null, 2)}</pre>
          </div>
        )}
      </div>
    </div>
  );
};

export default Sentiment;
