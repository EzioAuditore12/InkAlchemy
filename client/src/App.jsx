import React from 'react';
import Textract from './components/Textract';
import Translate from './components/Translate';
import Sentiment from './components/Sentiment';

function App() {
  return (
    <div>
      <h1>AWS Demo App</h1>
      <Textract />
      <Translate />
      <Sentiment />
    </div>
  );
}

export default App;
