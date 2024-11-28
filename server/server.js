const express = require('express');
const multer = require('multer');
const AWS = require('aws-sdk');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

// Initialize AWS Textract and Translate clients
const textract = new AWS.Textract({ region: 'ap-south-1'
    , credentials: new AWS.Credentials('AKIAXNGUVAKSQOE23HV2', 'oSbwiCPAMR/mNnjBvfuf5PB80gTa6oPIbAYcJn1+'), // Use your desired region
 },
    
);
const translate = new AWS.Translate({ region: 'ap-south-1' ,
    credentials: new AWS.Credentials('AKIAXNGUVAKSQOE23HV2', 'oSbwiCPAMR/mNnjBvfuf5PB80gTa6oPIbAYcJn1+'), // Use your desired region
});

const app = express();
app.use(cors()); // Enable CORS for all routes
app.use(express.json()); // For parsing JSON in requests

// Setup Multer for file uploads
const upload = multer({ dest: 'uploads/' });

// Textract endpoint
app.post('/upload', upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).send('No file uploaded.');
  }

  const filePath = path.join(__dirname, req.file.path);
  const fileBuffer = fs.readFileSync(filePath);

  const params = {
    Document: {
      Bytes: fileBuffer,
    },
  };

  textract.detectDocumentText(params, (err, data) => {
    if (err) {
      console.error('Error processing document:', err);
      return res.status(500).send('Error processing document.');
    }

    const textBlocks = data.Blocks.filter(block => block.BlockType === 'LINE').map(block => block.Text);

    res.json({ text: textBlocks });
    fs.unlinkSync(filePath); // Clean up the uploaded file
  });
});

// Translate endpoint
app.post('/translate', (req, res) => {
  const { text, targetLanguage } = req.body;

  if (!text || !targetLanguage) {
    return res.status(400).send('Text and target language are required.');
  }

  const params = {
    Text: text,
    SourceLanguageCode: 'auto', // Detect the source language automatically
    TargetLanguageCode: targetLanguage, // e.g., 'es' for Spanish, 'fr' for French
  };

  translate.translateText(params, (err, data) => {
    if (err) {
      console.error('Error translating text:', err);
      return res.status(500).send('Error translating text.');
    }

    res.json({ translatedText: data.TranslatedText });
  });
});

// Start the server
app.listen(8080, () => {
  console.log('Server is running on port 8080');
});
