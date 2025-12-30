export default function ItineraryView({ itinerary, actions }) {
  if (!itinerary) return null;

  return (
    <div className="bg-white rounded-xl shadow p-6 space-y-6">
      <div className="flex flex-col lg:flex-row justify-between items-start gap-2">
        {actions && <div className="order-first lg:order-last mb-2 lg:mb-0 flex gap-2 w-full lg:w-auto">{actions}</div>}

        <h2 className="text-2xl font-bold text-gray-800 flex-1 min-w-0">
          <span className="text-gray-500">Explore the city of </span>
          <span className="text-indigo-600">{itinerary.city}</span>
        </h2>
      </div>

      {itinerary.days.map((day) => (
        <div data-testid="itinerary-container" key={day.day} className="border-l-4 border-blue-500 pl-4">
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
