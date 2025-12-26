export default function ItineraryView({ itinerary, actions }) {
  if (!itinerary) return null;

  return (
    <div className="bg-white rounded-xl shadow p-6 space-y-6">
      <div className="flex justify-between items-start">
        <h2 className="text-2xl font-bold text-gray-800">
          <span className="text-gray-500">Explore the city of </span>
          <span className="text-indigo-600">{itinerary.city}</span>
        </h2>

        {actions && <div className="flex gap-2">{actions}</div>}
      </div>

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
