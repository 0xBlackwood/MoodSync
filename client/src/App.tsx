import React, { useState } from 'react';
import MoodSelector from './components/MoodSelector';
import MoodHistory from './components/MoodHistory';
import { saveMood, Mood } from './api/moods';

function App() {
  const [selectedMood, setSelectedMood] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<string>('');

  const handleMoodSelect = async (mood: any) => {
    setSelectedMood(mood);
    setIsLoading(true);
    setMessage('');
    
    try {
      const moodData: Mood = {
        mood_value: mood.value,
        mood_label: mood.label,
        emoji: mood.emoji,
      };
      
      await saveMood(moodData);
      setMessage('Mood saved successfully!');
    } catch (error) {
      setMessage('Failed to save mood');
      console.error('Error saving mood:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4">
          <h1 className="text-3xl font-bold text-gray-900">MoodSync</h1>
          <p className="text-gray-600">Track your daily mood patterns</p>
        </div>
      </header>
      
      <main className="max-w-7xl mx-auto py-6 px-4 space-y-6">
        <div className="bg-white rounded-lg shadow p-6">
          <MoodSelector onMoodSelect={handleMoodSelect} />
          
          {isLoading && (
            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
              <p className="text-gray-600">Saving mood...</p>
            </div>
          )}
          
          {message && !isLoading && (
            <div className={`mt-6 p-4 rounded-lg ${
              message.includes('success') 
                ? 'bg-green-50 text-green-800' 
                : 'bg-red-50 text-red-800'
            }`}>
              <p>{message}</p>
            </div>
          )}
          
          {selectedMood && !isLoading && (
            <div className="mt-6 p-4 bg-blue-50 rounded-lg">
              <p className="text-blue-800">
                You're feeling {selectedMood.label} {selectedMood.emoji}
              </p>
            </div>
          )}
        </div>

        <MoodHistory />
      </main>
    </div>
  );
}

export default App;