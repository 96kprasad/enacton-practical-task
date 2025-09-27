'use client';

import { useFavorites } from '@/hooks/useFavorites';
import { formatDate, getStatusDotColor } from '../../../utils/spaceXUtils';
import { LaunchCardProps } from '@/types/spacex';
import { HeartIconCard } from '../../../utils/svgConstants';


export default function LaunchCard({ launch, onClick }: LaunchCardProps) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const isFav = isFavorite(launch.id);
  const missionNumber = launch.flight_number || 'N/A';

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleFavorite(launch.id);
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
        <HeartIconCard className={`w-5 h-5 ${isFav ? 'text-red-500 fill-current' : 'text-white'}`} />
      </button>
      
      <div className="absolute bottom-4 left-4 text-white">
        <h3 className="font-semibold text-lg mb-2">{launch.name}</h3>
        <div className="space-y-1 text-sm">
          <div className="flex items-center gap-2">
            <span className={`w-2 h-2 rounded-full ${getStatusDotColor(launch.upcoming, launch.success)}`}></span>
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