import { Route, Routes } from "react-router-dom";
import Login from "./login/Login";
import Auth from "./auth/Auth";
import Dashboard from "./dashboard/Dashboard";
import Projects from "./projects/Projects";
import Customers from "./customers/Customers";
import Layout from "./layout/Layout";

const MainRouter = () => {
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Auth />}>
          <Route path="/" element={<Dashboard />}>
            <Route path="/" element={<Layout />}>
            <Route path="/projects" element={<Projects />} />
            <Route path="/customers" element={<Customers />} />
            </Route>
          </Route>
        </Route>
      </Routes>
    </>
  );
};

export default MainRouter;
