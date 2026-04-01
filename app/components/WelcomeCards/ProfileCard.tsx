"use client";

import { memo } from "react";
import { Avatar, Typography, Tag, Card, Divider } from "antd";
import { UserOutlined, EnvironmentOutlined, MailOutlined, TrophyOutlined, CodeOutlined, RocketOutlined } from "@ant-design/icons";

const { Title } = Typography;

const ProfileCard = memo(function ProfileCard() {
  return (
    <Card className="shadow-sm">
      <div className="text-center mb-6">
        <Avatar size={80} className="bg-emerald-500 mb-4" icon={<UserOutlined />} />
        <Title level={3} className="mb-2">Hi，欢迎使用 AI 助手</Title>
        <Typography.Text type="secondary">
          我可以帮你解答问题、编写代码、分析数据等
        </Typography.Text>
      </div>
      
      <Divider />
      
      <div className="space-y-4">
        <div>
          <Typography.Text strong className="text-gray-500 text-sm">基本信息</Typography.Text>
          <div className="mt-2 space-y-1">
            <div className="flex items-center gap-2 text-gray-600">
              <EnvironmentOutlined />
              <span>上海 · 27岁 · 男</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <MailOutlined />
              <span>152****8880</span>
            </div>
          </div>
        </div>
        
        <div>
          <Typography.Text strong className="text-gray-500 text-sm">求职意向</Typography.Text>
          <div className="mt-2">
            <Tag color="blue">前端工程师</Tag>
            <Tag color="green">6年经验</Tag>
          </div>
        </div>
        
        <div>
          <Typography.Text strong className="text-gray-500 text-sm flex items-center gap-1">
            <TrophyOutlined /> 荣誉成就
          </Typography.Text>
          <div className="mt-2 space-y-1 text-sm text-gray-600">
            <div>• 2024年优秀产品团队奖</div>
            <div>• 2024年度「技术突破奖」</div>
            <div>• 多次月度之星及最佳coder</div>
          </div>
        </div>
        
        <div>
          <Typography.Text strong className="text-gray-500 text-sm flex items-center gap-1">
            <CodeOutlined /> 核心技能
          </Typography.Text>
          <div className="mt-2 flex flex-wrap gap-1">
            <Tag>React</Tag>
            <Tag>Vue</Tag>
            <Tag>TypeScript</Tag>
            <Tag>Node.js</Tag>
            <Tag>Next.js</Tag>
            <Tag>Webpack</Tag>
            <Tag>Echarts</Tag>
            <Tag>微前端</Tag>
            <Tag>AI开发</Tag>
          </div>
        </div>
        
        <div>
          <Typography.Text strong className="text-gray-500 text-sm flex items-center gap-1">
            <RocketOutlined /> AI 项目
          </Typography.Text>
          <div className="mt-2 space-y-1 text-sm text-gray-600">
            <div>• AI简历助手</div>
            <div>• AI聊天机器人</div>
          </div>
        </div>
      </div>
    </Card>
  );
});

export default ProfileCard;