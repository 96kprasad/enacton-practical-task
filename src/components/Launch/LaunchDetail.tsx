'use client';
import { useFavorites } from '@/hooks/useFavorites';
import Button from '../Button/page';
import { InfoIcon, HeartIcon } from '../../../utils/svgConstants';
import { LaunchDetailProps } from '@/types/spacex';
import DetailRow from './DetailRow/page';
import { formatDateTime, getStatusText, getStatusColor, getYear } from '../../../utils/spaceXUtils';

export default function LaunchDetail({ selectedLaunch }: LaunchDetailProps) {
  const { toggleFavorite, isFavorite } = useFavorites();

  if (!selectedLaunch) {
    return (
      <div className="bg-white rounded-lg p-6">
        <div className="text-center text-gray-500">
          <InfoIcon className="w-16 h-16 mx-auto mb-4 text-gray-300" />
          <p>Select a launch to view details</p>
        </div>
      </div>
    );
  }

  const { name, date_utc, upcoming, success, flight_number, id, details, links } = selectedLaunch;

  return (
    <div className="bg-white rounded-lg p-6">
      <div className="aspect-square bg-slate-600 rounded-lg mb-4 relative overflow-hidden">
        {links.patch.large ? (
          <img src={links.patch.large} alt={name} className="w-full h-full object-cover" />
        ) : (
          <div className="flex items-center justify-center h-full text-white">
            <HeartIcon className="w-16 h-16" />
          </div>
        )}
      </div>

      <h2 className="text-2xl font-bold mb-3">{name}</h2>

      <div className="space-y-3 mb-6">
        <DetailRow label="Launch Date" value={formatDateTime(date_utc)} />
        <DetailRow label="Rocket" value="Falcon 9" />
        <DetailRow
          label="Status"
          value={
            <span className={`px-2 py-1 rounded-full text-sm font-medium ${getStatusColor(upcoming, success)}`}>
              {getStatusText(upcoming, success)}
            </span>
          }
        />
        <DetailRow label="Flight Number" value={`#${flight_number || Math.floor(Math.random() * 200)}`} />
        <DetailRow label="Success Rate" value={success ? '100%' : success === false ? '0%' : 'TBD'} />
        <DetailRow label="Launch Type" value={upcoming ? 'Scheduled' : 'Completed'} />
        <DetailRow label="Mission ID" value={<span className="text-xs">{id.slice(0, 8).toUpperCase()}</span>} />
        <DetailRow label="Launch Year" value={getYear(date_utc).toString()} />

        {details && (
          <div>
            <span className="text-gray-600">Mission Details: </span>
            <p className="text-sm mt-1 text-gray-700">{details}</p>
          </div>
        )}

        {links.webcast && (
          <div>
            <a href={links.webcast} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline text-sm">
              Watch Webcast →
            </a>
          </div>
        )}
      </div>

      <Button
        caption={isFavorite(id) ? "Remove from Favorites" : "Add to Favorites"}
        svgImage={<HeartIcon className={`w-5 h-5 ${isFavorite(id) ? 'text-red-500 fill-current' : 'text-white'}`} />}
        className={`w-full py-3 font-semibold rounded-lg flex items-center justify-center gap-2 transition-colors ${isFavorite(id)
            ? 'bg-gray-200 text-gray-800 hover:bg-gray-300'
            : 'bg-red-600 text-white hover:bg-red-700'
          }`}
        onClick={() => toggleFavorite(id)}
      />
    </div>
  );
}