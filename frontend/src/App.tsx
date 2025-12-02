import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "./components/RootLayout";
import HomePage from "./pages/HomePage";
import AuthPage, { action as authAction } from "./pages/AuthPage";
import ErrorPage from "./pages/ErrorPage";
import { action as logoutAction } from "./pages/LogoutPage";
import { tokenLoader, checkAuthLoader } from "./util/auth";
import ConnectionsPage, { loader as connectionsLoader } from "./pages/ConnectionsPage";
import QueriesPage, { loader as queriesLoader } from "./pages/QueriesPage";
import SchedulesPage, { loader as schedulesLoader } from "./pages/SchedulesPage";
import NewConnectionPage, { action as createConnectionAction } from "./pages/NewConnectionPage";

const router = createBrowserRouter([
  {
    id: "root",
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    loader: tokenLoader,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "connections",
        loader: checkAuthLoader,
        children: [
          {
            index: true,
            element: <ConnectionsPage />,
            loader: connectionsLoader,
          },
          // {
          //   path: ":topicId",
          //   element: <TopicPage />,
          //   loader: topicLoader,
          //   action: sendMessageAction,
          // },
          {
            path: "new",
            element: <NewConnectionPage />,
            action: createConnectionAction,
          },
        ],
      },
      {
        path: "queries",
        element: <QueriesPage />,
        loader: queriesLoader,
      },
      {
        path: "schedules",
        element: <SchedulesPage />,
        loader: schedulesLoader,
      },
      {
        path: "auth",
        element: <AuthPage />,
        action: authAction,
      },
      {
        path: "logout",
        action: logoutAction,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
