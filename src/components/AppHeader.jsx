import { Link } from 'react-router-dom';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';

export default function AppHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b">
      <nav className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8 lg:grid lg:grid-cols-3 lg:items-center">
        <div className="flex items-center">
          <Link to="/" className="flex items-center gap-2">
            <img
              src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600"
              alt="Logo"
              className="h-8 w-auto"
            />
          </Link>
        </div>

        <div className="hidden lg:flex justify-center gap-x-12">
          <Link to="/create" className="text-sm font-semibold text-gray-900">
            Create Itinerary
          </Link>
          <Link to="/my-itineraries" className="text-sm font-semibold text-gray-900">
            My Itineraries
          </Link>
        </div>

        <div className="flex items-center justify-end gap-4">
          <Link to="/login" className="hidden lg:block text-sm font-semibold text-gray-900">
            Log in
          </Link>

          <button
            onClick={() => setOpen(!open)}
            className="lg:hidden p-2 rounded-md text-gray-700 hover:bg-gray-100"
            aria-label="Toggle menu"
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </nav>

      {open && (
        <div className="lg:hidden bg-white border-t shadow-md animate-enter">
          <div className="flex flex-col px-6 py-4 space-y-4">
            <Link to="/create" onClick={() => setOpen(false)}>
              Create Itinerary
            </Link>
            <Link to="/my-itineraries" onClick={() => setOpen(false)}>
              My Itineraries
            </Link>
            <Link to="/login" onClick={() => setOpen(false)}>
              Log in
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
