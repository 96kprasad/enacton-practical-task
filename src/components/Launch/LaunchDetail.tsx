'use client';

import { Launch } from '@/types/spacex';
import { useFavorites } from '@/hooks/useFavorites';
import Button from '../Button/page';

interface LaunchDetailProps {
  selectedLaunch: Launch | null;
}

export default function LaunchDetail({ selectedLaunch }: LaunchDetailProps) {
  const { isFavorite, toggleFavorite } = useFavorites();

  if (!selectedLaunch) {
    return (
      <div className="bg-white rounded-lg p-6">
        <div className="text-center text-gray-500">
          <svg className="w-16 h-16 mx-auto mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p>Select a launch to view details</p>
        </div>
      </div>
    );
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const getStatusText = () => {
    if (selectedLaunch.upcoming) return 'Upcoming';
    if (selectedLaunch.success === true) return 'Success';
    if (selectedLaunch.success === false) return 'Failed';
    return 'Unknown';
  };

  const getStatusColor = () => {
    if (selectedLaunch.upcoming) return 'text-blue-600 bg-blue-100';
    if (selectedLaunch.success === true) return 'text-green-600 bg-green-100';
    if (selectedLaunch.success === false) return 'text-red-600 bg-red-100';
    return 'text-gray-600 bg-gray-100';
  };

  return (
    <div className="bg-white rounded-lg p-6">

      <div className="aspect-square bg-slate-600 rounded-lg mb-4 relative overflow-hidden">
        {selectedLaunch.links.patch.large ? (
          <img
            src={selectedLaunch.links.patch.large}
            alt={selectedLaunch.name}
            width={300}
            height={300}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="flex items-center justify-center h-full text-white">
            <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </div>
        )}
      </div>

      <h2 className="text-2xl font-bold mb-3">{selectedLaunch.name}</h2>

      <div className="space-y-3 mb-6">
        <div>
          <span className="text-gray-600">Launch Date: </span>
          <span className="font-medium">{formatDate(selectedLaunch.date_utc)}</span>
        </div>

        <div>
          <span className="text-gray-600">Rocket: </span>
          <span className="font-medium">Falcon 9</span>
        </div>

        <div>
          <span className="text-gray-600">Status: </span>
          <span className={`px-2 py-1 rounded-full text-sm font-medium ${getStatusColor()}`}>
            {getStatusText()}
          </span>
        </div>

        <div>
          <span className="text-gray-600">Flight Number: </span>
          <span className="font-medium">#{selectedLaunch.flight_number || Math.floor(Math.random() * 200)}</span>
        </div>

        <div>
          <span className="text-gray-600">Success Rate: </span>
          <span className="font-medium">{selectedLaunch.success ? '100%' : selectedLaunch.success === false ? '0%' : 'TBD'}</span>
        </div>
        
        <div>
          <span className="text-gray-600">Launch Type: </span>
          <span className="font-medium">{selectedLaunch.upcoming ? 'Scheduled' : 'Completed'}</span>
        </div>
        
        <div>
          <span className="text-gray-600">Mission ID: </span>
          <span className="font-medium text-xs">{selectedLaunch.id.slice(0, 8).toUpperCase()}</span>
        </div>
        
        <div>
          <span className="text-gray-600">Launch Year: </span>
          <span className="font-medium">{new Date(selectedLaunch.date_utc).getFullYear()}</span>
        </div>

        {selectedLaunch.details && (
          <div>
            <span className="text-gray-600">Mission Details: </span>
            <p className="text-sm mt-1 text-gray-700">{selectedLaunch.details}</p>
          </div>
        )}

        {selectedLaunch.links.webcast && (
          <div>
            <a
              href={selectedLaunch.links.webcast}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline text-sm"
            >
              Watch Webcast →
            </a>
          </div>
        )}
      </div>
      <Button
        caption="Favourite"
        className="w-full py-3 bg-red-600 text-white font-semibold rounded-lg flex items-center justify-center gap-2 hover:bg-orange-600 transition-colors"
        onClick={() => toggleFavorite(selectedLaunch.id)}
      />
    </div>
  );
}