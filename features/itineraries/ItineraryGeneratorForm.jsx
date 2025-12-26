import { useState, forwardRef, useImperativeHandle } from 'react';

const ItineraryGeneratorForm = forwardRef(({ onGenerate }, ref) => {
  const [city, setCity] = useState('');
  const [days, setDays] = useState(1);
  const [loading, setLoading] = useState(false);

  useImperativeHandle(ref, () => ({
    reset: () => {
      setCity('');
      setDays(1);
    },
  }));

  const handleSubmit = async (e) => {
    e.preventDefault();
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
        className={`inline-flex justify-center rounded-md px-4 py-2 text-white ${
          loading ? 'bg-indigo-300 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700'
        }`}
      >
        {loading ? 'Generating...' : 'Generate Itinerary'}
      </button>
    </form>
  );
});

export default ItineraryGeneratorForm;
