import React, { useEffect, useState } from "react";
import { Modal, Form, Input, Button, Upload, message, Select } from "antd";
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
  const { data:customers, isLoading: customersLoading } = useGetCustomersQuery({});
  const [form] = Form.useForm();
  const [file, setFile] = useState<RcFile | null>(null);
  const [fileList, setFileList] = useState<any[]>([]);

  const [createProject, { isLoading: creating }] = useCreateProjectMutation();
  const [updateProject, { isLoading: updating }] = useUpdateProjectMutation();

  useEffect(() => {
    if (project) {
      form.setFieldsValue({
        name: project.name || "",
        description: project.description || "",
        link: project.link || "",
        customerId: project.customerId || undefined, // <-- BU QATORNI QO‘SHING
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
  }, [project, form]);

  const handleFinish = async (values: any) => {
    const formData = new FormData();
    formData.append("name", values.name || "");
    formData.append("description", values.description || "");
    formData.append("link", values.link || "");
    formData.append("customerId", values.customerId); // 👈 BU YERGA QO‘SHILADI

    const lastFile =
      fileList.length > 0 && fileList[fileList.length - 1]?.originFileObj;
    if (lastFile && lastFile !== file) {
      formData.append("image", lastFile as RcFile);
    } else if (file) {
      formData.append("image", file);
    }

    try {
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
      message.error("Loyihani saqlashda xatolik yuz berdi");
    }
  };


  // const handleFinish = async (values: any) => {
  //   const formData = new FormData();
  //   formData.append("name", values.name || "");
  //   formData.append("description", values.description || "");
  //   formData.append("link", values.link || "");

  //   const lastFile =
  //     fileList.length > 0 && fileList[fileList.length - 1]?.originFileObj;
  //   if (lastFile && lastFile !== file) {
  //     console.log("fileListdan fayl olindi:", lastFile);
  //     formData.append("image", lastFile as RcFile);
  //   } else if (file) {
  //     console.log("Yangi rasm tanlandi:", file);
  //     formData.append("image", file);
  //   } else {
  //     console.log("Yangi rasm tanlanmadi, image maydoni yuborilmaydi");
  //   }

  //   console.log("formData tarkibi:");
  //   for (let pair of formData.entries()) {
  //     console.log(`${pair[0]}: ${pair[1]}`);
  //   }

  //   try {
  //     let response;
  //     if (project?._id) {
  //       response = await updateProject({
  //         id: project._id,
  //         data: formData,
  //       }).unwrap();
  //       message.success("Loyiha muvaffaqiyatli yangilandi");
  //     } else {
  //       response = await createProject(formData).unwrap();
  //       console.log(formData);
  //       console.log("response", response);
        
  //       message.success("Yangi loyiha muvaffaqiyatli yaratildi");
  //     }

  //     console.log("Server javobi:", response);
  //     refetch();
  //     onClose();
  //   } catch (error: any) {
  //     console.error("Xatolik:", error);
  //     message.error("Loyihani saqlashda xatolik yuz berdi");
  //   }
  // };

  const handleFileChange = (info: UploadChangeParam) => {
    console.log("Rasm o'zgardi:", info);
    setFileList(info.fileList);

    if (info.file.status === "removed") {
      setFile(null);
      console.log("Fayl o‘chirildi, file holati:", file);
    } else if (info.file.originFileObj) {
      const newFile = info.file.originFileObj as RcFile;
      setFile(newFile);
      console.log("Yangi fayl tanlandi, file holati:", newFile);
    }
  };

  return (
    <Modal
      open={true}
      title={project ? "Loyihani tahrirlash" : "Yangi loyiha qo‘shish"}
      onCancel={onClose}
      footer={null}
      centered
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={handleFinish}
        initialValues={project}
      >
        <Form.Item name="name" label="Nomi" rules={[{ required: true }]}>
          <Input placeholder="Loyiha nomini kiriting" />
        </Form.Item>

        <Form.Item name="description" label="Tavsif">
          <Input.TextArea rows={4} placeholder="Loyihaga qisqacha ta'rif" />
        </Form.Item>

        <Form.Item name="link" label="Havola">
          <Input placeholder="https://example.com" />
        </Form.Item>

        <Form.Item label="Rasm yuklash">
          <Upload
            beforeUpload={() => false}
            onChange={handleFileChange}
            fileList={fileList}
            maxCount={1}
            accept="image/*"
            showUploadList={{ showRemoveIcon: true }}
          >
            <Button icon={<UploadOutlined />}>Rasm tanlash</Button>
          </Upload>
        </Form.Item>

        <Form.Item
          name="customerId"
          label="Mijoz"
          rules={[{ required: true, message: "Iltimos, mijozni tanlang" }]}
        >
          <Select
            placeholder="Mijozni tanlang"
            loading={customersLoading}
            showSearch
            optionFilterProp="children"
            filterOption={(input, option) =>
              (option?.label as string)
                .toLowerCase()
                .includes(input.toLowerCase())
            }
          >
            {customers?.data?.payload.map((customer: any) => (
              <Select.Option key={customer._id} value={customer._id}>
                {customer.first_name} {customer.last_name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            block
            loading={creating || updating}
          >
            {project ? "Saqlash" : "Yaratish"}
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ProjectPopup;
