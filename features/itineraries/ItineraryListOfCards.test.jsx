import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import axios from '../../src/api/axios';
import { showToast } from '../../utils/notifications';
import ItineraryListOfCards from './ItineraryListOfCards';

vi.mock('../../src/api/axios', () => ({
  default: {
    get: vi.fn(),
    delete: vi.fn(),
  },
}));

vi.mock('../../utils/notifications', () => ({
  showToast: vi.fn(),
}));

const mockNavigate = vi.fn();

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

vi.mock('./ItineraryCard', () => ({
  default: ({ itinerary, onDelete }) => (
    <div data-testid="itinerary-card">
      <span>{itinerary.title}</span>
      <button onClick={() => onDelete(itinerary.id)}>Delete</button>
    </div>
  ),
}));

vi.mock('../../src/components/AppSpinner', () => ({
  default: () => <div data-testid="spinner">Loading...</div>,
}));

describe('ItineraryListOfCards Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should display spinner while loading', async () => {
    axios.get.mockResolvedValueOnce({ data: [] });

    render(<ItineraryListOfCards />);

    expect(screen.getByTestId('spinner')).toBeInTheDocument();
  });

  it('should render empty state when no itineraries exist', async () => {
    axios.get.mockResolvedValueOnce({ data: [] });

    render(<ItineraryListOfCards />);

    expect(await screen.findByText(/no itineraries created yet/i)).toBeInTheDocument();
  });

  it('should render itinerary cards when data is returned', async () => {
    axios.get.mockResolvedValueOnce({
      data: [
        { id: 1, title: 'Paris Trip' },
        { id: 2, title: 'Rome Trip' },
      ],
    });

    render(<ItineraryListOfCards />);

    const cards = await screen.findAllByTestId('itinerary-card');
    expect(cards).toHaveLength(2);

    expect(screen.getByText('Paris Trip')).toBeInTheDocument();
    expect(screen.getByText('Rome Trip')).toBeInTheDocument();
  });

  it('should display error toast when fetch fails', async () => {
    const errorMessage = 'Fetch failed';
    axios.get.mockRejectedValueOnce({
      response: { data: { error: errorMessage } },
    });

    render(<ItineraryListOfCards />);

    await waitFor(() => {
      expect(showToast).toHaveBeenCalledWith(errorMessage, 'error', null);
    });
  });

  it('should delete itinerary and remove it from the list', async () => {
    const user = userEvent.setup();

    axios.get.mockResolvedValueOnce({
      data: [{ id: 1, title: 'Berlin Trip' }],
    });

    axios.delete.mockResolvedValueOnce({});

    render(<ItineraryListOfCards />);

    const deleteBtn = await screen.findByText('Delete');
    await user.click(deleteBtn);

    await waitFor(() => {
      expect(showToast).toHaveBeenCalledWith('Itinerary deleted', 'success');
    });

    await waitFor(() => {
      expect(screen.queryByText('Berlin Trip')).not.toBeInTheDocument();
    });
  });

  it('should display error toast when delete fails', async () => {
    const user = userEvent.setup();

    axios.get.mockResolvedValueOnce({
      data: [{ id: 1, title: 'Madrid Trip' }],
    });

    axios.delete.mockRejectedValueOnce({
      response: { data: { error: 'Delete failed' } },
    });

    render(<ItineraryListOfCards />);

    await user.click(await screen.findByText('Delete'));

    await waitFor(() => {
      expect(showToast).toHaveBeenCalledWith('Delete failed', 'error');
    });
  });

  it('should navigate to create page when button is clicked', async () => {
    axios.get.mockResolvedValueOnce({ data: [] });

    const user = userEvent.setup();
    render(<ItineraryListOfCards />);

    const button = await screen.findByRole('button', {
      name: /create new itinerary/i,
    });

    await user.click(button);

    expect(mockNavigate).toHaveBeenCalledWith('/create');
  });
});
