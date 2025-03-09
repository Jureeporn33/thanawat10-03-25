import React, { useState } from 'react';
import { Heart, Star, X } from 'lucide-react';
import { Anime } from '../types';
import { currentUser } from '../data';
import { motion, AnimatePresence } from 'framer-motion';

interface Props {
  anime: Anime;
}

export function AnimeCard({ anime }: Props) {
  const [showDetails, setShowDetails] = useState(false);
  const isFavorite = currentUser.favoriteAnime.includes(anime.id);

  return (
    <>
      <div 
        className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-105 cursor-pointer"
        onClick={() => setShowDetails(true)}
      >
        <img 
          src={anime.imageUrl} 
          alt={anime.title} 
          className="w-full h-48 object-cover"
        />
        <div className="p-4">
          <div className="flex justify-between items-start">
            <h3 className="text-lg font-semibold">{anime.title}</h3>
            <Heart 
              className={`w-6 h-6 ${isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-400'}`}
            />
          </div>
          <div className="mt-2 flex flex-wrap gap-1">
            {anime.mood.slice(0, 3).map((m) => (
              <span 
                key={m} 
                className="text-xs px-2 py-1 bg-indigo-100 text-indigo-800 rounded-full"
              >
                {m}
              </span>
            ))}
          </div>
          <p className="mt-2 text-sm text-gray-600 line-clamp-2">{anime.description}</p>
        </div>
      </div>

      <AnimatePresence>
        {showDetails && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
            onClick={() => setShowDetails(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-lg shadow-xl max-w-2xl w-full overflow-hidden"
              onClick={e => e.stopPropagation()}
            >
              <div className="relative">
                <img 
                  src={anime.imageUrl} 
                  alt={anime.title} 
                  className="w-full h-64 object-cover"
                />
                <button
                  onClick={() => setShowDetails(false)}
                  className="absolute top-2 right-2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70 transition-colors"
                >
                  <X size={20} />
                </button>
              </div>
              
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <h2 className="text-2xl font-bold">{anime.title}</h2>
                  <div className="flex items-center gap-1">
                    <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    <span className="font-semibold">{anime.rating}</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <h3 className="text-sm font-semibold text-gray-500">Director</h3>
                    <p>{anime.director}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-gray-500">Studio</h3>
                    <p>{anime.studio}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-gray-500">Release Year</h3>
                    <p>{anime.releaseYear}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-gray-500">Genres</h3>
                    <p>{anime.genre.join(", ")}</p>
                  </div>
                </div>

                <div className="mb-4">
                  <h3 className="text-sm font-semibold text-gray-500 mb-2">Moods</h3>
                  <div className="flex flex-wrap gap-2">
                    {anime.mood.map((m) => (
                      <span 
                        key={m}
                        className="text-sm px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full"
                      >
                        {m}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-semibold text-gray-500 mb-2">Description</h3>
                  <p className="text-gray-700">{anime.description}</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}