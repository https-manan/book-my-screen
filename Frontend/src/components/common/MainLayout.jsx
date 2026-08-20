import { Outlet, useLocation, matchPath } from 'react-router-dom';

import Header from './Header';
import Footer from './Footer';

const MainLayout = () => {
  const location = useLocation();

  const isSeatLayoutPage = matchPath(
    '/movies/:movieId/:movieName/:state/theater/:theaterId/show/:showId/seat-layout',
    location.pathname
  );

  const isCheckOutPage = matchPath(
    '/show/:showId/:state/checkout',
    location.pathname
  );

  return (
    <div className="min-h-screen flex flex-col">
      {!isSeatLayoutPage && !isCheckOutPage && <Header />}

      <main className="flex-1">
        <Outlet />
      </main>

      {/* <Footer /> */}
    </div>
  );
};

export default MainLayout;