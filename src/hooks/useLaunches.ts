import { useQuery } from '@tanstack/react-query';
import SpaceXServices from '@/services/SpaceXServices';

const spaceXService = new SpaceXServices();

export function useLaunches() {
  const { data: launches = [], isLoading: loading, error } = useQuery({
    queryKey: ['launches'],
    queryFn: async ({ signal }) => {
      const response = await spaceXService.fetchAllLaunches();
      if (signal?.aborted) throw new Error('Request cancelled');
      return response.data || [];
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes cache
  });

  const loadMore = () => {
  };

  return {
    launches,
    loading,
    error: error?.message || null,
    hasMore: true,
    loadMore
  };
}