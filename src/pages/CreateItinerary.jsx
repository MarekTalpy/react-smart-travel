import { useRef, useState } from 'react';

import axios from '../api/axios';
import { showToast } from '../components/AppToast';
import ItineraryGeneratorForm from '../../features/itineraries/ItineraryGeneratorForm';
import NewItineraryPreview from '../../features/itineraries/NewItineraryPreview';

export default function CreateItinerary() {
  const formRef = useRef(null);

  const [itinerary, setItinerary] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleGenerate = async ({ city, days }) => {
    console.log(`handleGenerate(): city: ${city}, days: ${days}`);
    setLoading(true);
    setError(null);

    try {
      const itinerary = await axios.post('itinerary/preview', {
        city,
        days: Number(days),
      });

      setItinerary(itinerary.data);
    } catch (error) {
      setError(error ?? 'Failed to generate itinerary');
    } finally {
      setLoading(false);
    }
  };

  const handleRemove = () => {
    setItinerary(null);
  };

  const handleSave = async () => {
    if (!itinerary) return;

    try {
      await axios.post('/itinerary/save', itinerary);
      showToast(`Itinerary for ${itinerary.city} saved successfully!`, 'success');
      setItinerary(null);

      // Reset the form safely
      formRef.current?.reset();
    } catch (err) {
      showToast(err ?? 'Failed to save itinerary', 'error');
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">
      <ItineraryGeneratorForm ref={formRef} onGenerate={handleGenerate} />
      <NewItineraryPreview
        itinerary={itinerary}
        loading={loading}
        error={error}
        onSave={handleSave}
        onRemove={handleRemove}
      />
    </div>
  );
}
