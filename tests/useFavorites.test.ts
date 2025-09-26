import { renderHook, act } from '@testing-library/react';
import { useFavorites } from '@/hooks/useFavorites';

describe('useFavorites', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('should initialize with empty favorites', () => {
    const { result } = renderHook(() => useFavorites());
    expect(result.current.favorites).toEqual([]);
  });

  it('should add item to favorites', () => {
    const { result } = renderHook(() => useFavorites());

    act(() => {
      result.current.toggleFavorite('launch-1');
    });

    expect(result.current.favorites).toContain('launch-1');
    expect(result.current.isFavorite('launch-1')).toBe(true);
  });

  it('should remove item from favorites', () => {
    const { result } = renderHook(() => useFavorites());

    act(() => {
      result.current.toggleFavorite('launch-1');
    });

    act(() => {
      result.current.toggleFavorite('launch-1');
    });

    expect(result.current.favorites).not.toContain('launch-1');
    expect(result.current.isFavorite('launch-1')).toBe(false);
  });

  it('should clear all favorites', () => {
    const { result } = renderHook(() => useFavorites());

    act(() => {
      result.current.toggleFavorite('launch-1');
      result.current.toggleFavorite('launch-2');
    });

    act(() => {
      result.current.clearAllFavorites();
    });

    expect(result.current.favorites).toEqual([]);
  });

  it('should persist favorites in localStorage', () => {
    const { result } = renderHook(() => useFavorites());

    act(() => {
      result.current.toggleFavorite('launch-1');
    });

    const stored = JSON.parse(localStorage.getItem('spacex-favorites') || '[]');
    expect(stored).toContain('launch-1');
  });
});