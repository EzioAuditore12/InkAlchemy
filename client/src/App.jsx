import { useState } from 'react';
import axios from 'axios';

function App() {
  const [image, setImage] = useState(null);
  const [recognizedText, setRecognizedText] = useState([]);
  const [translatedText, setTranslatedText] = useState('');
  const [targetLanguage, setTargetLanguage] = useState(''); // e.g., 'es' for Spanish
  const [errorMessage, setErrorMessage] = useState('');

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(file);
    }
  };

  const handleFileUpload = async () => {
    if (!image) {
      setErrorMessage('Please select an image file first.');
      return;
    }

    const formData = new FormData();
    formData.append('image', image);

    try {
      const response = await axios.post('http://localhost:8080/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      setRecognizedText(response.data.text);
      setErrorMessage('');
    } catch (error) {
      console.error('Error uploading image:', error);
      setErrorMessage('Error uploading image.');
    }
  };

  const handleTranslate = async () => {
    if (!recognizedText.length || !targetLanguage) {
      setErrorMessage('Please ensure text is available and target language is selected.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:8080/translate', {
        text: recognizedText.join(' '), // Combine all recognized text
        targetLanguage,
      });

      setTranslatedText(response.data.translatedText);
      setErrorMessage('');
    } catch (error) {
      console.error('Error translating text:', error);
      setErrorMessage('Error translating text.');
    }
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <h1 className="text-3xl font-bold text-center text-gray-700">AWS Textract + Translate Demo</h1>

      {errorMessage && <p className="text-red-500 text-center">{errorMessage}</p>}

      <div className="flex flex-col items-center mt-4">
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="mb-4 p-2 border rounded-lg"
        />
        <button
          onClick={handleFileUpload}
          className="bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600"
        >
          Upload and Process
        </button>
      </div>

      <div className="mt-4">
        {recognizedText.length > 0 ? (
          <div>
            <h2 className="text-lg font-bold">Recognized Text:</h2>
            <ul>
              {recognizedText.map((text, index) => (
                <li key={index} className="py-2 border-b">{text}</li>
              ))}
            </ul>

            <div className="mt-4">
              <select
                value={targetLanguage}
                onChange={(e) => setTargetLanguage(e.target.value)}
                className="p-2 border rounded-lg w-full"
              >
                <option value="">Select Target Language</option>
                <option value="es">Spanish</option>
                <option value="fr">French</option>
                <option value="de">German</option>
                <option value="zh">Chinese</option>
                <option value="hi">Hindi</option>
              </select>
              <button
                onClick={handleTranslate}
                className="bg-green-500 text-white p-2 rounded-lg mt-2 hover:bg-green-600 w-full"
              >
                Translate
              </button>
            </div>
          </div>
        ) : (
          <p className="text-center text-gray-500">No recognized text yet. Upload an image.</p>
        )}
      </div>

      {translatedText && (
        <div className="mt-4">
          <h2 className="text-lg font-bold">Translated Text:</h2>
          <p className="p-2 border rounded-lg bg-gray-100">{translatedText}</p>
        </div>
      )}
    </div>
  );
}

export default App;
