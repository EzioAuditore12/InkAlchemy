const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const textractRoutes = require('./textract');
const translateRoutes = require('./translate');
const sentimentRoutes = require('./sentiment');

const app = express();
const PORT = 8080;

// Enable CORS for all origins (or configure specific origins)
app.use(cors({
  origin: 'http://localhost:5173', // Frontend URL
  methods: ['GET', 'POST'],       // Allowed methods
  credentials: true,             // Allow cookies if needed
}));

app.use(bodyParser.json());

// API Routes
app.use('/api', textractRoutes);
app.use('/api', translateRoutes);
app.use('/api', sentimentRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
