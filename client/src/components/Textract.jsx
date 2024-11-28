import React, { useState } from 'react';
import { uploadImageForTextract } from '../services/api';

const Textract = () => {
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
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Textract - Image to Text
        </h2>
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="block w-full text-sm text-gray-700 border rounded-lg cursor-pointer focus:ring-2 focus:ring-blue-400 focus:outline-none mb-4"
        />
        <button
          onClick={handleUpload}
          className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 focus:ring-2 focus:ring-blue-400 focus:outline-none"
        >
          Extract Text
        </button>
        {extractedText.length > 0 && (
          <div className="mt-6 bg-gray-50 p-4 rounded-lg shadow-inner">
            <h3 className="text-lg font-semibold text-gray-700 mb-4">
              Extracted Text:
            </h3>
            <ul className="list-disc list-inside text-gray-600 space-y-2">
              {extractedText.map((line, idx) => (
                <li key={idx}>{line}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Textract;
