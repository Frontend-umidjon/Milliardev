import { useGetAdminsQuery, useDeleteAdminMutation } from "../../redux/api/admin.api";
import {
  FaUserShield,
  FaEnvelope,
  FaPhoneAlt,
  FaCalendarAlt,
} from "react-icons/fa";
import { Card, Spin, Tag, Button, Modal, Form, Input, message } from "antd";
import { useState } from "react";

const AdminList = () => {
  const { data, isLoading } = useGetAdminsQuery({});
  const [deleteAdmin] = useDeleteAdminMutation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingAdmin, setEditingAdmin] = useState<any>(null);

  const handleDelete = async (adminId: string) => {
    try {
      await deleteAdmin(adminId);
      message.success("Admin o'chirildi!");
    } catch (error) {
      message.error("Adminni o'chirishda xato yuz berdi.");
    }
  };

  const handleEdit = (admin: any) => {
    setEditingAdmin(admin);
    setIsModalOpen(true);
  };

  const handleCreate = () => {
    setEditingAdmin(null);
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setEditingAdmin(null);
  };

  const onFinish = (values: any) => {
    // Perform create or update logic here
    if (editingAdmin) {
      // Call update API
      message.success("Admin ma'lumotlari yangilandi!");
    } else {
      // Call create API
      message.success("Yangi admin yaratildi!");
    }
    setIsModalOpen(false);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-40">
        <Spin tip="Adminlar yuklanmoqda..." size="large" />
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-semibold text-gray-800 mb-6">Adminlar ro'yxati</h1>

      <div className="flex justify-between mb-4">
        <Button type="primary" onClick={handleCreate}>
          Yangi Admin Yaratish
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {data?.data?.payload?.map((admin) => (
          <Card
            key={admin._id}
            className="bg-gray-900 text-gray-200 shadow-lg rounded-xl border border-gray-800"
            hoverable
          >
            <h2 className="text-lg font-semibold flex items-center gap-2 mb-2">
              <FaUserShield className="text-blue-400" /> {admin.full_name}
            </h2>
            <p className="flex items-center gap-2 text-sm">
              <FaEnvelope className="text-gray-400" /> {admin.email}
            </p>
            <p className="flex items-center gap-2 text-sm mt-1">
              <FaPhoneAlt className="text-gray-400" /> {admin.phone_number}
            </p>
            <p className="flex items-center gap-2 text-sm mt-1">
              <FaCalendarAlt className="text-gray-400" />{" "}
              {new Date(admin.createdAt).toLocaleDateString()}
            </p>

            <div className="flex gap-2 mt-4">
              <Tag color={admin.is_active ? "green" : "red"}>
                {admin.is_active ? "Faol" : "Faol emas"}
              </Tag>
              <Tag color={admin.is_creator ? "geekblue" : "default"}>
                {admin.is_creator ? "Yaratuvchi" : "Oddiy admin"}
              </Tag>
            </div>

            <div className="flex gap-2 mt-4">
              <Button type="link" onClick={() => handleEdit(admin)}>
                Tahrirlash
              </Button>
              <Button type="link" danger onClick={() => handleDelete(admin._id)}>
                O'chirish
              </Button>
            </div>
          </Card>
        ))}
      </div>

      {/* Modal for Create/Update Admin */}
      <Modal
        title={editingAdmin ? "Adminni tahrirlash" : "Yangi admin yaratish"}
        visible={isModalOpen}
        onCancel={handleCancel}
        footer={null}
      >
        <Form
          initialValues={editingAdmin ? { ...editingAdmin } : {}}
          onFinish={onFinish}
        >
          <Form.Item
            label="To'liq ism"
            name="full_name"
            rules={[{ required: true, message: "Iltimos, to'liq ismingizni kiriting!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: "Iltimos, email manzilingizni kiriting!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Telefon raqam"
            name="phone_number"
            rules={[{ required: true, message: "Iltimos, telefon raqamingizni kiriting!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item className="mt-4">
            <Button type="primary" htmlType="submit">
              {editingAdmin ? "Yangilash" : "Yaratish"}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default AdminList;
