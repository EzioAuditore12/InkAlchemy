const express = require('express');
const multer = require('multer');
const AWS = require('aws-sdk');
const router = express.Router();

// Configure Multer for file uploads
const upload = multer();

AWS.config.update({ region: 'ap-south-1' ,
    credentials: new AWS.Credentials('AKIAXNGUVAKSQOE23HV2', 'oSbwiCPAMR/mNnjBvfuf5PB80gTa6oPIbAYcJn1+'),
},
    
); // Adjust region as needed
const textract = new AWS.Textract();

router.post('/textract', upload.single('image'), async (req, res) => {
  try {
    const imageBytes = req.file.buffer;
    const params = {
      Document: { Bytes: imageBytes },
    };

    const result = await textract.detectDocumentText(params).promise();
    const extractedText = result.Blocks.filter(block => block.BlockType === 'LINE').map(block => block.Text);

    res.json({ text: extractedText });
  } catch (error) {
    console.error('Textract Error:', error);
    res.status(500).json({ error: 'Error processing Textract.' });
  }
});

module.exports = router;
