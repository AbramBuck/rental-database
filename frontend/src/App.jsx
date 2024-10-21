import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { createBrowserRouter, RouterProvider, Outlet, Navigate } from 'react-router-dom';
import Navigation from './components/Navigation/Navigation';
import * as sessionActions from './store/session';
import SpotDetailsPage from './components/SpotDetailsPage/SpotDetailsPage';
import HomePage from './components/HomePage/HomePage';
import CreateSpotFormModal from './components/CreateSpotForm/CreateSpotForm';
import ManageSpots from './components/ManageSpots/ManageSpots';

function Layout() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => {
      setIsLoaded(true)
    });
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && <Outlet />}
    </>
  );
}

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <HomePage />
      },
      {
        path: '/spots/:spotId',
        element: <SpotDetailsPage />
      },
      {
        path: '/spots/new',
        element: <CreateSpotFormModal />
      },
      {
        path: '/spots/manage',
        element:<ManageSpots />
      },
      { path: '*', element: <Navigate to='/' replace={true} /> }
    ]
  }
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;