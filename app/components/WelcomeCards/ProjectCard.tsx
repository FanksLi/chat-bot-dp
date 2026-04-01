"use client";

import { memo } from "react";
import { Typography, Tag, Card, Divider } from "antd";
import { FolderOutlined } from "@ant-design/icons";

const projects = [
  {
    name: "StudioManager管理系统",
    tag: "B端平台",
    tagColor: "blue",
    techStack: "single-spa · React · Ant Design · Zustand",
    description: "面向B端用户的平台，管理C端用户操作行为，支撑峰值5000+ TPS",
  },
  {
    name: "Website建站管理平台",
    tag: "低代码",
    tagColor: "green",
    techStack: "Next.js · React-moveable · React-quill",
    description: "拖拽式页面搭建，支持大文件上传断点续传，多格式动态导出",
  },
  {
    name: "照片直播系统平台",
    tag: "跨平台",
    tagColor: "purple",
    techStack: "Single-spa · Gatsby · Taro · React",
    description: "AI修图、智能搜索，日活80万+，沉淀158万客户资产",
  },
  {
    name: "票据管理平台",
    tag: "多端应用",
    tagColor: "orange",
    techStack: "Vue · Electron · Element-UI",
    description: "多终端票据管理，SSO统一认证，支撑5000+企业用户并发",
  },
];

const ProjectCard = memo(function ProjectCard() {
  return (
    <Card
      className="shadow-sm"
      title={
        <div className="flex items-center gap-2">
          <FolderOutlined className="text-emerald-500" />
          <span>项目经验</span>
        </div>
      }
    >
      <div className="space-y-4">
        {projects.map((project) => (
          <div key={project.name} className="p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <Typography.Text strong>{project.name}</Typography.Text>
              <Tag color={project.tagColor}>{project.tag}</Tag>
            </div>
            <Typography.Text type="secondary" className="text-xs">
              {project.techStack}
            </Typography.Text>
            <div className="mt-2 text-sm text-gray-600">
              {project.description}
            </div>
          </div>
        ))}
      </div>
      
      <Divider />
      
      <div className="text-center">
        <Typography.Text type="secondary" className="text-sm">
          在下方输入框开始对话，或点击「新建对话」
        </Typography.Text>
      </div>
    </Card>
  );
});

export default ProjectCard;