import { Routes, Route, Navigate } from 'react-router-dom';

import MainLayout from './components/MainLayout';
import { MyItineraries } from './pages/MyItineraries';
import { ItineraryDetail } from './pages/ItineraryDetail';
import CreateItinerary from './pages/CreateItinerary';

export default function AppRouter() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Navigate to="/my-itineraries" replace />} />
        <Route path="/my-itineraries" element={<MyItineraries />} />
        <Route path="/my-itineraries/:id" element={<ItineraryDetail />} />
        <Route path="/create" element={<CreateItinerary />} />
      </Route>
    </Routes>
  );
}
