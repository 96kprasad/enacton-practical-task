export interface Launch {
  id: string;
  name: string;
  date_utc: string;
  success: boolean | null;
  upcoming: boolean;
  details: string | null;
  flight_number?: number;
  links: {
    patch: {
      small: string | null;
      large: string | null;
    };
    flickr: {
      small: string[];
      original: string[];
    };
    webcast: string | null;
  };
  rocket: string;
  launchpad: string;
}

export interface Rocket {
  id: string;
  name: string;
  type: string;
  active: boolean;
  stages: number;
  boosters: number;
  cost_per_launch: number;
  success_rate_pct: number;
  first_flight: string;
  country: string;
  company: string;
  wikipedia: string;
  description: string;
  flickr_images: string[];
}

export interface LaunchFilters {
  search: string;
  success: string;
  upcoming: string;
  year: string;
}

export interface SortOption {
  value: string;
  label: string;
}

// Component Props Interfaces
export interface SearchFiltersProps {
  showFilters: boolean;
  onToggleFilters: () => void;
}

export interface FilterState {
  success: string;
  upcoming: string;
  year: string;
  sortBy: string;
}

export interface LaunchCardProps {
  launch: Launch;
  onClick: () => void;
}

export interface LaunchDetailProps {
  selectedLaunch: Launch | null;
}

export interface LaunchGridProps {
  onLaunchSelect: (launch: Launch) => void;
  onShowFavorites: () => void;
}

export interface FavoritesPanelProps {
  onBack: () => void;
  onLaunchSelect: (launch: Launch) => void;
}

export interface DetailRowProps {
  label: string;
  value: string | React.ReactNode;
}