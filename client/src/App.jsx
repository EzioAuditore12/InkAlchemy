import { useState } from 'react';
import axios from 'axios';

function App() {
  const [image, setImage] = useState(null);
  const [recognizedText, setRecognizedText] = useState([]);

  // Handle file input change
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(file);
    }
  };

  // Handle file upload to the server
  const handleFileUpload = async () => {
    if (!image) {
      alert('Please select an image file first.');
      return;
    }

    const formData = new FormData();
    formData.append('image', image);

    try {
      const response = await axios.post('http://localhost:8080/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      // Store the recognized text in state
      setRecognizedText(response.data.text);
    } catch (error) {
      console.error('Error uploading image:', error);
      alert('Error uploading image.');
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold underline">AWS Textract Demo</h1>

      <div>
        <input type="file" accept="image/*" onChange={handleFileChange} />
        <button onClick={handleFileUpload}>Upload and Process</button>
      </div>

      <div>
        {recognizedText.length > 0 ? (
          <ul>
            {recognizedText.map((text, index) => (
              <li key={index}>{text}</li>
            ))}
          </ul>
        ) : (
          <p>No recognized text yet. Upload an image.</p>
        )}
      </div>
    </div>
  );
}

export default App;
