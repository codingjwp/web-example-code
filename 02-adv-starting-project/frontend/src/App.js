import { createBrowserRouter, RouterProvider} from 'react-router-dom'
import HomePage from './pages/HomePage';
import RootLayout from './pages/RootLayout';
import EventRootLayout from './pages/EventRootLayout';
import EventsPage, {loader} from './pages/EventsPage';
import EventDetailPage from './pages/EventDetailPage';
import EditEventPage from './pages/EditEventPage';
import NewEventPage from './pages/NewEventPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout/>,
    children: [
      { index: true, element: <HomePage />},
      { path: 'events', element: <EventsPage />, loader: loader },
    ]
  },
  {
    path: '/events/:detailId',
    element: <EventRootLayout/>,
    children: [
      { index: true, element: <EventDetailPage />},
      { path: 'edit', element: <EditEventPage />},
      { path: 'new', element: <NewEventPage />},
    ]
  },
])

function App() {
  return <RouterProvider router={router} />;
}

export default App;
