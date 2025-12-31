import { render } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import NewItineraryPreview from './NewItineraryPreview';
import { showToast } from '../../utils/notifications';

vi.mock('../../utils/notifications', () => ({
  showToast: vi.fn(),
}));

describe('NewItineraryPreview', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should call showToast when error is provided', () => {
    const errorText = 'This is test Error';

    render(<NewItineraryPreview error={errorText} loading={false} />);

    expect(showToast).toHaveBeenCalledWith(errorText, 'error', null);
  });

  it('should render loading text when loading is true', () => {
    const { getByText } = render(<NewItineraryPreview error={null} loading={true} />);
    expect(getByText('Generating itinerary...')).toBeInTheDocument();
  });

  it('should render nothing when no itinerary and not loading', () => {
    const { container } = render(<NewItineraryPreview error={null} loading={false} />);
    expect(container.firstChild).toBeNull();
  });

  it('should render itinerary and actions when itinerary is provided', () => {
    const mockItinerary = { city: 'Paris', days: [] };
    const { getByLabelText } = render(
      <NewItineraryPreview itinerary={mockItinerary} loading={false} error={null} onRemove={vi.fn()} onSave={vi.fn()} />
    );

    expect(getByLabelText('remove-preview')).toBeInTheDocument();
    expect(getByLabelText('save-itinerary')).toBeInTheDocument();
  });
});
