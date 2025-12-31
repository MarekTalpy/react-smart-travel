import { useCallback, useEffect, useState } from 'react';
import { PlusCircle } from 'lucide-react';

import ItineraryCard from './ItineraryCard';
import { showToast } from '../../utils/notifications';
import AppSpinner from '../../src/components/AppSpinner';
import { useNavigate } from 'react-router-dom';
import axios from '../../src/api/axios';

export default function ItineraryListOfCards() {
  const navigate = useNavigate();

  const [itineraries, setItineraries] = useState([]);
  const [loading, setloading] = useState(false);
  const [error, setError] = useState(null);

  const fetchItineraries = async () => {
    setloading(true);
    setError(null);

    try {
      const itineraries = await axios.get('itinerary');

      setItineraries(itineraries.data);
    } catch (err) {
      setError(err?.response?.data?.error ?? 'Failed to load itineraries');
    } finally {
      setloading(false);
    }
  };

  useEffect(() => {
    fetchItineraries();
  }, []);

  useEffect(() => {
    if (error) {
      showToast(error ?? 'Failed to load itineraries', 'error', null);
    }
  }, [error]);

  const handleDelete = useCallback(async (id) => {
    try {
      await axios.delete(`itinerary/${id}`);
      setItineraries((prev) => prev.filter((i) => i.id !== id));
      showToast('Itinerary deleted', 'success');
    } catch (err) {
      showToast(err?.response?.data?.error ?? 'Failed to delete itinerary', 'error');
    }
  }, []);

  if (loading) {
    return <AppSpinner />;
  }

  if (itineraries?.length === 0 && !error && !loading) {
    return (
      <div className="flex flex-col items-center justify-center text-center py-20 space-y-6">
        <PlusCircle className="w-16 h-16 text-gray-300" />
        <h2 className="text-2xl font-bold text-gray-700">No itineraries created yet</h2>
        <p className="text-gray-500">Start planning your trips by creating a new itinerary.</p>
        <button
          aria-label="create new itinerary"
          onClick={() => navigate('/create')}
          className="mt-4 inline-flex items-center gap-2 bg-indigo-600 text-white px-6 py-3 rounded-md hover:bg-indigo-700 transition"
        >
          <PlusCircle className="w-5 h-5" />
          Create New Itinerary
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      {itineraries.map((itinerary) => (
        <ItineraryCard itinerary={itinerary} key={itinerary.id} onDelete={handleDelete}></ItineraryCard>
      ))}
    </div>
  );
}
