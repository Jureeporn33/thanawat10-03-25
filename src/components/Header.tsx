import React, { useState } from 'react';
import { Menu as MenuIcon, User, History, Heart, Settings, LogOut } from 'lucide-react';
import { currentUser, animeData } from '../data';
import { motion, AnimatePresence } from 'framer-motion';

export function Header() {
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);

  const toggleUserMenu = () => setShowUserMenu(!showUserMenu);
  const closeUserMenu = () => setShowUserMenu(false);

  const handleProfileClick = () => {
    setShowProfileModal(true);
    closeUserMenu();
  };

  return (
    <header className="bg-indigo-600 text-white py-4 px-6 shadow-lg">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <MenuIcon className="h-6 w-6" />
          <h1 className="text-2xl font-bold">AnimeMatch</h1>
        </div>
        
        <div className="relative">
          <button
            onClick={toggleUserMenu}
            className="flex items-center space-x-2 focus:outline-none"
          >
            <span className="text-sm">{currentUser.name}</span>
            <img 
              src={currentUser.avatar} 
              alt="Profile" 
              className="w-8 h-8 rounded-full border-2 border-white"
            />
          </button>

          <AnimatePresence>
            {showUserMenu && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-50"
              >
                <button
                  onClick={handleProfileClick}
                  className="w-full px-4 py-2 text-gray-700 hover:bg-indigo-50 flex items-center gap-2"
                >
                  <User size={16} />
                  <span>Profile</span>
                </button>
                <button
                  onClick={handleProfileClick}
                  className="w-full px-4 py-2 text-gray-700 hover:bg-indigo-50 flex items-center gap-2"
                >
                  <History size={16} />
                  <span>Watch History</span>
                </button>
                <button
                  onClick={handleProfileClick}
                  className="w-full px-4 py-2 text-gray-700 hover:bg-indigo-50 flex items-center gap-2"
                >
                  <Heart size={16} />
                  <span>Favorites</span>
                </button>
                <button
                  onClick={handleProfileClick}
                  className="w-full px-4 py-2 text-gray-700 hover:bg-indigo-50 flex items-center gap-2"
                >
                  <Settings size={16} />
                  <span>Settings</span>
                </button>
                <hr className="my-2" />
                <button
                  onClick={closeUserMenu}
                  className="w-full px-4 py-2 text-red-600 hover:bg-red-50 flex items-center gap-2"
                >
                  <LogOut size={16} />
                  <span>Logout</span>
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {showProfileModal && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
                onClick={() => setShowProfileModal(false)}
              >
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.9, opacity: 0 }}
                  className="bg-white rounded-lg shadow-xl max-w-2xl w-full text-gray-800"
                  onClick={e => e.stopPropagation()}
                >
                  <div className="p-6">
                    <div className="flex items-center gap-4 mb-6">
                      <img
                        src={currentUser.avatar}
                        alt="Profile"
                        className="w-20 h-20 rounded-full border-4 border-indigo-100"
                      />
                      <div>
                        <h2 className="text-2xl font-bold">{currentUser.name}</h2>
                        <p className="text-gray-500">{currentUser.email}</p>
                        <p className="text-sm text-gray-400">Joined {new Date(currentUser.joinDate).toLocaleDateString()}</p>
                      </div>
                    </div>

                    <div className="mb-8">
                      <h3 className="text-lg font-semibold mb-4">Watch History</h3>
                      <div className="space-y-4">
                        {currentUser.watchHistory.map(history => {
                          const anime = animeData.find(a => a.id === history.animeId);
                          if (!anime) return null;
                          
                          return (
                            <div key={`${history.animeId}-${history.timestamp}`} className="flex items-center gap-4">
                              <img
                                src={anime.imageUrl}
                                alt={anime.title}
                                className="w-16 h-16 object-cover rounded"
                              />
                              <div className="flex-1">
                                <h4 className="font-medium">{anime.title}</h4>
                                <p className="text-sm text-gray-500">
                                  {new Date(history.timestamp).toLocaleDateString()} • 
                                  {history.completed ? 'Completed' : 'In Progress'}
                                </p>
                              </div>
                              {history.rating && (
                                <div className="flex items-center gap-1 text-yellow-500">
                                  <span>★</span>
                                  <span>{history.rating}</span>
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold mb-4">Favorite Anime</h3>
                      <div className="grid grid-cols-2 gap-4">
                        {currentUser.favoriteAnime.map(id => {
                          const anime = animeData.find(a => a.id === id);
                          if (!anime) return null;

                          return (
                            <div key={id} className="flex items-center gap-3">
                              <img
                                src={anime.imageUrl}
                                alt={anime.title}
                                className="w-12 h-12 object-cover rounded"
                              />
                              <div>
                                <h4 className="font-medium">{anime.title}</h4>
                                <p className="text-sm text-gray-500">{anime.genre.join(', ')}</p>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  );
}