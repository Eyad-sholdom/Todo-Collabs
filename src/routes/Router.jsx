import ROUTES from "./routesModel";
import { Route, Routes } from "react-router-dom";
import Login from "../pages/Login";
import Layout from "../layout/Layout";
import DashboardMain from "../pages/DashboardMain";
import Signup from "../pages/Signup";

import GroupDetails from "../components/Group/GroupDetails";
import UserProfile from "../pages/user-profile/UserProfile";
import Error404 from "../pages/Error404";
import Faq from "../pages/Faq";
import Home from "../pages/Home";
import MemberProfile from "../pages/user-profile/MemberProfile";
import About from "../pages/About";
const Router = () => {
  return (
    <Routes>
      <Route path={ROUTES.ROOT} element={<Layout />}>
        <Route path={ROUTES.DASHBOARD} element={<DashboardMain />} />
        <Route path={ROUTES.ABOUT} element={<About />} />
        <Route path={ROUTES.LOGIN} element={<Login />} />
        <Route path={ROUTES.FAQ} element={<Faq />} />
        <Route path={ROUTES.SIGNUP} element={<Signup />} />
        <Route path={ROUTES.USER_PROFILE} element={<UserProfile />} />
        <Route path={ROUTES.USER} element={<MemberProfile />} />
        <Route path={ROUTES.GROUP_DETAILS} element={<GroupDetails />} />
        <Route path={ROUTES.HOME} element={<Home />} />
        <Route path="*" element={<Error404 />} />
      </Route>
    </Routes>
  );
};

export default Router;
