import React, { useState } from 'react';
import NoteInput from './NoteInput';

const moods = [
  { emoji: '😊', label: 'Happy', value: 5 },
  { emoji: '😌', label: 'Content', value: 4 },
  { emoji: '😐', label: 'Neutral', value: 3 },
  { emoji: '😔', label: 'Sad', value: 2 },
  { emoji: '😢', label: 'Very Sad', value: 1 }
];

interface MoodSelectorProps {
  onMoodSelect: (mood: any, note: string) => void;
}

const MoodSelector: React.FC<MoodSelectorProps> = ({ onMoodSelect }) => {
  const [selectedMood, setSelectedMood] = useState<any>(null);
  const [note, setNote] = useState<string>('');

  const handleSelect = (mood: any) => {
    setSelectedMood(mood);
  };

  const handleNoteChange = (noteText: string) => {
    setNote(noteText);
  };

  const handleSave = () => {
    if (selectedMood) {
      onMoodSelect(selectedMood, note);
      // Reset after saving
      setSelectedMood(null);
      setNote('');
    }
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">How are you feeling?</h3>
      <div className="grid grid-cols-3 sm:grid-cols-5 gap-3 sm:gap-4">
        {moods.map((mood) => (
          <button
            key={mood.value}
            onClick={() => handleSelect(mood)}
            className={`p-3 sm:p-4 rounded-lg text-center transition-all ${
              selectedMood?.value === mood.value
                ? 'bg-blue-100 ring-2 ring-blue-500'
                : 'bg-gray-50 hover:bg-gray-100'
            }`}
          >
            <div className="text-2xl sm:text-3xl mb-1 sm:mb-2">{mood.emoji}</div>
            <div className="text-xs sm:text-sm text-gray-600">{mood.label}</div>
          </button>
        ))}
      </div>
      
      {selectedMood && (
        <div className="space-y-4">
          <NoteInput onNoteChange={handleNoteChange} />
          <button
            onClick={handleSave}
            className="w-full bg-blue-500 text-white py-3 px-4 rounded-lg 
                       hover:bg-blue-600 transition-colors font-medium"
          >
            Save Mood Entry
          </button>
        </div>
      )}
    </div>
  );
};

export default MoodSelector;