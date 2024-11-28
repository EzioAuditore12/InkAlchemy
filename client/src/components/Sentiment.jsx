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
    <div className="flex flex-col items-center min-h-screen bg-gray-100 p-6">
      <div className="w-full max-w-lg bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
          Sentiment Analysis
        </h2>
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
            <p className="text-lg font-semibold text-gray-700">
              Sentiment: <span className="font-bold">{sentimentResult.sentiment}</span>
            </p>
            <pre className="bg-gray-100 p-3 mt-2 rounded-lg text-sm overflow-x-auto">
              {JSON.stringify(sentimentResult.sentimentScore, null, 2)}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
};

export default Sentiment;
