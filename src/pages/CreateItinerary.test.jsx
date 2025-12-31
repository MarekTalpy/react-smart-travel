import { vi } from 'vitest';

vi.mock('../api/axios');

vi.mock('../../utils/notifications', () => ({
  showToast: vi.fn(),
}));

vi.mock('../hooks/useSessionStorage', () => ({
  useSessionStorage: vi.fn(),
}));

vi.mock('../../features/itineraries/ItineraryGeneratorForm', () => ({
  default: ({ onGenerate }) => (
    <div>
      <button
        data-testid="generate-btn"
        onClick={async () => {
          try {
            await onGenerate({ city: 'Paris', days: 3 });
          } catch (e) {
            // do nothing, just let rejection propagate
          }
        }}
      >
        Generate
      </button>
    </div>
  ),
}));

vi.mock('../../features/itineraries/NewItineraryPreview', () => ({
  default: ({ itinerary, onRemove, onSave }) => (
    <div>
      {itinerary && <span>{itinerary.city}</span>}
      <button onClick={onRemove}>Remove</button>
      <button onClick={onSave}>Save</button>
    </div>
  ),
}));

import { describe, it, beforeEach, expect } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import axios from '../api/axios';
import CreateItinerary from './CreateItinerary';
import { useSessionStorage } from '../hooks/useSessionStorage';
import { showToast } from '../../utils/notifications';

describe('CreateItinerary', () => {
  let setItineraryMock;

  beforeEach(() => {
    vi.clearAllMocks();
    axios.post.mockReset();
    setItineraryMock = vi.fn();
    useSessionStorage.mockReturnValue([null, setItineraryMock]);
  });

  it('generates an itinerary and shows preview', async () => {
    const mockData = {
      city: 'Paris',
      days: [{ day: 1, title: 'Arrival', activities: ['Check-in'] }],
    };
    axios.post.mockResolvedValueOnce({ data: mockData });

    render(<CreateItinerary />);
    const user = userEvent.setup();

    const generateBtn = screen.getByTestId('generate-btn');
    await user.click(generateBtn);

    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledWith('itinerary/preview', {
        city: 'Paris',
        days: 3,
      });
      expect(setItineraryMock).toHaveBeenCalledWith(mockData);
    });
  });

  it('removes itinerary when Remove clicked', async () => {
    useSessionStorage.mockReturnValue([{ city: 'Paris', days: 3 }, setItineraryMock]);
    render(<CreateItinerary />);
    const user = userEvent.setup();

    await user.click(screen.getByText('Remove'));
    expect(setItineraryMock).toHaveBeenCalledWith(null);
  });

  it('saves itinerary and shows toast', async () => {
    const mockItinerary = { city: 'Paris', days: 3 };
    useSessionStorage.mockReturnValue([mockItinerary, setItineraryMock]);
    axios.post.mockResolvedValueOnce({});

    render(<CreateItinerary />);
    const user = userEvent.setup();

    await user.click(screen.getByText('Save'));
    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledWith('/itinerary/save', mockItinerary);
      expect(showToast).toHaveBeenCalledWith(`Itinerary for Paris saved successfully!`, 'success');
      expect(setItineraryMock).toHaveBeenCalledWith(null);
    });
  });

  it('shows error toast when save fails', async () => {
    const mockItinerary = { city: 'Paris', days: 3 };
    useSessionStorage.mockReturnValue([mockItinerary, setItineraryMock]);
    axios.post.mockRejectedValueOnce({ response: { data: { error: 'Save failed' } } });

    render(<CreateItinerary />);
    const user = userEvent.setup();

    await user.click(screen.getByText('Save'));
    await waitFor(() => {
      expect(showToast).toHaveBeenCalledWith('Save failed', 'error');
    });
  });

  // TODO: Fix this failing test
  it.skip('shows error toast when generate fails', async () => {
    axios.post.mockRejectedValueOnce({
      response: { data: { error: 'Generate failed' } },
    });

    render(<CreateItinerary />);
    const user = userEvent.setup();

    const generateBtn = screen.getByTestId('generate-btn');
    await user.click(generateBtn);

    await waitFor(() => {
      expect(showToast).toHaveBeenCalledWith('Generate failed', 'error', null);
    });
  });
});
