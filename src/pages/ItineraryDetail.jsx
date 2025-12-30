import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import axios from '../api/axios';
import AppSpinner from '../components/AppSpinner';
import { showToast } from '../components/AppToast';
import ItineraryView from '../../features/itineraries/ItineraryView';

export function ItineraryDetail({ actions }) {
  const { id } = useParams();

  const [itinerary, setItinerary] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchItinerary = async () => {
      setLoading(true);
      setError(null);

      try {
        const res = await axios.get(`/itinerary/${id}`);
        setItinerary(res.data);
      } catch (err) {
        setError(err.response?.data?.error ?? 'Failed to load itinerary');
      } finally {
        setLoading(false);
      }
    };

    fetchItinerary();
  }, [id]);

  if (loading) {
    return <AppSpinner />;
  }

  if (error) {
    console.log('this is error invalid id ', error);
    showToast(error ?? 'Failed to load itineraries', 'error', null);
    return null;
  }

  return <ItineraryView itinerary={itinerary} actions={actions}></ItineraryView>;
}
