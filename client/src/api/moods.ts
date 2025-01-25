const API_BASE = 'http://localhost:3001/api';

export interface Mood {
  id?: number;
  mood_value: number;
  mood_label: string;
  emoji: string;
  note?: string;
  created_at?: string;
}

export const saveMood = async (moodData: Mood): Promise<any> => {
  const response = await fetch(`${API_BASE}/moods`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(moodData),
  });
  
  if (!response.ok) {
    throw new Error('Failed to save mood');
  }
  
  return response.json();
};

export const fetchMoods = async (): Promise<Mood[]> => {
  const response = await fetch(`${API_BASE}/moods`);
  
  if (!response.ok) {
    throw new Error('Failed to fetch moods');
  }
  
  const data = await response.json();
  return data.moods;
};