const express = require('express');
const multer = require('multer');
const AWS = require('aws-sdk');
const fs = require('fs');

// Initialize AWS Textract
const textract = new AWS.Textract({
    region: 'ap-south-1',  // Ensure this matches the region where your Textract service is available
    credentials: new AWS.Credentials('AKIAXNGUVAKSQOE23HV2', 'oSbwiCPAMR/mNnjBvfuf5PB80gTa6oPIbAYcJn1+'), // Replace with your AWS credentials
});

const app = express();
const port = 8080;

// Configure multer for file upload
const upload = multer({ dest: 'uploads/' });

app.post('/upload', upload.single('image'), (req, res) => {
    const filePath = req.file.path;

    // Read the file as a buffer
    const fileBytes = fs.readFileSync(filePath);

    // Call AWS Textract to detect text in the document
    textract.detectDocumentText({ Document: { Bytes: fileBytes } }, (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Failed to process the document.' });
        }

        // Extract text from Textract response
        const extractedText = data.Blocks.filter(block => block.BlockType === 'LINE').map(block => block.Text);
        console.log(extractedText);

        // Clean up the uploaded file
        fs.unlinkSync(filePath);

        // Send the extracted text as a response
        res.json({ text: extractedText });
    });
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
