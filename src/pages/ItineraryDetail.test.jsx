import { render, screen, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';

import { ItineraryDetail } from './ItineraryDetail';
import axios from '../api/axios';
import { useParams } from 'react-router-dom';
import { showToast } from '../../utils/notifications';

vi.mock('../api/axios');

vi.mock('../../features/itineraries/ItineraryView', () => ({
  default: ({ itinerary }) => <div data-testid="itinerary-view">{itinerary?.city}</div>,
}));

vi.mock('../../utils/notifications', () => ({
  showToast: vi.fn(),
}));

vi.mock('../components/AppSpinner', () => ({
  default: () => <div data-testid="spinner">Loading...</div>,
}));

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useParams: vi.fn(),
  };
});

describe('ItineraryDetail Component', () => {
  let itinerary;

  beforeEach(() => {
    itinerary = {
      city: 'Amsterdam',
      days: [],
      createdAt: '2025-12-27T11:43:34.855Z',
      updatedAt: '2025-12-27T11:43:34.855Z',
      id: '694fc666f7ed3664f8a46dfe',
    };

    vi.clearAllMocks();
    useParams.mockReturnValue({ id: '694fc666f7ed3664f8a46dfe' });
  });

  it('should fetch and render itinerary on success', async () => {
    axios.get.mockResolvedValueOnce({ data: itinerary });

    render(<ItineraryDetail actions={[]} />);

    const itineraryView = await screen.findByTestId('itinerary-view');

    expect(itineraryView).toBeInTheDocument();
    expect(itineraryView).toHaveTextContent('Amsterdam');
    expect(axios.get).toHaveBeenCalledWith('/itinerary/694fc666f7ed3664f8a46dfe');
  });

  it('should display spinner while loading', async () => {
    axios.get.mockImplementation(() => new Promise(() => {}));

    render(<ItineraryDetail actions={[]} />);

    expect(screen.getByTestId('spinner')).toBeInTheDocument();
  });

  it('should display error toast on API failure', async () => {
    axios.get.mockRejectedValueOnce({
      response: {
        data: { error: 'Invalid itinerary ID' },
      },
    });

    render(<ItineraryDetail actions={[]} />);

    await waitFor(() => {
      expect(showToast).toHaveBeenCalledWith('Invalid itinerary ID', 'error', null);
    });
  });

  it('should display fallback error message if API error has no message', async () => {
    axios.get.mockRejectedValueOnce(new Error('Network error'));

    render(<ItineraryDetail actions={[]} />);

    await waitFor(() => {
      expect(showToast).toHaveBeenCalledWith('Failed to load itinerary', 'error', null);
    });
  });
});
