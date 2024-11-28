import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Sentiment from './components/Sentiment';
import Textract from './components/Textract';
import Translate from './components/Translate';

const App = () => {
  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    alert('Copied to clipboard!');
  };

  return (
    <Router>
      <Navbar />
      <div className="p-6">
        <Routes>
          <Route path="/" element={<Textract copyToClipboard={copyToClipboard} />} />
          <Route path="/translate" element={<Translate copyToClipboard={copyToClipboard} />} />
          <Route path="/sentiment" element={<Sentiment copyToClipboard={copyToClipboard} />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
