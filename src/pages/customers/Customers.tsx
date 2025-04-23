import {
    useDeleteCustomerMutation,
    useGetCustomersQuery,
    useUpdateCustomerMutation,
  } from "../../redux/api/customers.api";
  import {
    Table,
    Spin,
    Tag,
    Modal,
    Form,
    Input,
    Button,
    Popconfirm,
    message,
    Select,
    Switch,
  } from "antd";
  import { useEffect, useState } from "react";
  
  const Customers = () => {
    const { data, isLoading, refetch } = useGetCustomersQuery({});
    const [deleteCustomer] = useDeleteCustomerMutation();
    const [updateCustomer] = useUpdateCustomerMutation({});
  
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingCustomer, setEditingCustomer] = useState<any>(null);
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
  
    const handleEdit = (customer: any) => {
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
          id: editingCustomer._id,
          data: values, // ✅ Bu yerda `data` alohida beriladi
        };
        await updateCustomer(payload).unwrap();
        message.success("Mijoz yangilandi");
        setIsModalOpen(false);
        refetch();
      } catch {
        message.error("Xatolik yuz berdi");
      }
    };

  
    const columns = [
      {
        title: "Ism",
        dataIndex: "first_name",
        key: "first_name",
      },
      {
        title: "Familiya",
        dataIndex: "last_name",
        key: "last_name",
      },
      {
        title: "Telefon",
        dataIndex: "phone_number",
        key: "phone_number",
      },
      {
        title: "Email",
        dataIndex: "email",
        key: "email",
      },
      {
        title: "Telegram ID",
        dataIndex: "tg_id",
        key: "tg_id",
      },
      {
        title: "Til",
        dataIndex: "lang",
        key: "lang",
        render: (lang: string) => (
          <Tag color={lang === "ru" ? "geekblue" : "green"}>
            {lang.toUpperCase()}
          </Tag>
        ),
      },
      {
        title: "Holati",
        dataIndex: "is_active",
        key: "is_active",
        render: (active: boolean) => (
          <Tag color={active ? "green" : "red"}>
            {active ? "Faol" : "Faol emas"}
          </Tag>
        ),
      },
      {
        title: "Ro'yxatdan o'tgan",
        dataIndex: "createdAt",
        key: "createdAt",
      },
      {
        title: "Amallar",
        key: "actions",
        render: (_: any, record: any) => (
          <>
            <Button type="link" onClick={() => handleEdit(record)}>
              Tahrirlash
            </Button>
            <Popconfirm
              title="Rostdan ham o'chirmoqchimisiz?"
              onConfirm={() => handleDelete(record._id)}
              okText="Ha"
              cancelText="Yo'q"
            >
              <Button danger type="link">
                O'chirish
              </Button>
            </Popconfirm>
          </>
        ),
      },
    ];
  
    return (
      <div className="p-4 bg-white rounded shadow">
        <h1 className="text-xl font-semibold mb-4">Mijozlar</h1>
        {isLoading ? (
          <div className="flex justify-center items-center h-40">
            <Spin size="large" tip="Mijozlar yuklanmoqda..." />
          </div>
        ) : (
          <Table
            columns={columns}
            dataSource={data?.data?.payload || []}
            rowKey="_id"
            pagination={{
              total: data?.data?.total,
              pageSize: data?.data?.limit || 20,
              current: data?.data?.page || 1,
            }}
          />
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
  