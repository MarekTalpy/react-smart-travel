import { Trash2, Save } from 'lucide-react';

import ItineraryView from './ItineraryView';

export default function NewItineraryPreview({ itinerary, loading, error, onRemove, onSave }) {
  if (loading) {
    return <p className="text-gray-500">Generating itinerary...</p>;
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  if (!itinerary) return null;

  const actions = (
    <>
      <button
        onClick={onRemove}
        className="
              inline-flex items-center gap-1.5
              rounded-md border border-gray-300
              px-3 py-1.5 text-sm text-gray-700
              hover:bg-gray-100
            "
      >
        <Trash2 className="h-4 w-4" />
        Remove preview
      </button>

      <button
        onClick={onSave}
        className="
              inline-flex items-center gap-1.5
              rounded-md bg-indigo-600
              px-3 py-1.5 text-sm text-white
              hover:bg-indigo-700
            "
      >
        <Save className="h-4 w-4" />
        Save to itineraries
      </button>
    </>
  );

  return <ItineraryView itinerary={itinerary} actions={actions}></ItineraryView>;
}
