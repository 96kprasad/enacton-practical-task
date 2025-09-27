export const formatDate = (date: string | Date): string => {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};

export const formatDateTime = (date: string | Date): string => {
  return new Date(date).toLocaleString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

export const getYear = (date: string | Date): number => {
  return new Date(date).getFullYear();
};

export const isUpcoming = (date: string | Date): boolean => {
  return new Date(date) > new Date();
};

export const sortByDate = (a: string | Date, b: string | Date, ascending = false): number => {
  const dateA = new Date(a).getTime();
  const dateB = new Date(b).getTime();
  return ascending ? dateA - dateB : dateB - dateA;
};

export const getStatusText = (upcoming: boolean, success: boolean | null): string => {
  if (upcoming) return 'Upcoming';
  if (success === true) return 'Success';
  if (success === false) return 'Failed';
  return 'Unknown';
};

export const getStatusColor = (upcoming: boolean, success: boolean | null): string => {
  if (upcoming) return 'text-blue-600 bg-blue-100';
  if (success === true) return 'text-green-600 bg-green-100';
  if (success === false) return 'text-red-600 bg-red-100';
  return 'text-gray-600 bg-gray-100';
};

export const getStatusDotColor = (upcoming: boolean, success: boolean | null): string => {
  if (upcoming) return 'bg-blue-500';
  if (success === true) return 'bg-green-500';
  if (success === false) return 'bg-red-500';
  return 'bg-gray-500';
};