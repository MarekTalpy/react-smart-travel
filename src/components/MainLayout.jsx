import { Outlet } from 'react-router-dom';
import AppHeader from './AppHeader';

export default function MainLayout() {
  return (
    <div className="h-screen flex flex-col">
      <AppHeader />
      <main className="flex-1 overflow-y-auto pt-24 scrollbar-hidden">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 py-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
