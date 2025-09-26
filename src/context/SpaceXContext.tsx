'use client';

import { createContext, useContext, useReducer, ReactNode } from 'react';
import { Launch, LaunchFilters } from '@/types/spacex';

interface SpaceXState {
  launches: Launch[];
  selectedLaunch: Launch | null;
  favorites: string[];
  filters: LaunchFilters;
  sortBy: string;
  loading: boolean;
  error: string | null;
  page: number;
  hasMore: boolean;
}

type SpaceXAction =
  | { type: 'SET_LAUNCHES'; payload: Launch[] }
  | { type: 'APPEND_LAUNCHES'; payload: Launch[] }
  | { type: 'SET_SELECTED_LAUNCH'; payload: Launch | null }
  | { type: 'SET_FAVORITES'; payload: string[] }
  | { type: 'TOGGLE_FAVORITE'; payload: string }
  | { type: 'SET_FILTERS'; payload: Partial<LaunchFilters> }
  | { type: 'SET_SORT'; payload: string }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'SET_PAGE'; payload: number }
  | { type: 'SET_HAS_MORE'; payload: boolean };

const initialState: SpaceXState = {
  launches: [],
  selectedLaunch: null,
  favorites: [],
  filters: { search: '', success: '', upcoming: '', year: '' },
  sortBy: 'date_utc',
  loading: false,
  error: null,
  page: 1,
  hasMore: true,
};

function spaceXReducer(state: SpaceXState, action: SpaceXAction): SpaceXState {
  switch (action.type) {
    case 'SET_LAUNCHES':
      return { ...state, launches: action.payload };
    case 'APPEND_LAUNCHES':
      return { ...state, launches: [...state.launches, ...action.payload] };
    case 'SET_SELECTED_LAUNCH':
      return { ...state, selectedLaunch: action.payload };
    case 'SET_FAVORITES':
      return { ...state, favorites: action.payload };
    case 'TOGGLE_FAVORITE':
      const isFavorite = state.favorites.includes(action.payload);
      const newFavorites = isFavorite
        ? state.favorites.filter(id => id !== action.payload)
        : [...state.favorites, action.payload];
      return { ...state, favorites: newFavorites };
    case 'SET_FILTERS':
      return { ...state, filters: { ...state.filters, ...action.payload } };
    case 'SET_SORT':
      return { ...state, sortBy: action.payload };
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload };
    case 'SET_PAGE':
      return { ...state, page: action.payload };
    case 'SET_HAS_MORE':
      return { ...state, hasMore: action.payload };
    default:
      return state;
  }
}

const SpaceXContext = createContext<{
  state: SpaceXState;
  dispatch: React.Dispatch<SpaceXAction>;
} | null>(null);

export function SpaceXProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(spaceXReducer, initialState);

  return (
    <SpaceXContext.Provider value={{ state, dispatch }}>
      {children}
    </SpaceXContext.Provider>
  );
}

export function useSpaceX() {
  const context = useContext(SpaceXContext);
  if (!context) {
    throw new Error('useSpaceX must be used within SpaceXProvider');
  }
  return context;
}