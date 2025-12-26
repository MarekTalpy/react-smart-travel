import { useNavigate } from 'react-router-dom';
import { Trash2 } from 'lucide-react';

export default function ItineraryCard({ itinerary, onDelete }) {
  const navigate = useNavigate();

  if (!itinerary) return null;

  return (
    <div className="bg-white rounded-xl shadow-md p-6 flex flex-col space-y-4 hover:shadow-lg transition-shadow">
      <div className="flex justify-between items-start">
        <h3 className="text-xl font-bold text-gray-800">
          <span className="text-gray-500 font-medium">Explore the city of </span>
          <span className="text-indigo-600">{itinerary.city}</span>
        </h3>

        <button
          onClick={() => onDelete(itinerary.id)}
          className="text-red-500 hover:text-red-700 p-2 rounded-full cursor-pointer"
          title="Delete itinerary"
        >
          <Trash2 className="w-5 h-5" />
        </button>
      </div>

      <div className="text-gray-600 text-sm space-y-1">
        <p>
          <span className="text-gray-500 font-medium">Days: </span>
          <span className="text-gray-800">{itinerary.days.length}</span>
        </p>
        <p>
          <span className="text-gray-500 font-medium">Created: </span>
          <span className="text-gray-800">{new Date(itinerary.createdAt).toLocaleDateString()}</span>
        </p>
      </div>

      <button
        onClick={() => navigate(`/my-itineraries/${itinerary.id}`)}
        className="mt-auto inline-block self-start rounded-md bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700 cursor-pointer"
      >
        Show Detail
      </button>
    </div>
  );
}
