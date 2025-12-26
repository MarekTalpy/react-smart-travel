import ItineraryGeneratorForm from '../../features/itineraries/ItineraryGeneratorForm';
import NewItineraryPreview from '../../features/itineraries/NewItineraryPreview';

export default function CreateItinerary() {
  const handleGenerate = ({ city, days }) => {
    console.log(`handleGenerate(): city: ${city}, days: ${days}`);

    // TODO: When express route with AI feature is ready, complete this code
  };

  return (
    <>
      <ItineraryGeneratorForm onGenerate={handleGenerate} />
      <NewItineraryPreview />
    </>
  );
}
