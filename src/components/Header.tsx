import {  Dropdown, Menu, Typography, message } from "antd";
import { DownOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import { useGetProfileQuery } from "../redux/api/profile.api";

const Header = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to log out?")) {
      localStorage.removeItem("access_token");
      message.success("Logged out successfully");
      navigate("/login"); 
    }
  };
  const { data } = useGetProfileQuery({});
  const menu = (
    <Menu
      items={[
        {
          key: "1",
          label: <span>Profil</span>,
          onClick: () => navigate("/profile"), 
        },
        {
          key: "2",
          label: <span className="text-red-500">Chiqish</span>,
          onClick: handleLogout,
        },
      ]}
    />
  );

  return (
    <header className="flex justify-between items-center px-6 py-4 bg-white border-b border-gray-200">
      <div>
        <Typography.Title level={4} className="!mb-0">
          Assalomu alaykum {data?.user?.full_name}
        </Typography.Title>
        <Typography.Text type="secondary">
          Bu yerda loyihalarni qo'shish, o'zgartirish va o'chirish uchun foydalanishingiz mumkin.
          Admin panelga xush kelibsiz
        </Typography.Text>
      </div>

      <div className="flex items-center gap-3">
        <Dropdown overlay={menu} trigger={["click"]}>
          <div className="flex items-center gap-2 cursor-pointer">
            <FaUser className="text-gray-500" />
            <span className="font-medium text-gray-800">{data?.user?.full_name}</span>
            <DownOutlined className="text-gray-500 text-sm" />
          </div>
        </Dropdown>
      </div>
    </header>
  );
};

export default Header;
