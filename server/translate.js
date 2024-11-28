const express = require('express');
const AWS = require('aws-sdk');
const router = express.Router();

AWS.config.update({ region: 'ap-south-1' ,
    credentials: new AWS.Credentials('AKIAXNGUVAKSQOE23HV2', 'oSbwiCPAMR/mNnjBvfuf5PB80gTa6oPIbAYcJn1+'),
}); // Adjust region as needed
const translate = new AWS.Translate();

router.post('/translate', async (req, res) => {
  const { text, targetLanguage } = req.body;
  try {
    const params = {
      Text: text,
      SourceLanguageCode: 'auto',
      TargetLanguageCode: targetLanguage,
    };

    const result = await translate.translateText(params).promise();
    res.json({ translatedText: result.TranslatedText });
  } catch (error) {
    console.error('Translate Error:', error);
    res.status(500).json({ error: 'Error processing translation.' });
  }
});

module.exports = router;
