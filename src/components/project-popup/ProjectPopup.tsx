import React, { useEffect, useState } from "react";
import {
  Modal,
  Form,
  Input,
  Button,
  Upload,
  message,
  Select,
  Switch,
  Spin,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { RcFile, UploadChangeParam } from "antd/es/upload";
import {
  useCreateProjectMutation,
  useUpdateProjectMutation,
} from "../../redux/api/projects";
import { useGetCustomersQuery } from "../../redux/api/customers.api";

interface ProjectPopupProps {
  project?: any;
  onClose: () => void;
  refetch: () => void;
}

const ProjectPopup: React.FC<ProjectPopupProps> = ({
  project,
  onClose,
  refetch,
}) => {
  const {
    data: customers,
    isLoading: customersLoading,
    error: customersError,
  } = useGetCustomersQuery({});
  const [form] = Form.useForm();
  const [file, setFile] = useState<RcFile | null>(null);
  const [fileList, setFileList] = useState<any[]>([]);
  const [apiError, setApiError] = useState<string | null>(null);

  const [createProject, { isLoading: creating }] = useCreateProjectMutation();
  const [updateProject, { isLoading: updating }] = useUpdateProjectMutation();

  useEffect(() => {
    if (project) {
      form.setFieldsValue({
        name: project.name || "",
        description: project.description || "",
        link: project.link || "",
        customerId: project.customerId || undefined,
        is_done: project.is_done || false,
      });

      if (project.image) {
        setFileList([
          {
            uid: "-1",
            name: project.image,
            status: "done",
            url: `/uploads/${project.image}`,
          },
        ]);
      } else {
        setFileList([]);
      }
    } else {
      form.resetFields();
      setFile(null);
      setFileList([]);
    }
    // Yangi forma ochilganda xatolikni tozalash
    setApiError(null);
  }, [project, form]);

  const handleFinish = async (values: any) => {
    try {
      setApiError(null);
      const formData = new FormData();
      formData.append("name", values.name || "");
      formData.append("description", values.description || "");
      formData.append("link", values.link || "");
      formData.append("customerId", values.customerId);
      formData.append("is_done", values.is_done ? "true" : "false");

      const lastFile =
        fileList.length > 0 && fileList[fileList.length - 1]?.originFileObj;
      if (lastFile && lastFile !== file) {
        formData.append("image", lastFile as RcFile);
      } else if (file) {
        formData.append("image", file);
      }

      let response;
      if (project?._id) {
        response = await updateProject({
          id: project._id,
          data: formData,
        }).unwrap();
        message.success("Loyiha muvaffaqiyatli yangilandi");
      } else {
        response = await createProject(formData).unwrap();
        message.success("Yangi loyiha muvaffaqiyatli yaratildi");
      }

      refetch();
      onClose();
    } catch (error: any) {
      console.error("Xatolik:", error);
      const errorMessage =
        error.data?.message ||
        error.message ||
        "Loyihani saqlashda xatolik yuz berdi";

      // Server bilan bog'lanishda xatolik bo'lsa
      if (
        error.name === "TypeError" ||
        errorMessage.includes("Failed to fetch") ||
        errorMessage.includes("network")
      ) {
        setApiError(
          "Server bilan bog'lanishda xatolik yuz berdi. Internetingizni tekshiring va qayta urinib ko'ring."
        );
      } else {
        setApiError(errorMessage);
      }

      message.error(errorMessage);
    }
  };

  const handleFileChange = (info: UploadChangeParam) => {
    setFileList(info.fileList);

    if (info.file.status === "removed") {
      setFile(null);
    } else if (info.file.originFileObj) {
      const newFile = info.file.originFileObj as RcFile;
      setFile(newFile);
    }
  };

  // API so'rovlari xatoliklarini tekshirish
  useEffect(() => {
    if (customersError) {
      message.error("Mijozlar ro'yxatini yuklashda xatolik yuz berdi");
    }
  }, [customersError]);

  // Yuklanish vaqtida qidirishni qayta boshlash
  const handleRetry = () => {
    refetch();
  };

  return (
    <Modal
      open={true}
      title={
        <span style={{ fontSize: "20px", fontWeight: 600 }}>
          {project ? "Loyihani tahrirlash" : "Yangi loyiha qo'shish"}
        </span>
      }
      onCancel={onClose}
      footer={null}
      centered
      className="rounded-xl"
    >
      {apiError && (
        <div className="mb-4 p-3 bg-red-50 text-red-600 rounded-lg border border-red-300">
          <p className="font-medium">{apiError}</p>
          <Button type="link" onClick={() => setApiError(null)}>
            Xabarni yopish
          </Button>
        </div>
      )}

      <Form
        form={form}
        layout="vertical"
        onFinish={handleFinish}
        className="pt-2"
      >
        <Form.Item
          name="name"
          label="Nomi"
          rules={[
            { required: true, message: "Iltimos, loyiha nomini kiriting" },
          ]}
        >
          <Input placeholder="Loyiha nomini kiriting" size="large" />
        </Form.Item>

        <Form.Item name="description" label="Tavsif">
          <Input.TextArea
            rows={4}
            placeholder="Loyihaga qisqacha ta'rif"
            size="large"
          />
        </Form.Item>

        <Form.Item name="link" label="Havola">
          <Input placeholder="https://example.com" size="large" />
        </Form.Item>

        <Form.Item label="Rasm yuklash">
          <Upload
            beforeUpload={() => false}
            onChange={handleFileChange}
            fileList={fileList}
            maxCount={1}
            accept="image/*"
            showUploadList={{ showPreviewIcon: false, showRemoveIcon: true }}
          >
            <Button icon={<UploadOutlined />}>Rasm tanlash</Button>
          </Upload>
        </Form.Item>

        <Form.Item
          name="customerId"
          label="Mijoz"
          rules={[{ required: true, message: "Iltimos, mijozni tanlang" }]}
        >
          {customersLoading ? (
            <div className="flex items-center justify-center p-4">
              <Spin /> <span className="ml-2">Mijozlar yuklanmoqda...</span>
            </div>
          ) : customersError ? (
            <div className="text-center">
              <p className="text-red-500 mb-2">
                Mijozlar ro'yxatini yuklab bo'lmadi
              </p>
              <Button type="primary" onClick={handleRetry}>
                Qayta urinish
              </Button>
            </div>
          ) : (
            <Select
              placeholder="Mijozni tanlang"
              loading={customersLoading}
              showSearch
              optionFilterProp="label"
              size="large"
              filterOption={(input, option) =>
                ((option?.label as string) || "")
                  .toLowerCase()
                  .includes(input.toLowerCase())
              }
            >
              {customers?.data?.payload.map((customer: any) => (
                <Select.Option
                  key={customer._id}
                  value={customer._id}
                  label={`${customer.first_name} ${customer.last_name}`}
                >
                  {customer.first_name} {customer.last_name}
                </Select.Option>
              ))}
            </Select>
          )}
        </Form.Item>

        <Form.Item name="is_done" label="Yakunlangan" valuePropName="checked">
          <Switch />
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            block
            size="large"
            loading={creating || updating}
            className="rounded-lg"
            disabled={customersLoading || !!customersError}
          >
            {project ? "Saqlash" : "Yaratish"}
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ProjectPopup;
