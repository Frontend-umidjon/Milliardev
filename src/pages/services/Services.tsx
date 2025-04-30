import { ChangeEvent, useState } from "react";
import { Button, Modal, Form, Input, Empty, Spin, message, Popconfirm } from "antd";
import { PlusOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import {
  useCreateServiceMutation,
  useDeleteServiceMutation,
  useGetServicesQuery,
  useUpdateServiceMutation,
} from "../../redux/api/services.api";

interface Service {
  _id: string;
  name: string;
  description: string;
  image: string;
}

interface ServiceFormValues {
  name: string;
  description: string;
  image: string;
}

const Services = () => {
  const { data, isLoading, refetch } = useGetServicesQuery();
  const [createService, { isLoading: isCreating }] = useCreateServiceMutation();
  const [updateService, { isLoading: isUpdating }] = useUpdateServiceMutation();
  const [deleteService] = useDeleteServiceMutation();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [form] = Form.useForm<ServiceFormValues>();
  const [previewImage, setPreviewImage] = useState<string>("");
  const [imageError, setImageError] = useState<boolean>(false);

  const handleOpenModal = (service: Service | null = null) => {
    setEditingService(service);
    setIsModalOpen(true);

    if (service) {
      form.setFieldsValue({
        name: service.name,
        description: service.description,
        image: service.image,
      });
      setPreviewImage(service.image);
      setImageError(false);
    } else {
      form.resetFields();
      setPreviewImage("");
      setImageError(false);
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    form.resetFields();
    setEditingService(null);
    setPreviewImage("");
    setImageError(false);
  };

  const handleFinish = async (values: ServiceFormValues) => {
    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("description", values.description);
    formData.append("image", values.image);

    try {
      if (editingService) {
        await updateService({ id: editingService._id, data: formData }).unwrap();
        message.success("Xizmat yangilandi!");
      } else {
        await createService(formData).unwrap();
        message.success("Yangi xizmat yaratildi!");
      }
      handleCancel();
      refetch();
    } catch {
      message.error("Xatolik yuz berdi!");
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteService(id).unwrap();
      message.success("Xizmat o'chirildi!");
      refetch();
    } catch {
      message.error("O'chirishda xatolik yuz berdi!");
    }
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const url = e.target.value;
    setPreviewImage(url);
    setImageError(false); // Новый URL — убираем старую ошибку
  };

  const validateImageUrl = (_: unknown, value: string) => {
    if (!value) {
      return Promise.reject(new Error("Iltimos, rasm URL kiriting"));
    }
    const isValid = /\.(jpeg|jpg|gif|png|webp)$/i.test(value);
    if (!isValid) {
      return Promise.reject(new Error("Faqat rasm URL manzili kiritish mumkin (jpg, png, gif, webp)"));
    }
    return Promise.resolve();
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Xizmatlar</h2>
        <Button type="primary" icon={<PlusOutlined />} onClick={() => handleOpenModal()}>
          Yangi xizmat qo'shish
        </Button>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center h-[60vh]">
          <Spin size="large" />
        </div>
      ) : data?.data.payload.length ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.data.payload.map((service: Service) => (
            <div key={service._id} className="bg-white p-4 rounded-xl shadow-md relative">
              <img
                src={service.image}
                alt={service.name}
                className="w-full h-40 object-cover rounded-md mb-4"
              />
              <h3 className="text-lg font-semibold">{service.name}</h3>
              <p className="text-gray-600 mt-2">{service.description}</p>

              <div className="flex gap-2 absolute top-4 right-4">
                <Button
                  icon={<EditOutlined />}
                  size="small"
                  onClick={() => handleOpenModal(service)}
                />
                <Popconfirm
                  title="Ishonchingiz komilmi?"
                  onConfirm={() => handleDelete(service._id)}
                  okText="Ha"
                  cancelText="Yo'q"
                >
                  <Button icon={<DeleteOutlined />} danger size="small" />
                </Popconfirm>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex justify-center items-center h-[60vh]">
          <Empty description="Hozircha xizmatlar mavjud emas" />
        </div>
      )}

      {/* Modal */}
      <Modal
        title={editingService ? "Xizmatni tahrirlash" : "Yangi xizmat qo'shish"}
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
      >
        <Form<ServiceFormValues> form={form} layout="vertical" onFinish={handleFinish}>
          <Form.Item
            name="name"
            label="Nomi"
            rules={[{ required: true, message: "Iltimos, nomini kiriting" }]}
          >
            <Input placeholder="Xizmat nomi" />
          </Form.Item>

          <Form.Item
            name="description"
            label="Tavsif"
            rules={[{ required: true, message: "Iltimos, tavsifni kiriting" }]}
          >
            <Input.TextArea placeholder="Xizmat tavsifi" rows={4} />
          </Form.Item>

          <Form.Item
            name="image"
            label="Rasm URL manzili"
            rules={[{ validator: validateImageUrl }]}
          >
            <Input
              placeholder="https://example.com/image.jpg"
              onChange={handleImageChange}
            />
          </Form.Item>

          {/* Превью картинки */}
          <div className="mb-4">
            {previewImage ? (
              <img
                src={previewImage}
                alt="Preview"
                onError={() => setImageError(true)}
                className="w-full h-40 object-cover rounded-md"
              />
            ) : (
              <div className="w-full h-40 flex items-center justify-center border rounded-md text-gray-400">
                Rasm preview
              </div>
            )}
            {imageError && (
              <div className="text-red-500 mt-2 text-center">
                Rasm yuklab bo'lmadi. Iltimos, URL-ni tekshiring.
              </div>
            )}
          </div>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              loading={isCreating || isUpdating}
              className="w-full bg-blue-500 hover:bg-blue-600"
            >
              {editingService ? "Yangilash" : "Yaratish"}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Services;
