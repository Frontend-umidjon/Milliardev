import React, { useState } from "react";
import { useGetProjectsQuery } from "../../redux/api/projects";
import { Row, Col, Spin, Typography, Button } from "antd";
import { PlusOutlined, RocketOutlined } from "@ant-design/icons";
import Project from "../../components/project/Project";
import ProjectPopup from "../../components/project-popup/ProjectPopup";

const { Title } = Typography;

const Projects: React.FC = () => {
  const { data, isLoading, refetch } = useGetProjectsQuery({});
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
    <div className="p-6 md:p-10 bg-white rounded-2xl shadow-lg">
      <div className="text-center mb-10">
        <Title level={2} className="!mb-2">
          <RocketOutlined className="mr-2 text-blue-500" />
          Loyiha Galereyasi
        </Title>
        <p className="text-gray-500">Bu yerda barcha loyihalaringiz jamlangan.</p>
      </div>

      <div className="flex justify-end mb-6">
        <Button
          onClick={() => setSelectedProject({})}
          type="primary"
          icon={<PlusOutlined />}
          className="rounded-xl"
        >
          Yangi loyiha
        </Button>
      </div>

      <Row gutter={[24, 24]}>
        {projects.map((project: any) => (
          <Col
            key={project._id}
            xs={24}
            sm={12}
            md={8}
            lg={6}
            className="flex justify-center"
          >
            <div className="w-full max-w-xs transition-transform hover:scale-105">
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
