import { useState } from 'react';

export default function ItineraryGeneratorForm({ onGenerate }) {
  const [city, setCity] = useState('');
  const [days, setDays] = useState(1);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!city || days < 1) return;

    setLoading(true);
    await onGenerate({ city, days });
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
      <div>
        <label className="block text-sm font-medium text-gray-700">City</label>
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Days</label>
        <input
          type="number"
          value={days}
          onChange={(e) => setDays(Number(e.target.value))}
          min={1}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          required
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="inline-flex justify-center rounded-md bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700 cursor-pointer"
      >
        {loading ? 'Generating...' : 'Generate Itinerary'}
      </button>
    </form>
  );
}
