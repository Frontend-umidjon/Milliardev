import { useState } from "react";
import { FaUsers } from "react-icons/fa";
import { FaBars, FaUsersGear } from "react-icons/fa6";
import { GrProjects } from "react-icons/gr";
import { NavLink, Outlet } from "react-router-dom";
import { useGetProfileQuery } from "../../redux/api/profile.api";
import { CiLocationOn } from "react-icons/ci";
import { RiServerFill } from "react-icons/ri";

const Dashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { data } = useGetProfileQuery({});
  
  const handleSidebarToggle = () => {
    setIsSidebarOpen((prev) => !prev);
  };
  
  const getNavLinkClasses = ({ isActive }: { isActive: boolean }) =>
    `flex items-center gap-3 px-4 py-3 rounded-lg text-base font-medium transition ${
      isActive
        ? "bg-gray-700 text-white"
        : "text-gray-300 hover:bg-gray-800 hover:text-white"
    }`;

  return (
    <div className="flex w-full h-screen bg-gray-100 overflow-hidden">
  
      <aside
        className={`fixed z-40 top-0 left-0 h-full bg-gray-900 px-6 py-6 flex flex-col justify-between transition-transform duration-300 w-[280px] 
        ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0 md:static md:w-[280px]`}
      >
       
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-3 mb-6">
            <img src="./m.png" alt="Logo" className="w-8 h-8 object-contain" />
            <span>Admin Panel</span>
          </h1>

          
          <nav className="flex flex-col gap-2.5 mt-[60px]">
            <NavLink to="projects" className={getNavLinkClasses}>
              <GrProjects /> Proyektlar
            </NavLink>
            <NavLink to="customers" className={getNavLinkClasses}>
              <FaUsers /> Mijozlar
            </NavLink>
            <NavLink to="adresses" className={getNavLinkClasses}>
              <CiLocationOn /> Manzillar
            </NavLink>
           {data?.user?.is_creator && (
              <NavLink to="admin-list" className={getNavLinkClasses}>
              <FaUsersGear /> Adminlar
            </NavLink>
           )}
           <NavLink to="services" className={getNavLinkClasses}>
              <RiServerFill /> Xizmatlar
            </NavLink>
          </nav>
        </div>

      
      
      </aside>

     
      <main className="flex-1  overflow-auto relative w-full">
        
        <button
          onClick={handleSidebarToggle}
          className="md:hidden absolute top-4 left-4 z-50 text-gray-700"
        >
          <FaBars size={24} />
        </button>

       
        <Outlet />
      </main>
    </div>
  );
};

export default Dashboard;