import React, { useState } from 'react';
import MoodSelector from './components/MoodSelector';

function App() {
  const [selectedMood, setSelectedMood] = useState<any>(null);

  const handleMoodSelect = (mood: any) => {
    setSelectedMood(mood);
    console.log('Selected mood:', mood);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4">
          <h1 className="text-3xl font-bold text-gray-900">MoodSync</h1>
          <p className="text-gray-600">Track your daily mood patterns</p>
        </div>
      </header>
      
      <main className="max-w-7xl mx-auto py-6 px-4">
        <div className="bg-white rounded-lg shadow p-6">
          <MoodSelector onMoodSelect={handleMoodSelect} />
          
          {selectedMood && (
            <div className="mt-6 p-4 bg-blue-50 rounded-lg">
              <p className="text-blue-800">
                You're feeling {selectedMood.label} {selectedMood.emoji}
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default App;