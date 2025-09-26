'use client';

import LaunchGrid from '@/components/Launch/LaunchGrid';
import LaunchDetail from '@/components/Launch/LaunchDetail';
import FavoritesPanel from '@/components/Favourites/FavoritesPanel';
import ErrorMessage from '@/components/ErrorMessage/page';
import { useState } from 'react';
import { Launch } from '@/types/spacex';

export default function Home() {
  const [selectedLaunch, setSelectedLaunch] = useState<Launch | null>(null);
  const [showError, setShowError] = useState(false);
  const [showFavorites, setShowFavorites] = useState(false);

  return (
    <div className="h-screen bg-gray-50 p-6 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-8 h-screen overflow-hidden">
            {showFavorites ? (
              <FavoritesPanel 
                onBack={() => setShowFavorites(false)}
                onLaunchSelect={setSelectedLaunch}
              />
            ) : (
              <LaunchGrid 
                onLaunchSelect={setSelectedLaunch}
                onShowFavorites={() => setShowFavorites(true)}
              />
            )}
          </div>
          <div className="lg:col-span-4 space-y-6 pt-8 pb-8 h-screen overflow-y-auto scrollbar-hide">
            <LaunchDetail selectedLaunch={selectedLaunch} />
            {showError && <ErrorMessage />}
          </div>
        </div>
      </div>
    </div>
  );
}