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
import AddPaymentdetails from "../components/AddPaymentdetails.jsx";
import AddpaymentsinglePage from "../pages/Admin/Payments/AddpaymentsinglePage.jsx";





const router = createBrowserRouter([
    {
      path: "/",
      element: (
       <AdminLayout>
        <DashboardPage />
       </AdminLayout>
      ),
    },
    {
        path: "/members",
        element: (
         <AdminLayout>
          <MembersPage/>
         </AdminLayout>
        ),
    },
    {
      path: "/members/member/:id",
      element: (
       <AdminLayout>
        <MembersSinglepage/>
       </AdminLayout>
      ),
    },
    {
      path: "/members/addmember",
      element: (
       <AdminLayout>
        <AddnewMemberSinglepage/>
       </AdminLayout>
      ),
    },
    {
      path: "/products",
      element: (
       <AdminLayout>
        <ProductsPage/>
       </AdminLayout>
      ),
    },
    {
      path: "/products/addproduct",
      element: (
       <AdminLayout>
        <AddProductSinglepage/>
       </AdminLayout>
      ),
    },
    {
      path: "/events/eventhistory",
      element: (
       <AdminLayout>
        <EventHistorypage/>
       </AdminLayout>
      ),
    },
    {
      path: "/events/eventlist",
      element: (
       <AdminLayout>
        <EventNewListpage/>
       </AdminLayout>
      ),
    },
    {
      path: "/events/eventlist/:id", 
      element: (
       <AdminLayout>
        <EditEventpage/>
       </AdminLayout>
      ),
    },
    {
      path: "/payments", 
      element: (
       <AdminLayout>
        <PaymentPage/>
       </AdminLayout>
      ),
    },
    {
      path: "/payments/addpaymentdetails", 
      element: (
       <AdminLayout>
        <AddpaymentsinglePage/>
       </AdminLayout>
      ),
    },
    
    


    {
        path: "/app",
        element: <App />,
      },
]);

export default router;