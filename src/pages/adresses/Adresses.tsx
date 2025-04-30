import { useState } from "react";
import { Empty, Button, Modal, Input, Form, Spin, Card } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useCreateAddressMutation, useGetAddressesQuery } from "../../redux/api/adress.api";


const Addresses = () => {
  const { data: addresses, isLoading, isFetching } = useGetAddressesQuery();
  const [createAddress, { isLoading: isCreating }] = useCreateAddressMutation();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [form] = Form.useForm();

  const handleAddAddress = () => {
    setIsModalOpen(true);
  };

  const handleCreate = async () => {
    try {
      const values = await form.validateFields();
      await createAddress(values).unwrap();
      form.resetFields();
      setIsModalOpen(false);
    } catch (error) {
      console.error("Failed to create address:", error);
    }
  };

  if (isLoading || isFetching) {
    return (
      <div className="flex justify-center items-center h-[80vh]">
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Manzillar</h1>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={handleAddAddress}
          className="bg-blue-500 hover:bg-blue-600"
        >
          Yangi manzil qo'shish
        </Button>
      </div>

      {addresses && addresses.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {addresses.map((address) => (
            <Card key={address.id} title={address.name}>
              <p className="mb-2 text-gray-600">{address.description}</p>
              <p className="text-gray-800 font-semibold">{address.phone_number}</p>
              <p className="text-sm text-gray-500 mt-1">{address.latitude_altitude}</p>
            </Card>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center h-[60vh]">
          <Empty
            description={<span>Hozircha manzillar mavjud emas</span>}
            imageStyle={{ height: 100 }}
          />
        </div>
      )}

      <Modal
        title="Yangi manzil qo'shish"
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        onOk={handleCreate}
        confirmLoading={isCreating}
        okText="Qo'shish"
        cancelText="Bekor qilish"
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="name"
            label="Manzil nomi"
            rules={[{ required: true, message: "Iltimos, manzil nomini kiriting" }]}
          >
            <Input placeholder="Masalan: Tver ko'chasi" />
          </Form.Item>

          <Form.Item
            name="description"
            label="Tavsif"
            rules={[{ required: true, message: "Iltimos, tavsif kiriting" }]}
          >
            <Input placeholder="Masalan: Kreml yonida" />
          </Form.Item>

          <Form.Item
            name="phone_number"
            label="Telefon raqami"
            rules={[{ required: true, message: "Iltimos, telefon raqamini kiriting" }]}
          >
            <Input placeholder="+998901234567" />
          </Form.Item>

          <Form.Item
            name="latitude_altitude"
            label="Koordinatalar (lat, long)"
            rules={[{ required: true, message: "Iltimos, koordinatalarni kiriting" }]}
          >
            <Input placeholder="55.7558, 37.6173" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Addresses;
