const express = require('express');
const AWS = require('aws-sdk');
const router = express.Router();

AWS.config.update({ region: 'ap-south-1' ,
    credentials: new AWS.Credentials('AKIAXNGUVAKSQOE23HV2', 'oSbwiCPAMR/mNnjBvfuf5PB80gTa6oPIbAYcJn1+'),
}); // Adjust region as needed
const comprehend = new AWS.Comprehend();

router.post('/sentiment', async (req, res) => {
  const { text } = req.body;
  try {
    const params = {
      Text: text,
      LanguageCode: 'en', // Adjust as per your use case
    };

    const result = await comprehend.detectSentiment(params).promise();
    res.json({ sentiment: result.Sentiment, sentimentScore: result.SentimentScore });
  } catch (error) {
    console.error('Sentiment Analysis Error:', error);
    res.status(500).json({ error: 'Error processing sentiment analysis.' });
  }
});

module.exports = router;
