import { createBrowserRouter } from "react-router-dom";
import DashboardPage from "../pages/Admin/DashboardPage";
import App from "../App";

import AdminLayout from "../layout/AdminLayout";
import MembersPage from "../pages/Admin/Members/MembersPage";
import MembersSinglepage from "../pages/Admin/Members/MembersSinglepage";
import AddnewMemberSinglepage from "../pages/Admin/Members/AddnewMemberSinglepage.jsx";
import ProductsPage from "../pages/Admin/Products/ProductsPage";
import AddProductSinglepage from "../pages/Admin/Products/AddProductSinglepage.jsx";
import EventHistorypage from "../pages/Admin/Eventss/Eventhistory/EventHistorypage";
import EventNewListpage from "../pages/Admin/Eventss/Eventlist/EventNewListpage";
import EditEventpage from "../pages/Admin/Eventss/Eventlist/EditEventpage.jsx";
import PaymentPage from "../pages/Admin/Payments/PaymentPage.jsx";
import AddpaymentsinglePage from "../pages/Admin/Payments/AddpaymentsinglePage.jsx";
import ApprovalPage from "../pages/Admin/Approvals/ApprovalPage.jsx";
import Promotionpage from "../pages/Admin/Promotions/Promotionpage.jsx";
import CreatepromotionSinglepage from "../pages/Admin/Promotions/CreatepromotionSinglepage.jsx";
import Notificationpage from "../pages/Admin/Notificationss/Notificationpage.jsx";
import Newspage from "../pages/Admin/NewsandUpdates/NewsPage.jsx";
import SettingsPage from "../pages/Admin/Settingss/SettingsPage.jsx";
import AddnewadminSinglepage from "../pages/Admin/Settingss/AddnewadminSinglepage.jsx";
import AddnewroleSinglepage from "../pages/Admin/Settingss/AddnewroleSinglepage.jsx";
import LogoutPage from "../pages/Admin/Logout/LogoutPage.jsx";
import SignIn from "../pages/Admin/Signin/SignIn.jsx";
import NewsAddnewform from "../components/NewsAddnewform.jsx";
import EditNews from "../pages/Admin/NewsandUpdates/EditNews.jsx";
import EventSingleView from "../pages/Admin/Eventss/Eventlist/EventSingleView.jsx";
import EditPromotion from "../pages/Admin/Promotions/EditPromotion.jsx";
import { PrivateRoute } from "./privateRouter.jsx";
import Report from "../pages/Report.jsx";
import QRHtmlPage from "../pages/QRHtmlpage.jsx";
import AddRequirementPage from "../pages/Admin/Members/AddRequirementPage.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <SignIn />,
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <AdminLayout>
          <DashboardPage />
        </AdminLayout>
      </PrivateRoute>
    ),
  },
  {
    path: "/members",
    element: (
      <PrivateRoute>
        <AdminLayout>
          <MembersPage />
        </AdminLayout>
      </PrivateRoute>
    ),
  },
  {
    path: "/members/member/:id",
    element: (
      <PrivateRoute>
        <AdminLayout>
          <MembersSinglepage />
        </AdminLayout>
      </PrivateRoute>
    ),
  },
  {
    path: "/members/addmember",
    element: (
      <PrivateRoute>
        <AdminLayout>
          <AddnewMemberSinglepage />
        </AdminLayout>
      </PrivateRoute>
    ),
  },
  {
    path: "/products",
    element: (
      <PrivateRoute>
        <AdminLayout>
          <ProductsPage />
        </AdminLayout>
      </PrivateRoute>
    ),
  },
  {
    path: "/products/addproduct",
    element: (
      <PrivateRoute>
        <AdminLayout>
          <AddProductSinglepage />
        </AdminLayout>
      </PrivateRoute>
    ),
  },
  {
    path: "/requirement/addrequirement",
    element: (
      <PrivateRoute>
        <AdminLayout>
          <AddRequirementPage />
        </AdminLayout>
      </PrivateRoute>
    ),
  },
  {
    path: "/events/eventhistory",
    element: (
      <PrivateRoute>
        <AdminLayout>
          <EventHistorypage />
        </AdminLayout>
      </PrivateRoute>
    ),
  },
  {
    path: "/events/eventlist",
    element: (
      <PrivateRoute>
        <AdminLayout>
          <EventNewListpage />
        </AdminLayout>
      </PrivateRoute>
    ),
  },
  {
    path: "/events/:id",
    element: (
      <PrivateRoute>
        <AdminLayout>
          <EventSingleView />
        </AdminLayout>
      </PrivateRoute>
    ),
  },
  {
    path: "/events/eventlist/:id",
    element: (
      <PrivateRoute>
        <AdminLayout>
          <EditEventpage />
        </AdminLayout>
      </PrivateRoute>
    ),
  },
  {
    path: "/payments",
    element: (
      <PrivateRoute>
        <AdminLayout>
          <PaymentPage />
        </AdminLayout>
      </PrivateRoute>
    ),
  },
  {
    path: "/payments/addpaymentdetails",
    element: (
      <PrivateRoute>
        <AdminLayout>
          <AddpaymentsinglePage />
        </AdminLayout>
      </PrivateRoute>
    ),
  },
  {
    path: "/approvals",
    element: (
      <PrivateRoute>
        <AdminLayout>
          <ApprovalPage />
        </AdminLayout>
      </PrivateRoute>
    ),
  },
  {
    path: "/promotions",
    element: (
      <PrivateRoute>
        <AdminLayout>
          <Promotionpage />
        </AdminLayout>
      </PrivateRoute>
    ),
  },
  {
    path: "/promotions/createpromotion",
    element: (
      <PrivateRoute>
        <AdminLayout>
          <CreatepromotionSinglepage />
        </AdminLayout>
      </PrivateRoute>
    ),
  },
  {
    path: "/promotion/edit/:id",
    element: (
      <PrivateRoute>
        <AdminLayout>
          <EditPromotion />
        </AdminLayout>
      </PrivateRoute>
    ),
  },
  {
    path: "/Notifications",
    element: (
      <PrivateRoute>
        <AdminLayout>
          <Notificationpage />
        </AdminLayout>
      </PrivateRoute>
    ),
  },
  {
    path: "/News",
    element: (
      <PrivateRoute>
        <AdminLayout>
          <Newspage />
        </AdminLayout>
      </PrivateRoute>
    ),
  },
  {
    path: "/news/edit/:id",
    element: (
      <PrivateRoute>
        <AdminLayout>
          <EditNews />
        </AdminLayout>
      </PrivateRoute>
    ),
  },
  {
    path: "/settings",
    element: (
      <PrivateRoute>
        <AdminLayout>
          <SettingsPage />
        </AdminLayout>
      </PrivateRoute>
    ),
  },
  {
    path: "/settings/addnewadmin",
    element: (
      <PrivateRoute>
        <AdminLayout>
          <AddnewadminSinglepage />
        </AdminLayout>
      </PrivateRoute>
    ),
  },
  {
    path: "/settings/addrole",
    element: (
      <PrivateRoute>
        <AdminLayout>
          <AddnewroleSinglepage />
        </AdminLayout>
      </PrivateRoute>
    ),
  },
  {
    path: "/reports",
    element: (
      <PrivateRoute>
        <AdminLayout>
          <Report />
        </AdminLayout>
      </PrivateRoute>
    ),
  },
  {
    path: "/Logout",
    element: (
      <PrivateRoute>
        <AdminLayout>
          <LogoutPage />
        </AdminLayout>
      </PrivateRoute>
    ),
  },

  {
    path: "/user/:id",
    element: <QRHtmlPage />,
  },
]);

export default router;
