import { Route, Routes } from "react-router-dom"
import Login from "./login/Login"
import Auth from "./auth/Auth"
import Dashboard from "./dashboard/Dashboard"


const MainRouter = () => {
  return (
    <>
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Auth />} >
                <Route path="/" element={<Dashboard />} />
            </Route>
        </Routes>
    
    </>
  )
}

export default MainRouter