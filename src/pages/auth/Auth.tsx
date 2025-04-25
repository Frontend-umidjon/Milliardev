import { Navigate, Outlet } from "react-router-dom"


const Auth = () => {
    const token = localStorage.getItem('access_token')
  
  return token ? <Outlet/> : <Navigate to="/login" />
    
    
    
  
}

export default Auth