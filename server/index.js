const express = require('express');
const cors = require('cors');
const { initializeDB, insertMood, getAllMoods } = require('./database');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

initializeDB();

app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'MoodSync API is running' });
});

app.get('/api/moods', (req, res) => {
  getAllMoods((err, moods) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to fetch moods' });
    }
    res.json({ moods });
  });
});

app.post('/api/moods', (req, res) => {
  const { mood_value, mood_label, emoji, note } = req.body;
  
  if (!mood_value || !mood_label || !emoji) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  insertMood({ mood_value, mood_label, emoji, note }, function(err) {
    if (err) {
      return res.status(500).json({ error: 'Failed to save mood' });
    }
    res.json({ success: true, id: this.lastID });
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});