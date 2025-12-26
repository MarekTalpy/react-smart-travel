import { Outlet } from 'react-router-dom';

import AppHeader from './AppHeader';

export default function MainLayout() {
  return (
    <div className="min-h-screen flex flex-col">
      <AppHeader />
      <main className="pt-16 flex-1">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
