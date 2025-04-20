import React, { useState } from "react";
import { useGetProjectsQuery } from "../../redux/api/projects";
import { Row, Col, Spin, Typography } from "antd";
import { RocketOutlined } from "@ant-design/icons";
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
      <div
        style={{ display: "flex", justifyContent: "center", marginTop: 100 }}
      >
        <Spin size="large" tip="Loyihalar yuklanmoqda..." />
      </div>
    );
  }

  return (
    <div style={{ padding: "2rem" }}>
      <Title level={2} style={{ textAlign: "center", marginBottom: "2rem" }}>
        <RocketOutlined style={{ marginRight: 8 }} />
        Loyiha Galereyasi
      </Title>
      <Row gutter={[24, 24]}>
        {projects.map((project: any) => (
          <Col
            key={project._id}
            xs={24}
            sm={12}
            md={8}
            lg={6}
            style={{ display: "flex", justifyContent: "center" }}
          >
            <Project project={project} onEdit={handleEdit} />
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
