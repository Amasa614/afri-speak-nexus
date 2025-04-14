
import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { AppHeader } from '@/components/layout/AppHeader';

const AppLayout: React.FC = () => {
  const location = useLocation();
  const showNavigation = location.pathname === '/profile';

  return (
    <div className="flex min-h-screen bg-background">
      <div className="flex-1 flex flex-col">
        {showNavigation && <AppHeader />}
        <main className="flex-1 p-6">
          <div className="mt-6">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default AppLayout;
