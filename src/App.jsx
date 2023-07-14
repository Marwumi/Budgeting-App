import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import Main, { mainLoader} from "./Layouts/Main";
// import { logoutAction } from "./actions/Logout";

import { logoutAction } from "./actions/logout";
import { deleteBudget } from "./actions/deleteBudget";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Routes
import Dashboard, { dashboardAction, dashboardLoader } from "./pages/Dashboard";
import Error from "./pages/Error";
import ExpensesPage, { expensesAction, expensesLoader } from "./components/ExpensesPage";
import BudgetPage, { budgetAction, budgetLoader } from "./pages/BudgetPage";

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
        action: dashboardAction,
        errorElement: <Error />
      },
      {
        path: "budget/:id",
        // index: true,
        element: <BudgetPage />,
        loader: budgetLoader,
        action: budgetAction,
        errorElement: <Error />,

        // action: expensesAction,
        children: [
          {
            path: "delete",
            action: deleteBudget,

          }
        ]
     
      },
      {
        path: "expenses",
        // index: true,
        element: <ExpensesPage />,
        loader: expensesLoader,
        action: expensesAction,
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
    <ToastContainer />
  </div>;
}

export default App;