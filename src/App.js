import "./index.css";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import EmployeeProfile from "./components/master-settings/EmployeeProfile";
import BlogAdd from "./components/master-settings/BlogAdd.jsx";
import BlogView from "./components/master-settings/BlogView";
import BlogUpdate from "./components/master-settings/BlogUpdate";
import SecureRoutes from "./components/SecureRoutes";
import Error from "./components/Error";
import LPSettings from "./components/settings/LPSettings";
import BmpReviewsView from "./components/master-settings/bmp/BmpReviewsView.jsx";
import BmpReviewsUpdate from "./components/master-settings/bmp/BmpReviewsUpdate.jsx";
import AddTournament from "./components/master-settings/tournament/AddTournament.jsx";
import ViewTournament from "./components/master-settings/tournament/ViewTournament.jsx";
import UpdateTournament from "./components/master-settings/tournament/UpdateTournament.jsx";
import Opening from "./components/Opening.jsx";
import BmpAdmin from "./components/BmpAdmin.jsx";
const router = createBrowserRouter([
  {
    path: "/:source/:id",
    element: <Opening/>,
    errorElement:<Error/>,
  },
  {
path: "/bmp",
element: <BmpAdmin/>,
errorElement: <Error />,
  },
  {
path: "/bmp/settings",
element: <LPSettings/>,
errorElement: <Error/>,
children: [
  {
    path: "/bmp/settings",
    element: <Navigate to="/bmp/settings/employeeProfile" replace/>,
  },
  {
    path: "/bmp/settings/employeeProfile",
    element: <SecureRoutes Component= {EmployeeProfile}/>,
  },
  {
    path: "/bmp/settings/blog/add",
    element: <SecureRoutes Component={BlogAdd} />,
  },
  {
    path: "/bmp/settings/blog/view",
    element: <SecureRoutes Component={BlogView} />,
  },
  {
    path: "/bmp/settings/blog/view/:id",
    element: <BlogUpdate />,
  },
  {
    path: "/bmp/settings/tournament/add",
    element: <SecureRoutes Component={AddTournament}/>,
  },
  {
    path: "/bmp/settings/tournament/view",
    element: <SecureRoutes Component={ViewTournament}/>,
  },
  {
    path: "/bmp/settings/blog/tournament/:id",
    element: <UpdateTournament />,
  },

  {
    path: "/bmp/settings/review/view",
    element: <SecureRoutes Component={BmpReviewsView} />,
  },
  {
    path: "/bmp/settings/review/view/:id",
    element: <BmpReviewsUpdate />,
  },
]
  },
  ]);
function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
