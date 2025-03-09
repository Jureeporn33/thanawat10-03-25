import React from 'react';
import { moods } from '../data';

interface Props {
  selectedMood: string;
  onMoodSelect: (mood: string) => void;
}

export function MoodSelector({ selectedMood, onMoodSelect }: Props) {
  return (
    <div className="py-6">
      <h2 className="text-xl font-semibold mb-4">How are you feeling today?</h2>
      <div className="flex flex-wrap gap-2">
        {moods.map((mood) => (
          <button
            key={mood}
            onClick={() => onMoodSelect(mood)}
            className={`px-4 py-2 rounded-full transition-colors ${
              selectedMood === mood
                ? 'bg-indigo-600 text-white'
                : 'bg-gray-100 hover:bg-gray-200'
            }`}
          >
            {mood}
          </button>
        ))}
      </div>
    </div>
  );
}