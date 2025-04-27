import {
  useDeleteCustomerMutation,
  useGetCustomersQuery,
  useUpdateCustomerMutation,
} from "../../redux/api/customers.api";
import {
  Collapse,
  Tag,
  Button,
  Popconfirm,
  Modal,
  Form,
  Input,
  message,
  Select,
  Switch,
  Spin,
  Segmented,
} from "antd";
import { useState, useEffect } from "react";
import {
  FaPhoneAlt,
  FaTelegramPlane,
  FaLanguage,
  FaUserEdit,
  FaTrashAlt,
  FaUserCircle,
  FaEnvelope,
  FaCalendarAlt,
} from "react-icons/fa";
import { CustomerType } from "../../types"; // Импорт типов

const Customers = () => {
  const [filter, setFilter] = useState<"all" | "true" | "false">("all");

  // Передаем фильтр в запрос с правильным значением
  const { data, isLoading, refetch } = useGetCustomersQuery(
    filter === "all" ? {} : { is_active: filter === "true" }
  );

  const [deleteCustomer] = useDeleteCustomerMutation();
  const [updateCustomer] = useUpdateCustomerMutation();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCustomer, setEditingCustomer] = useState<CustomerType | null>(null); 
  const [form] = Form.useForm();

  const handleDelete = async (id: string) => {
    try {
      await deleteCustomer(id).unwrap();
      message.success("Mijoz o'chirildi");
      refetch();
    } catch {
      message.error("Xatolik yuz berdi");
    }
  };

  const handleEdit = (customer: CustomerType) => { 
    setEditingCustomer(customer);
    setIsModalOpen(true);
  };

  useEffect(() => {
    if (editingCustomer) {
      form.setFieldsValue(editingCustomer);
    }
  }, [editingCustomer, form]);

  const handleUpdate = async () => {
    try {
      const values = await form.validateFields();
      const payload = {
        id: editingCustomer!._id,
        data: values,
      };
      await updateCustomer(payload).unwrap();
      message.success("Mijoz yangilandi");

      if (editingCustomer && values.is_active !== editingCustomer.is_active) {
        setFilter(values.is_active ? "true" : "false");
      }

      setIsModalOpen(false);
      refetch();
    } catch {
      message.error("Xatolik yuz berdi");
    }
  };

  const { Panel } = Collapse;

  const CustomerPanel = ({ customer }: { customer: CustomerType }) => ( 
    <Collapse
      className="border border-gray-200 rounded-lg mb-4 bg-white"
      expandIconPosition="start"
      ghost
    >
      <Panel
        header={
          <span className="flex items-center gap-2 font-medium text-gray-800">
            <FaUserCircle /> {customer.first_name} {customer.last_name}
          </span>
        }
        key={customer._id}
      >
        <div className="space-y-2 text-sm text-gray-700">
          <p>
            <FaPhoneAlt className="inline mr-2 text-gray-500" />
            <strong>Telefon:</strong> {customer.phone_number}
          </p>
          <p>
            <FaEnvelope className="inline mr-2 text-gray-500" />
            <strong>Email:</strong> {customer.email}
          </p>
          <p>
            <FaTelegramPlane className="inline mr-2 text-gray-500" />
            <strong>Telegram ID:</strong> {customer.tg_id}
          </p>
          <p>
            <FaLanguage className="inline mr-2 text-gray-500" />
            <strong>Til:</strong>{" "}
            <Tag color={customer.lang === "ru" ? "geekblue" : "green"}>
              {customer.lang.toUpperCase()}
            </Tag>
          </p>
          <p>
            <strong>Holati:</strong>{" "}
            <Tag color={customer.is_active ? "green" : "red"}>
              {customer.is_active ? "Faol" : "Faol emas"}
            </Tag>
          </p>
          <p>
            <FaCalendarAlt className="inline mr-2 text-gray-500" />
            <strong>Ro’yxatdan:</strong>{" "}
            {new Date(customer.createdAt).toLocaleDateString()}
          </p>
        </div>

        <div className="flex flex-wrap gap-2 mt-4">
          <Button icon={<FaUserEdit />} onClick={() => handleEdit(customer)}>
            Tahrirlash
          </Button>
          <Popconfirm
            title="Rostdan ham o'chirmoqchimisiz?"
            onConfirm={() => handleDelete(customer._id)}
            okText="Ha"
            cancelText="Yo'q"
          >
            <Button icon={<FaTrashAlt />} danger>
              O'chirish
            </Button>
          </Popconfirm>
        </div>
      </Panel>
    </Collapse>
  );

  return (
    <div className="h-full px-6 py-6 bg-gray-100">
      <h1 className="text-2xl font-semibold mb-5 text-gray-800">Mijozlar</h1>

      <Segmented
        options={[
          { label: "Barchasi", value: "all" },
          { label: "Faol emas", value: "false" },
          { label: "Faol", value: "true" },
        ]}
        value={filter}
        onChange={(val) => setFilter(val as "all" | "true" | "false")}
        className="mb-6 border border-gray-300"
        block
      />

      {isLoading ? (
        <div className="flex justify-center items-center h-40">
          <Spin size="large" tip="Mijozlar yuklanmoqda..." />
        </div>
      ) : data?.data?.payload?.length === 0 ? (
        <div className="flex justify-center items-center h-40 text-gray-500">
          <span>Hozircha mijozlar mavjud emas</span>
        </div>
      ) : (
        <div>
          {data?.data?.payload
            .sort((a: CustomerType, b: CustomerType) => Number(b.is_active) - Number(a.is_active)) // Сортировка: активные вверх
            .map((customer: CustomerType) => (
              <CustomerPanel key={customer._id} customer={customer} />
            ))}
        </div>
      )}

      <Modal
        title="Mijozni tahrirlash"
        open={isModalOpen}
        onOk={handleUpdate}
        onCancel={() => setIsModalOpen(false)}
        okText="Saqlash"
        cancelText="Bekor qilish"
      >
        <Form layout="vertical" form={form}>
          <Form.Item label="Ism" name="first_name" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item label="Familiya" name="last_name" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item label="Telefon" name="phone_number" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item label="Email" name="email">
            <Input />
          </Form.Item>
          <Form.Item label="Telegram ID" name="tg_id" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item label="Til" name="lang" rules={[{ required: true }]}>
            <Select>
              <Select.Option value="ru">Rus</Select.Option>
              <Select.Option value="uz">O'zbek</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item label="Faollik" name="is_active" valuePropName="checked">
            <Switch />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Customers;
