import React, { useState } from "react";
import { Card, Typography } from "antd";
import { EditOutlined } from "@ant-design/icons";

const { Title, Paragraph } = Typography;

interface ProjectProps {
  project: {
    _id: string;
    name: string;
    description: string;
    link: string;
    image: string;
  };
  onEdit: (project: any) => void;
}

const Project: React.FC<ProjectProps> = ({ project, onEdit }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <Card
      hoverable
      style={{
        width: 300,
        borderRadius: 16,
        overflow: "hidden",
        boxShadow: "0 8px 20px rgba(0,0,0,0.1)",
        position: "relative",
      }}
      cover={
        <div
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          style={{
            position: "relative",
            height: 180,
            overflow: "hidden",
          }}
        >
          <img
            alt={project.name}
            src={`https://api.milliardev.com/uploads/${project.image}`}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              borderTopLeftRadius: 16,
              borderTopRightRadius: 16,
            }}
          />
          {/* Hover Overlay */}
          {hovered && (
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: "rgba(0, 0, 0, 0.5)",
                color: "#fff",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 16,
              }}
            >
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  padding: "10px 20px",
                  backgroundColor: "#fff",
                  color: "#000",
                  borderRadius: 8,
                  textDecoration: "none",
                  fontWeight: "bold",
                }}
              >
                View
              </a>
            </div>
          )}
        </div>
      }
    >
      <Title level={4}>{project.name}</Title>
      <Paragraph ellipsis={{ rows: 2 }}>{project.description}</Paragraph>

      <EditOutlined
        onClick={() => onEdit(project)}
        style={{
          position: "absolute",
          top: 12,
          right: 12,
          fontSize: 20,
          color: "#555",
          cursor: "pointer",
        }}
        title="Tahrirlash"
      />
    </Card>
  );
};

export default React.memo(Project);
