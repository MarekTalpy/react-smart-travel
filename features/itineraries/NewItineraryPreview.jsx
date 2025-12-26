import { Trash2, Save } from 'lucide-react';

export default function NewItineraryPreview({ itinerary, loading, error, onRemove, onSave }) {
  if (loading) {
    return <p className="text-gray-500">Generating itinerary...</p>;
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  if (!itinerary) return null;

  return (
    <div className="bg-white rounded-xl shadow p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-800">{itinerary.city}</h2>

        <div className="flex gap-2">
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
        </div>
      </div>

      {/* Days */}
      {itinerary.days.map((day) => (
        <div key={day.day} className="border-l-4 border-blue-500 pl-4">
          <h3 className="font-semibold text-lg">
            Day {day.day}: {day.title}
          </h3>

          <ul className="list-disc list-inside text-gray-700 mt-2 space-y-1">
            {day.activities.map((activity, i) => (
              <li key={i}>{activity}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
