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
    <div>
      <h2>Textract</h2>
      <input type="file" accept="image/*" onChange={handleFileChange} />
      <button onClick={handleUpload}>Extract Text</button>
      <ul>
        {extractedText.map((line, idx) => (
          <li key={idx}>{line}</li>
        ))}
      </ul>
    </div>
  );
};

export default Textract;
