/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Gamepad2, X, Maximize2, RotateCcw, ChevronLeft } from 'lucide-react';
import gamesData from './data/games.json';

export default function App() {
  const [selectedGame, setSelectedGame] = useState(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [key, setKey] = useState(0);

  const handleBack = () => {
    setSelectedGame(null);
    setIsFullscreen(false);
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  const handleReload = () => {
    setKey(prev => prev + 1);
  };

  const filteredGames = gamesData.filter(game => 
    game.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    game.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex h-screen w-full flex-col overflow-hidden bg-slate-950 text-slate-100 font-sans select-none">
      {/* Navbar */}
      <nav className="flex h-16 shrink-0 items-center justify-between border-b border-slate-800 bg-slate-900/50 px-6 backdrop-blur-md">
        <div className="flex items-center gap-8">
          <div 
            className="flex cursor-pointer flex-col" 
            onClick={handleBack}
          >
            <span className="text-2xl font-black leading-none tracking-tighter text-indigo-500">UNBLCKD</span>
            <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-slate-500">Portal 2.0</span>
          </div>
          <div className="mx-2 h-8 w-px bg-slate-800"></div>
          <div className="hidden gap-6 text-[11px] font-bold uppercase tracking-wider text-slate-400 sm:flex">
            <span className="cursor-pointer border-b-2 border-indigo-500 py-5 text-white transition-colors">Directory</span>
            <span className="cursor-pointer py-5 transition-colors hover:text-white">Action</span>
            <span className="cursor-pointer py-5 transition-colors hover:text-white">Retro</span>
            <span className="cursor-pointer py-5 transition-colors hover:text-white">Sandbox</span>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="group flex w-64 items-center gap-3 rounded-lg border border-slate-700 bg-slate-800 px-4 py-2 focus-within:border-indigo-500 transition-colors">
            <div className="h-3 w-3 rounded-full border-2 border-slate-500 group-focus-within:border-indigo-500 transition-colors"></div>
            <input
              type="text"
              placeholder="Search games..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-transparent text-xs font-medium text-slate-100 outline-none placeholder:text-slate-500 w-full"
            />
          </div>
          <div className="h-10 w-10 rounded-full border-2 border-white/10 bg-gradient-to-tr from-indigo-600 to-purple-600"></div>
        </div>
      </nav>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside className="hidden w-64 shrink-0 flex-col border-r border-slate-800 bg-slate-950/80 p-6 lg:flex">
          <h2 className="mb-6 text-[10px] font-black uppercase tracking-[0.25em] text-slate-500">Trending Now</h2>
          <div className="flex-1 space-y-5 overflow-y-auto">
            {gamesData.slice(0, 4).map((game, i) => (
              <div 
                key={game.id} 
                className="group flex cursor-pointer items-center gap-4"
                onClick={() => setSelectedGame(game)}
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-slate-800 font-black text-slate-400 transition-all group-hover:bg-indigo-600 group-hover:text-white">
                  0{i + 1}
                </div>
                <div className="overflow-hidden">
                  <div className="truncate text-sm font-bold group-hover:text-indigo-400 transition-colors">{game.title}</div>
                  <div className="flex items-center gap-1 text-[10px] text-slate-500 uppercase tracking-tight">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500"></span> 
                    {game.category}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-auto rounded-xl border border-slate-800 bg-slate-900 p-4 shadow-2xl">
            <div className="mb-2 text-[10px] font-black uppercase tracking-widest text-indigo-400">Database Status</div>
            <div className="flex items-end justify-between">
              <span className="text-2xl font-light tracking-tighter">
                {gamesData.length}<span className="text-xs text-slate-500">/GAMES</span>
              </span>
              <span className="mb-1 text-[10px] font-bold text-emerald-500 uppercase tracking-widest">Online</span>
            </div>
            <div className="mt-3 h-1 w-full overflow-hidden rounded-full bg-slate-800">
              <div className="h-full w-3/4 bg-indigo-500 transition-all"></div>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="relative flex-1 overflow-y-auto bg-slate-900/30 p-6">
          <AnimatePresence mode="wait">
            {!selectedGame ? (
              <motion.div
                key="grid"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="grid gap-5 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4"
              >
                {filteredGames.map((game) => (
                  <motion.div
                    key={game.id}
                    layoutId={`game-${game.id}`}
                    onClick={() => setSelectedGame(game)}
                    className="group flex cursor-pointer flex-col overflow-hidden rounded-2xl border border-slate-700 bg-slate-800 transition-all hover:border-indigo-500 hover:ring-4 hover:ring-indigo-500/20"
                  >
                    <div className="relative h-32 overflow-hidden bg-slate-700">
                      <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/20 to-purple-500/20"></div>
                      <img
                        src={game.thumbnail}
                        alt={game.title}
                        className="h-full w-full object-cover opacity-60 transition-transform duration-500 group-hover:scale-110"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 flex items-center justify-center text-2xl font-black tracking-tighter text-slate-100 opacity-20 group-hover:opacity-40 transition-opacity uppercase">
                        {game.id.slice(0, 8)}
                      </div>
                      <div className="absolute right-3 top-3 rounded bg-black/60 px-2 py-1 text-[9px] font-black tracking-widest backdrop-blur-md">
                        PRO
                      </div>
                    </div>
                    <div className="p-4">
                      <div className="text-sm font-black text-slate-100">{game.title}</div>
                      <div className="mt-1 text-[10px] font-bold uppercase tracking-tight text-slate-500">
                        {game.category} • 4.9 ★
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <motion.div
                key="player"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                className="flex h-full flex-col"
              >
                <div className="mb-4 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <button
                      onClick={handleBack}
                      className="flex items-center gap-2 rounded-lg border border-slate-700 bg-slate-800 px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider text-slate-300 transition-colors hover:text-white"
                    >
                      <ChevronLeft size={14} />
                      Exit Game
                    </button>
                    <h2 className="text-sm font-black uppercase tracking-widest text-indigo-400">
                      Playing: {selectedGame.title}
                    </h2>
                  </div>
                  <div className="flex gap-2">
                    <button 
                      onClick={handleReload}
                      className="rounded-lg border border-slate-700 bg-slate-800 p-2 text-slate-400 hover:text-white transition-colors"
                    >
                      <RotateCcw size={16} />
                    </button>
                    <button 
                      onClick={toggleFullscreen}
                      className="rounded-lg border border-slate-700 bg-slate-800 p-2 text-slate-400 hover:text-white transition-colors"
                    >
                      <Maximize2 size={16} />
                    </button>
                  </div>
                </div>

                <div 
                  className={`relative flex-1 overflow-hidden rounded-3xl border border-slate-800 bg-black shadow-2xl transition-all duration-300 ${
                    isFullscreen ? 'fixed inset-0 z-[100] rounded-none' : ''
                  }`}
                >
                  {isFullscreen && (
                    <button
                      onClick={toggleFullscreen}
                      className="absolute right-6 top-6 z-[110] flex h-10 w-10 items-center justify-center rounded-full bg-slate-900 border border-slate-800 text-white shadow-xl hover:bg-slate-800"
                    >
                      <X size={20} />
                    </button>
                  )}
                  <iframe
                    key={key}
                    src={selectedGame.url}
                    className="h-full w-full border-none"
                    title={selectedGame.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </main>
      </div>

      {/* Footer Status Bar */}
      <footer className="flex h-10 shrink-0 items-center justify-between border-t border-slate-800 bg-slate-950 px-6 text-[10px] font-medium uppercase tracking-widest text-slate-600">
        <div className="flex items-center gap-2">
          Proxy Connection: <span className="text-emerald-600 font-bold">Secure</span> 
          <span className="mx-2 text-slate-800">•</span>
          Latency: <span className="text-indigo-400">14ms</span>
        </div>
        <div className="flex items-center gap-4">
          <span>Version 2.4.0-Stable</span>
          <span className="text-slate-800">•</span>
          <span>All Assets Local</span>
        </div>
      </footer>
    </div>
  );
}
