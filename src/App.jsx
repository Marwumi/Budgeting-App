import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import Main, { mainLoader} from "./Layouts/Main";
// import { logoutAction } from "./actions/Logout";

import { logoutAction } from "./actions/logout";

// Routes
import Dashboard, { dashboardLoader } from "./pages/Dashboard";
import Error from "./pages/Error";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    loader: mainLoader,
    errorElement: <Error />,
    children: [
      {
        // path: "/",
        index: true,
        element: <Dashboard />,
        loader: dashboardLoader,
        errorElement: <Error />
      },
      {
        path: "logout",
        // element: <p>logged out!</p>
        action: logoutAction
      }
    ]
  },
  
  // {
  //   path: "*",
  //   element: <Error />

  // }
]);

function App() {
  return <div className="App">
    <RouterProvider router={router} />
  </div>;
}

export default App;