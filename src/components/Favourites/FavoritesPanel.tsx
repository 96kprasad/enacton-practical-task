'use client';

import { useMemo } from 'react';
import { useFavorites } from '@/hooks/useFavorites';
import { useLaunches } from '@/hooks/useLaunches';
import { Launch } from '@/types/spacex';
import LaunchCard from '../Launch/LaunchCard';

interface FavoritesPanelProps {
  onBack: () => void;
  onLaunchSelect: (launch: Launch) => void;
}

export default function FavoritesPanel({ onBack, onLaunchSelect }: FavoritesPanelProps) {
  const { favorites, clearAllFavorites } = useFavorites();
  const { launches } = useLaunches();
  
  const favoriteLaunches = useMemo(() => {
    if (favorites.length === 0) return [];
    return launches.filter((launch: Launch) => favorites.includes(launch.id));
  }, [favorites, launches]);

  return (
    <div className="bg-white rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <button 
            onClick={onBack}
            className="px-4 py-2 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-50"
          >
            ← Back
          </button>
          <h2 className="text-2xl font-bold">Favorites</h2>
        </div>
        {favorites.length > 0 && (
          <button 
            onClick={clearAllFavorites}
            className="text-blue-600 hover:underline"
          >
            Bulk Remove
          </button>
        )}
      </div>

      {favorites.length === 0 && (
        <div className="text-center py-12">
          <svg className="w-16 h-16 mx-auto mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
          <p className="text-gray-500 text-lg">No favorites yet</p>
          <p className="text-gray-400 text-sm mt-2">Click the heart icon on launches to add them to favorites</p>
        </div>
      )}

      {favoriteLaunches.length > 0 && (
        <div className="grid grid-cols-2 gap-4">
          {favoriteLaunches.map((launch: Launch) => (
            <LaunchCard
              key={launch.id}
              launch={launch}
              onClick={() => onLaunchSelect(launch)}
            />
          ))}
        </div>
      )}
    </div>
  );
}