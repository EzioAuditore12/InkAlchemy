import React, { useState } from 'react';
import { uploadImageForTextract } from '../services/api';

const Textract = ({ copyToClipboard }) => {
  const [image, setImage] = useState(null);
  const [extractedText, setExtractedText] = useState([]);

  const handleFileChange = (e) => setImage(e.target.files[0]);

  const handleUpload = async () => {
    if (!image) {
      alert('Please select an image.');
      return;
    }
    try {
      const response = await uploadImageForTextract(image);
      setExtractedText(response.data.text);
    } catch (error) {
      console.error('Textract Error:', error);
      alert('Failed to process image.');
    }
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100 p-6">
      <div className="w-full max-w-lg bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Textract (Home)</h2>
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 mb-4"
        />
        <button
          onClick={handleUpload}
          className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 focus:ring-2 focus:ring-blue-400 focus:outline-none"
        >
          Extract Text
        </button>
        <ul className="mt-6 bg-gray-50 p-4 rounded-lg shadow-inner">
          {extractedText.map((line, idx) => (
            <li key={idx} className="flex justify-between items-center">
              <span className="text-gray-600">{line}</span>
              <button
                onClick={() => copyToClipboard(line)}
                className="text-blue-500 text-sm hover:underline"
              >
                Copy
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Textract;
