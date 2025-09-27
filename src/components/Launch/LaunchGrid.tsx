'use client';
import { useState, useEffect, useRef, useMemo } from 'react';
import { useLaunches } from '@/hooks/useLaunches';
import { useFavorites } from '@/hooks/useFavorites';
import { Launch } from '@/types/spacex';
import LaunchCard from '../Launch/LaunchCard';
import SearchFilters from '../SearchFilter/page';
import { LaunchGridProps } from '@/types/spacex';
import { FavoriteIcon } from '../../../utils/svgConstants';

const ITEMS_PER_PAGE = 18;
const LOAD_MORE_DELAY = 1000;

export default function LaunchGrid({ onLaunchSelect, onShowFavorites }: LaunchGridProps) {
  const { launches, loading, error } = useLaunches();
  const { favorites } = useFavorites();
  const [showFilters, setShowFilters] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({ success: '', upcoming: '', year: '', sortBy: 'date_utc' });
  const [displayCount, setDisplayCount] = useState(ITEMS_PER_PAGE);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const filteredLaunches = useMemo(() => {
    if (!launches?.length) return [];

    let result = launches;

    // Apply search filter
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      result = result.filter((launch: Launch) => launch.name.toLowerCase().includes(searchLower));
    }
    // Apply success filter
    if (filters.success) {
      const successValue = filters.success === 'true';
      result = result.filter((launch: Launch) => launch.success === successValue);
    }
    // Apply upcoming filter
    if (filters.upcoming) {
      const upcomingValue = filters.upcoming === 'true';
      result = result.filter((launch: Launch) => launch.upcoming === upcomingValue);
    }
    // Apply sorting
    if (filters.sortBy === 'name') {
      result.sort((a: Launch, b: Launch) => a.name.localeCompare(b.name));
    } else {
      result.sort((a: Launch, b: Launch) => new Date(b.date_utc).getTime() - new Date(a.date_utc).getTime());
    }

    return result;
  }, [launches, searchTerm, filters]);
  const observerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && displayCount < filteredLaunches.length && !loading && !isLoadingMore) {
          setIsLoadingMore(true);
          setTimeout(() => {
            setDisplayCount(prev => prev + ITEMS_PER_PAGE);
            setIsLoadingMore(false);
          }, LOAD_MORE_DELAY);
        }
      },
      { threshold: 0.1 }
    );

    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    return () => observer.disconnect();
  }, [displayCount, filteredLaunches.length, loading, isLoadingMore]);

  // Reset display count when filters change
  useEffect(() => {
    setDisplayCount(ITEMS_PER_PAGE);
  }, [searchTerm, filters]);

  return (
    <div className="bg-white rounded-lg p-6 h-full overflow-y-auto scrollbar-hide">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">SpaceX</h1>
        <button
          key={favorites.length}
          onClick={onShowFavorites}
          className="flex items-center gap-2 text-gray-600 hover:text-blue-600"
        >
          <FavoriteIcon className="w-5 h-5" />
          Favorites ({favorites.length})
        </button>
      </div>

      <SearchFilters
        showFilters={showFilters}
        onToggleFilters={() => setShowFilters(!showFilters)}
        onSearchChange={setSearchTerm}
        onFiltersChange={setFilters}
      />

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
          <p className="text-red-600">{error}</p>
        </div>
      )}

      <div className="grid grid-cols-3 gap-4 mb-6">
        {filteredLaunches.length > 0 ? (
          filteredLaunches.slice(0, displayCount).map((launch: Launch) => (
            <LaunchCard
              key={launch.id}
              launch={launch}
              onClick={() => onLaunchSelect(launch)}
            />
          ))
        ) : (
          <div className="col-span-3 text-center py-8 text-gray-500">No launches found</div>
        )}
      </div>

      {isLoadingMore && (
        <div className="flex justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <span className="ml-2 text-gray-600">Loading more launches...</span>
        </div>
      )}

      {!isLoadingMore && displayCount < filteredLaunches.length && (
        <div className="text-center py-4">
          <p className="text-gray-500">Scroll down to load more launches...</p>
        </div>
      )}

      <div ref={observerRef} className="h-4" />
    </div>
  );
}