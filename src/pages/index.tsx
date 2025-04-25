import { Route, Routes } from "react-router-dom";
import Login from "./login/Login";
import Auth from "./auth/Auth";
import Dashboard from "./dashboard/Dashboard";
import Projects from "./projects/Projects";
import Customers from "./customers/Customers";
import Layout from "./layout/Layout";
import Profile from "./profile/Profile";
import AdminList from "./adminList/AdminList";
import { useGetProfileQuery } from "../redux/api/profile.api";

const MainRouter = () => {
  const { data } = useGetProfileQuery({});
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Auth />}>
          <Route path="/" element={<Dashboard />}>
            <Route path="/" element={<Layout />}>
              <Route path="/projects" element={<Projects />} />
              <Route path="/customers" element={<Customers />} />
              {data?.user.is_creator && (
                <Route path="/admin-list" element={<AdminList />} />
              )}
            </Route>
            <Route path="/profile" element={<Profile  />} />
              <Route path="*" element={<div>404</div>} />
          </Route>
        </Route>
      </Routes>
    </>
  );
};

export default MainRouter;
