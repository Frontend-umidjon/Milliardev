import { Button } from "antd";
import { useNavigate } from "react-router-dom";
import { FrownOutlined } from "@ant-design/icons";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 text-center px-4">
      <FrownOutlined className="text-[100px] text-blue-500 mb-4" />

      <h1 className="text-4xl font-bold text-gray-800 mb-2">404 - Sahifa Topilmadi</h1>
      <p className="text-gray-600 mb-6">
        Kechirasiz, siz qidirgan sahifa mavjud emas yoki o'chirib yuborilgan.
      </p>

      <Button
        type="primary"
        size="large"
        onClick={() => navigate("/projects")}
        className="bg-blue-500 hover:bg-blue-600"
      >
        Bosh sahifaga qaytish
      </Button>
    </div>
  );
};

export default NotFound;
