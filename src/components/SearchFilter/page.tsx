'use client';
import { useState, useEffect } from 'react';
import { useDebounce } from '@/hooks/useDebounce';
import SearchInput from '../Input/SearchInput';
import SingleSelectDropdown from '../Input/SingleSelectDropdown';
import Button from '../Button/page';
import { SearchFiltersProps } from './types';

import {
  launchStatus,
  launchType,
  launchYears,
  launchSort
} from './filterConstants';

interface FilterState {
  success: string;
  upcoming: string;
  year: string;
  sortBy: string;
}

interface SearchFiltersExtendedProps extends SearchFiltersProps {
  onSearchChange?: (search: string) => void;
  onFiltersChange?: (filters: FilterState) => void;
}

export default function SearchFilters({ showFilters, onToggleFilters, onSearchChange, onFiltersChange }: SearchFiltersExtendedProps) {
  const [search, setSearch] = useState('');
  const [success, setSuccess] = useState('');
  const [upcoming, setUpcoming] = useState('');
  const [year, setYear] = useState('');
  const [sortBy, setSortBy] = useState('date_utc');
  
  const debouncedSearch = useDebounce(search, 500);
  
  useEffect(() => {
    onSearchChange?.(debouncedSearch);
  }, [debouncedSearch, onSearchChange]);
  
  useEffect(() => {
    onFiltersChange?.({ success, upcoming, year, sortBy });
  }, [success, upcoming, year, sortBy, onFiltersChange]);

  return (
    <div className="mb-6">
      <div className="flex gap-4 mb-4">
        <SearchInput
          placeholder="Search launches..."
          value={search}
          onChange={setSearch}
        />
        <Button
          caption="Filters"
          className="bg-red-500 text-white font-semibold hover:bg-orange-600"
          onClick={onToggleFilters}
        />
      </div>
      {showFilters && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4 bg-gray-50 rounded-lg">
          <SingleSelectDropdown
            options={launchStatus}
            value={success}
            onChange={setSuccess}
          />
          <SingleSelectDropdown
            options={launchType}
            value={upcoming}
            onChange={setUpcoming}
          />
          <SingleSelectDropdown
            options={launchYears}
            value={year}
            onChange={setYear}
          />
          <SingleSelectDropdown
            options={launchSort}
            value={sortBy}
            onChange={setSortBy}
          />
        </div>
      )}
    </div>
  );
}