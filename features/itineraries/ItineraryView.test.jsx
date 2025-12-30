import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import ItineraryView from './ItineraryView';

describe('ItineraryView Component', () => {
  it('should display the itinerary view with all the days and activities correctly', () => {
    const itinerary = {
      city: 'Amsterdam',
      days: [
        {
          day: 1,
          title: 'Explore the Historic City Center',
          activities: [
            'Visit Dam Square and Royal Palace',
            'Tour the Anne Frank House',
            'Stroll along the canals',
            'Dinner at a local Dutch restaurant',
          ],
        },
        {
          day: 2,
          title: 'Museums and Art',
          activities: [
            'Visit the Rijksmuseum',
            'Explore the Van Gogh Museum',
            'Relax at Vondelpark',
            'Coffee at a canal-side café',
          ],
        },
        {
          day: 3,
          title: 'Cultural Immersion',
          activities: [
            'Visit the Jordaan neighborhood',
            'Explore the Houseboat Museum',
            'Browse the Noordermarkt flea market',
            'Enjoy live music at a local bar',
          ],
        },
      ],
      createdAt: '2025-12-27T11:43:34.855Z',
      updatedAt: '2025-12-27T11:43:34.855Z',
      id: '694fc666f7ed3664f8a46dfe',
    };

    render(<ItineraryView itinerary={itinerary} actions={null} />);

    expect(screen.getByText('Amsterdam')).toBeInTheDocument();
    expect(screen.getAllByTestId('itinerary-container').length).toBe(3);
    expect(screen.getByText('Day 1: Explore the Historic City Center')).toBeInTheDocument();
    expect(screen.getByText('Visit the Jordaan neighborhood')).toBeInTheDocument();
  });
});
