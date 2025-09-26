import { useState, useEffect, useCallback } from 'react';

export function useFavorites() {
  const [favorites, setFavorites] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem('spacex-favorites');
    if (stored) {
      try {
        setFavorites(JSON.parse(stored));
      } catch (error) {
        console.error('Error parsing favorites from localStorage:', error);
        setFavorites([]);
      }
    }
    setIsLoading(false);
  }, []);

  const toggleFavorite = useCallback((id: string) => {
    setFavorites(prevFavorites => {
      const newFavorites = prevFavorites.includes(id)
        ? prevFavorites.filter(fav => fav !== id)
        : [...prevFavorites, id];
      
      localStorage.setItem('spacex-favorites', JSON.stringify(newFavorites));
      return newFavorites;
    });
  }, []);

  const isFavorite = useCallback((id: string) => favorites.includes(id), [favorites]);

  const clearAllFavorites = useCallback(() => {
    setFavorites([]);
    localStorage.setItem('spacex-favorites', JSON.stringify([]));
  }, []);

  return {
    favorites,
    toggleFavorite,
    isFavorite,
    clearAllFavorites,
    isLoading
  };
}