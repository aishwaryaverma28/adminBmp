import "./index.css";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import BlogAdd from "./components/master-settings/BlogAdd.jsx";
import BlogView from "./components/master-settings/BlogView";
import BlogUpdate from "./components/master-settings/BlogUpdate";
import SecureRoutes from "./components/SecureRoutes";
import Error from "./components/Error.jsx";
import LPSettings from "./components/settings/LPSettings";
import BmpReviewsView from "./components/master-settings/bmp/BmpReviewsView.jsx";
import BmpReviewsUpdate from "./components/master-settings/bmp/BmpReviewsUpdate.jsx";
import AddTournament from "./components/master-settings/tournament/AddTournament.jsx";
import ViewTournament from "./components/master-settings/tournament/ViewTournament.jsx";
import UpdateTournament from "./components/master-settings/tournament/UpdateTournament.jsx";
import Opening from "./components/Opening.jsx";
import BmpPanel from "./components/BmpPanel.jsx";
import BmpDashboard from "./components/bookmyplayer/BmpDashboard.jsx";
import BmpOverview from "./components/bookmyplayer/BmpOverview.jsx";
import OverviewById from "./components/bookmyplayer/OverviewById.jsx";
import FeesNBatches from "./components/bookmyplayer/FeesNBatches";
import TraningNStrategy from "./components/bookmyplayer/TraningNStrategy";
import Gallery from "./components/bookmyplayer/Gallery.jsx"
import Review from "./components/bookmyplayer/Review.jsx";
import Approval from "./components/bookmyplayer/Approval";
import BMPLeads from "./components/bookmyplayer/BMPLeads";
import SupportTab from "./components/settings/SupportTab";
import BmpAdmin from "./components/bookmyplayer/BmpAdmin.jsx"
const router = createBrowserRouter([
  {
    path: "/:source/:id",
    element: <Opening />,
    errorElement: <Error />,
  },
  {
    path: "/bmp",
    element: <BmpPanel />,
    errorElement: <Error />,
    children: [
      {
        path: "/bmp/admin",
        element: <BmpAdmin />,
      },
      {
        path: "/bmp/academy",
        element: <BmpDashboard />,
        errorElement: <Error />,
        children: [
          {
            path: "/bmp/academy",
            element: <Navigate to="/bmp/academy/overview" replace />,
          },
          {
            path:"/bmp/academy/overview",
            element:<SecureRoutes Component={BmpOverview}/>,
          },
          {
            path: "/bmp/academy/overview/:id",
            element: <OverviewById/>,
          },
          {
            path:"/bmp/academy/fees",
            element:<SecureRoutes Component={FeesNBatches}/>,
          },
          {
            path:"/bmp/academy/training",
            element:<SecureRoutes Component={TraningNStrategy}/>,
          },
          {
            path:"/bmp/academy/gallery",
            element:<SecureRoutes Component={Gallery}/>,
          },
          {
            path:"/bmp/academy/reviews",
            element:<SecureRoutes Component={Review}/>,
          },
          {
            path:"/bmp/academy/approval",
            element:<Approval/>,
          },
          {
            path:"/bmp/academy/leads",
            element:<SecureRoutes Component={BMPLeads}/>,
          },
          {
            path:"/bmp/academy/support",
            element: (
              <div style={{ padding: '1rem' }}>
                <SecureRoutes Component={SupportTab} />
              </div>
            ),
          },
        ],
      },
      {
        path: "/bmp/settings",
        element: <LPSettings />,
        errorElement: <Error />,
        children: [
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
            element: <SecureRoutes Component={AddTournament} />,
          },
          {
            path: "/bmp/settings/tournament/view",
            element: <SecureRoutes Component={ViewTournament} />,
          },
          {
            path: "/bmp/settings/tournament/view/:id",
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
        ],
      },
    ],
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
