import React, { useState } from 'react';
import { Header } from './components/Header';
import { MoodSelector } from './components/MoodSelector';
import { AnimeCard } from './components/AnimeCard';
import { ChatBot } from './components/ChatBot';
import { animeData } from './data';

function App() {
  const [selectedMood, setSelectedMood] = useState('');

  const filteredAnime = selectedMood
    ? animeData.filter((anime) => anime.mood.includes(selectedMood))
    : animeData;

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 py-8">
        <MoodSelector 
          selectedMood={selectedMood} 
          onMoodSelect={setSelectedMood} 
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAnime.map((anime) => (
            <AnimeCard key={anime.id} anime={anime} />
          ))}
        </div>
      </main>

      <ChatBot />
    </div>
  );
}

export default App;