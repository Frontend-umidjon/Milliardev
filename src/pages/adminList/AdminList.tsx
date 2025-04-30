import {
  useGetAdminsQuery,
  useDeleteAdminMutation,
  useCreateAdminMutation,
  useUpdateAdminMutation,
} from "../../redux/api/admin.api";
import {
  FaUserShield,
  FaEnvelope,
  FaPhoneAlt,
  FaCalendarAlt,
} from "react-icons/fa";
import {
  Card,
  Spin,
  Tag,
  Button,
  Modal,
  Form,
  Input,
  message,
  Switch,
  Popconfirm,
} from "antd";
import { useState } from "react";
import { useGetProfileQuery } from "../../redux/api/profile.api";
import { Admin, AdminFormValues } from "../../types";

const AdminList = () => {
  const { data, isLoading, refetch } = useGetAdminsQuery();
  const [deleteAdmin] = useDeleteAdminMutation();
  const [createAdmin] = useCreateAdminMutation();
  const [updateAdmin] = useUpdateAdminMutation();
  const { data: profileData } = useGetProfileQuery({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingAdmin, setEditingAdmin] = useState<Admin | null>(null);
  const [form] = Form.useForm();
  const [submitting, setSubmitting] = useState(false);

  const handleDelete = async (adminId: string) => {
    try {
      await deleteAdmin(adminId).unwrap();
      message.success("Admin o'chirildi!");
      refetch();
    } catch {
      message.error("Adminni o'chirishda xatolik yuz berdi.");
    }
  };

  const handleEdit = (admin: Admin) => {
    setEditingAdmin(admin);
    form.setFieldsValue({
      full_name: admin.full_name,
      email: admin.email,
      phone_number: admin.phone_number,
      is_active: admin.is_active,
      is_creator: admin.is_creator,
    });
    setIsModalOpen(true);
  };

  const handleCreate = () => {
    setEditingAdmin(null);
    form.resetFields();
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setEditingAdmin(null);
    form.resetFields();
  };

  const onFinish = async (values: AdminFormValues) => {
    setSubmitting(true);
    try {
      if (editingAdmin) {
        const { password, ...rest } = values;
        const updateValues = password ? { ...rest, password } : rest;

        await updateAdmin({
          id: editingAdmin._id,
          data: updateValues,
        }).unwrap();
        message.success("Admin ma'lumotlari yangilandi!");
      } else {
        await createAdmin(values).unwrap();
        message.success("Yangi admin yaratildi!");
      }
      setIsModalOpen(false);
      refetch();
    } catch (error) {
      console.error(error);
      message.error("Ma'lumotlarni saqlashda xatolik yuz berdi.");
    } finally {
      setSubmitting(false);
    }
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
      <h1 className="text-2xl font-semibold text-gray-800 mb-6">
        Adminlar ro'yxati
      </h1>

      <div className="flex justify-between mb-4">
        <Button type="primary" onClick={handleCreate}>
          Yangi Admin Yaratish
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {data?.data?.payload?.map((admin: Admin) => (
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
                {admin.is_active ? "Ishlamoqda" : "Isdan bo'shatilgan"}
              </Tag>
              <Tag color={admin.is_creator ? "geekblue" : "default"}>
                {admin.is_creator ? "Yaratuvchi" : "Oddiy admin"}
              </Tag>
            </div>

            <div className="flex gap-2 mt-4">
              <Button type="link" onClick={() => handleEdit(admin)}>
                Tahrirlash
              </Button>
              <Popconfirm
                title="Rostdan ham bu adminni ishdan olmoqchimisiz?"
                onConfirm={() => handleDelete(admin._id)}
                okText="Ha"
                cancelText="Yo'q"
              >
                <Button type="link" danger>
                  Ishdan olish
                </Button>
              </Popconfirm>
            </div>
          </Card>
        ))}
      </div>

      <Modal
        title={editingAdmin ? "Adminni tahrirlash" : "Yangi admin yaratish"}
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
      >
        <Form form={form} onFinish={onFinish}>
          <Form.Item
            label="To'liq ism"
            name="full_name"
            rules={[
              {
                required: true,
                message: "Iltimos, to'liq ismingizni kiriting!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                required: true,
                message: "Iltimos, email manzilingizni kiriting!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Telefon raqam"
            name="phone_number"
            rules={[
              {
                required: true,
                message: "Iltimos, telefon raqamingizni kiriting!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Parol"
            name="password"
            rules={[
              {
                validator: (_, value) => {
                  if (!value && editingAdmin) return Promise.resolve();
                  if (value && value.length < 6)
                    return Promise.reject(
                      new Error("Parol kamida 6 ta belgidan iborat bo'lishi kerak!")
                    );
                  if (!editingAdmin && !value)
                    return Promise.reject(new Error("Parol majburiy!"));
                  return Promise.resolve();
                },
              },
            ]}
          >
            <Input.Password placeholder={editingAdmin ? "Yangi parol (ixtiyoriy)" : ""} />
          </Form.Item>

          <Form.Item
            label="Ishlamoqda"
            name="is_active"
            valuePropName="checked"
          >
            <Switch />
          </Form.Item>

          {profileData?.user?.is_creator && (
            <Form.Item
              label="Yaratuvchi"
              name="is_creator"
              valuePropName="checked"
            >
              <Switch />
            </Form.Item>
          )}

          <Form.Item className="mt-4">
            <Button type="primary" htmlType="submit" block loading={submitting}>
              {editingAdmin ? "Yangilash" : "Yaratish"}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default AdminList;
