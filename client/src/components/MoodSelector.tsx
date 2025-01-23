import React, { useState } from 'react';

const moods = [
  { emoji: '😊', label: 'Happy', value: 5 },
  { emoji: '😌', label: 'Content', value: 4 },
  { emoji: '😐', label: 'Neutral', value: 3 },
  { emoji: '😔', label: 'Sad', value: 2 },
  { emoji: '😢', label: 'Very Sad', value: 1 }
];

interface MoodSelectorProps {
  onMoodSelect: (mood: any) => void;
}

const MoodSelector: React.FC<MoodSelectorProps> = ({ onMoodSelect }) => {
  const [selectedMood, setSelectedMood] = useState<number | null>(null);

  const handleSelect = (mood: any) => {
    setSelectedMood(mood.value);
    onMoodSelect(mood);
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">How are you feeling?</h3>
      <div className="grid grid-cols-5 gap-4">
        {moods.map((mood) => (
          <button
            key={mood.value}
            onClick={() => handleSelect(mood)}
            className={`p-4 rounded-lg text-center transition-all ${
              selectedMood === mood.value
                ? 'bg-blue-100 ring-2 ring-blue-500'
                : 'bg-gray-50 hover:bg-gray-100'
            }`}
          >
            <div className="text-3xl mb-2">{mood.emoji}</div>
            <div className="text-sm text-gray-600">{mood.label}</div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default MoodSelector;