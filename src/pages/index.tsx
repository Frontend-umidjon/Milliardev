import { Route, Routes } from "react-router-dom"
import Login from "./login/Login"
import Auth from "./auth/Auth"
import Dashboard from "./dashboard/Dashboard"
import Projects from "./projects/Projects"


const MainRouter = () => {
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Auth />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/projects" element={<Projects />} />
        </Route>
      </Routes>
    </>
  );
}

export default MainRouter