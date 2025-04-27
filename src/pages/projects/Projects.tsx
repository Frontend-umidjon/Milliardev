import React, { useState } from "react";
import { useGetProjectsQuery } from "../../redux/api/projects";
import { Row, Col, Spin, Typography, Button, Segmented } from "antd";
import { PlusOutlined, RocketOutlined } from "@ant-design/icons";
import Project from "../../components/project/Project";
import ProjectPopup from "../../components/project-popup/ProjectPopup";

const { Title } = Typography;

const Projects: React.FC = () => {
  const [filter, setFilter] = useState<"all" | "done" | "undone">("all");
  const { data, isLoading, refetch } = useGetProjectsQuery(
    filter === "all"
      ? {}
      : { is_done: filter === "done" ? true : false }
  );
  const projects = data?.data?.payload || [];
  const [selectedProject, setSelectedProject] = useState<any | null>(null);

  const handleEdit = (project: any) => {
    setSelectedProject(project);
  };

  const handleCloseModal = () => {
    setSelectedProject(null);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <Spin size="large" tip="Loyihalar yuklanmoqda..." />
      </div>
    );
  }

  return (
    <div className="px-4 md:px-8 py-6 bg-white rounded-2xl">
      <div className="text-center mb-8">
        <Title level={2} className="!mb-2">
          <RocketOutlined className="mr-2 text-blue-500" />
          Loyiha Galereyasi
        </Title>
        <p className="text-gray-500 text-sm md:text-base">
          Barcha loyihalaringizni shu yerdan boshqaring.
        </p>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
        <Segmented
          options={[
            { label: "Barchasi", value: "all" },
            { label: "Tugallangan", value: "done" },
            { label: "Jarayonda", value: "undone" },
          ]}
          value={filter}
          onChange={(val) => setFilter(val as "all" | "done" | "undone")}
          className="w-full md:w-auto"
        />

        <Button
          onClick={() => setSelectedProject({})}
          type="primary"
          icon={<PlusOutlined />}
          className="rounded-lg"
        >
          Yangi loyiha
        </Button>
      </div>

      <Row gutter={[16, 16]}>
        {projects.map((project: any) => (
          <Col
            key={project._id}
            xs={24}
            sm={12}
            md={8}
            lg={6}
            className="flex justify-center"
          >
            <div className="w-full max-w-[320px]">
              <Project project={project} onEdit={handleEdit} />
            </div>
          </Col>
        ))}
      </Row>

      {selectedProject && (
        <ProjectPopup
          project={selectedProject}
          onClose={handleCloseModal}
          refetch={refetch}
        />
      )}
    </div>
  );
};

export default Projects;
