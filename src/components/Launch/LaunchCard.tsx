'use client';

import { Launch } from '@/types/spacex';
import { useFavorites } from '@/hooks/useFavorites';

interface LaunchCardProps {
  launch: Launch;
  onClick: () => void;
}

export default function LaunchCard({ launch, onClick }: LaunchCardProps) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const isFav = isFavorite(launch.id);
  const missionNumber = launch.flight_number || 'N/A';

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleFavorite(launch.id);
  };

  const getStatusColor = () => {
    if (launch.upcoming) return 'bg-blue-500';
    if (launch.success === true) return 'bg-green-500';
    if (launch.success === false) return 'bg-red-500';
    return 'bg-gray-500';
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  return (
    <div 
      className="bg-slate-600 rounded-lg aspect-[4/3] relative overflow-hidden cursor-pointer hover:scale-105 transition-transform"
      onClick={onClick}
    >
      {launch.links.patch.small && (
        <img 
          src={launch.links.patch.small} 
          alt={launch.name}
          className="absolute inset-0 w-full h-full object-cover"
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
      
      <button
        onClick={handleFavoriteClick}
        className="absolute top-2 right-2 p-2 rounded-full bg-black/50 hover:bg-black/70 transition-colors"
      >
        <svg 
          className={`w-5 h-5 ${isFav ? 'text-red-500 fill-current' : 'text-white'}`} 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      </button>
      
      <div className="absolute bottom-4 left-4 text-white">
        <h3 className="font-semibold text-lg mb-2">{launch.name}</h3>
        <div className="space-y-1 text-sm">
          <div className="flex items-center gap-2">
            <span className={`w-2 h-2 rounded-full ${getStatusColor()}`}></span>
            <span>{launch.upcoming ? 'Upcoming' : launch.success ? 'Success' : 'Failed'}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-lg">🇺🇸</span>
            <span>{formatDate(launch.date_utc)}</span>
          </div>
          <div className="text-xs text-gray-300">
            Mission #{missionNumber}
          </div>
        </div>
      </div>
    </div>
  );
}