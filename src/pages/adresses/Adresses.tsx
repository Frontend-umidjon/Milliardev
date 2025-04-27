import { Empty, Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";

const Adresses = () => {
  const handleAddAddress = () => {
    // В будущем тут будет открытие модалки или переход на форму добавления
    console.log("Add Address clicked");
  };

  return (
    <div className="flex flex-col items-center justify-center h-[80vh] bg-gray-50 px-4">
      <Empty
        description={<span>Hozircha manzillar mavjud emas</span>}
        imageStyle={{ height: 100 }}
      />

      <Button
        type="primary"
        icon={<PlusOutlined />}
        size="large"
        onClick={handleAddAddress}
        className="mt-6 bg-blue-500 hover:bg-blue-600"
      >
        Yangi manzil qo'shish
      </Button>
    </div>
  );
};

export default Adresses;
