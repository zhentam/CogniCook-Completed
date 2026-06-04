import { Outlet } from 'react-router-dom';
import Header from './Header';

interface LayoutProps {
  showHeader?: boolean;
}

export default function Layout({ showHeader = true }: LayoutProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {showHeader && <Header />}
      <main className={showHeader ? '' : 'min-h-screen'}>
        <Outlet />
      </main>
    </div>
  );
}