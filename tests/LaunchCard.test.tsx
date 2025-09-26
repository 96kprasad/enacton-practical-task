import { render, screen, fireEvent } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import LaunchCard from '@/components/Launch/LaunchCard';
import { Launch } from '@/types/spacex';

const mockLaunch: Launch = {
  id: '1',
  name: 'Test Launch',
  date_utc: '2021-12-21T00:00:00Z',
  success: true,
  upcoming: false,
  details: 'Test launch details',
  links: { patch: { small: '', large: '' }, webcast: '' },
  flight_number: 123
};

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { retry: false },
  },
});

const renderWithQuery = (component: React.ReactElement) => {
  return render(
    <QueryClientProvider client={queryClient}>
      {component}
    </QueryClientProvider>
  );
};

describe('LaunchCard', () => {
  const mockOnClick = jest.fn();

  beforeEach(() => {
    mockOnClick.mockClear();
    localStorage.clear();
  });

  it('renders launch information correctly', () => {
    renderWithQuery(
      <LaunchCard launch={mockLaunch} onClick={mockOnClick} />
    );

    expect(screen.getByText('Test Launch')).toBeInTheDocument();
    expect(screen.getByText('Success')).toBeInTheDocument();
  });

  it('calls onClick when card is clicked', () => {
    renderWithQuery(
      <LaunchCard launch={mockLaunch} onClick={mockOnClick} />
    );

    fireEvent.click(screen.getByText('Test Launch'));
    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });

  it('toggles favorite when heart icon is clicked', () => {
    renderWithQuery(
      <LaunchCard launch={mockLaunch} onClick={mockOnClick} />
    );

    const favoriteButton = screen.getByRole('button');
    fireEvent.click(favoriteButton);

    const favorites = JSON.parse(localStorage.getItem('spacex-favorites') || '[]');
    expect(favorites).toContain('1');
  });
});