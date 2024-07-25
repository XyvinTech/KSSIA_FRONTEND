import { createBrowserRouter } from "react-router-dom";
import DashboardPage from "../pages/Admin/DashboardPage";
import App from "../App";

import AdminLayout from "../layout/AdminLayout";
import MembersPage from "../pages/Admin/Members/MembersPage";
import MembersSinglepage from "../pages/Admin/Members/MembersSinglepage";
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
        path: "/app",
        element: <App />,
      },
]);

export default router;