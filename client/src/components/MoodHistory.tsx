import React, { useEffect, useState } from 'react';
import { fetchMoods, Mood } from '../api/moods';

const MoodHistory: React.FC = () => {
  const [moods, setMoods] = useState<Mood[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    loadMoods();
  }, []);

  const loadMoods = async () => {
    try {
      const moodData = await fetchMoods();
      setMoods(moodData);
    } catch (err) {
      setError('Failed to load mood history');
      console.error('Error loading moods:', err);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Mood History</h2>
        <p className="text-gray-500">Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Mood History</h2>
        <p className="text-red-600">{error}</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-semibold mb-4">Mood History</h2>
      
      {moods.length === 0 ? (
        <p className="text-gray-500">No mood entries yet. Start tracking your mood!</p>
      ) : (
        <div className="space-y-3">
          {moods.map((mood) => (
            <div key={mood.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <span className="text-2xl">{mood.emoji}</span>
                <div>
                  <p className="font-medium">{mood.mood_label}</p>
                  <p className="text-sm text-gray-500">
                    {mood.created_at && formatDate(mood.created_at)}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <div className="w-12 h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-blue-500 transition-all"
                    style={{ width: `${(mood.mood_value / 5) * 100}%` }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MoodHistory;