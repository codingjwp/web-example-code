import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { lazy, Suspense } from "react";
import Root from "./pages/Root";
const BaseZustand = lazy(() => import('./pages/BaseZustand'))

const navMenu = [
  {
    path: '/',
    element: <Root />,
    children: [
      {
        index: true,
        element: <Suspense fallback={<div>Loading...</div>}><BaseZustand /></Suspense>
      },
    ]
  }
]
const routers = createBrowserRouter(navMenu)

function App() {

  return (
    <RouterProvider router={routers} />
  )
}

export default App;
