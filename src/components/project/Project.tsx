import React from "react";
import { Card, Typography } from "antd";
import { EditOutlined } from "@ant-design/icons";
import { ProjectType } from "../../types";

const { Title, Paragraph } = Typography;



interface ProjectProps {
  project: ProjectType;
  onEdit: (project: ProjectType) => void; 
}

const Project: React.FC<ProjectProps> = ({ project, onEdit }) => {
  return (
    <Card
      hoverable
      style={{
        width: "100%",
        maxWidth: 300,
        borderRadius: 16,
        border: "1px solid #e5e5e5",
        overflow: "hidden",
        position: "relative",
      }}
      cover={
        <a
          href={project.link}
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            alt={project.name}
            src={`https://api.milliardev.com/uploads/${project.image}`}
            style={{
              width: "100%",
              height: 180,
              objectFit: "cover",
              borderTopLeftRadius: 16,
              borderTopRightRadius: 16,
            }}
          />
        </a>
      }
    >
      <Title level={5} style={{ marginBottom: 8 }}>
        {project.name}
      </Title>
      <Paragraph ellipsis={{ rows: 2 }} style={{ fontSize: 14, color: "#666" }}>
        {project.description}
      </Paragraph>

      <EditOutlined
        onClick={() => onEdit(project)}
        style={{
          position: "absolute",
          top: 12,
          right: 12,
          fontSize: 18,
          color: "#555",
          cursor: "pointer",
        }}
        title="Tahrirlash"
      />
    </Card>
  );
};

export default React.memo(Project);
