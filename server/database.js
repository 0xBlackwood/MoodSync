const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.join(__dirname, 'mood.db');
const db = new sqlite3.Database(dbPath);

const initializeDB = () => {
  db.serialize(() => {
    db.run(`
      CREATE TABLE IF NOT EXISTS moods (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        mood_value INTEGER NOT NULL,
        mood_label TEXT NOT NULL,
        emoji TEXT NOT NULL,
        note TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);
  });
};

const insertMood = (moodData, callback) => {
  const { mood_value, mood_label, emoji, note } = moodData;
  db.run(
    'INSERT INTO moods (mood_value, mood_label, emoji, note) VALUES (?, ?, ?, ?)',
    [mood_value, mood_label, emoji, note],
    callback
  );
};

const getAllMoods = (callback) => {
  db.all('SELECT * FROM moods ORDER BY created_at DESC', callback);
};

module.exports = {
  db,
  initializeDB,
  insertMood,
  getAllMoods
};