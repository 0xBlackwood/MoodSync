const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'MoodSync API is running' });
});

app.get('/api/moods', (req, res) => {
  res.json({ moods: [] });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});