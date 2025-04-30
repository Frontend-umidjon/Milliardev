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
import Adresses from "./adresses/Adresses";
import NotFound from "./NotFound/NotFound";
import Services from "./services/Services";

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
              <Route path="/adresses" element={<Adresses />} />
              {data?.user.is_creator && (
                <Route path="/admin-list" element={<AdminList />} />
              )}
              <Route path="/services" element={<Services />} />
            </Route>
            <Route path="/profile" element={<Profile  />} />
              <Route path="*" element={<NotFound />} />
          </Route>
        </Route>
      </Routes>
    </>
  );
};

export default MainRouter;
