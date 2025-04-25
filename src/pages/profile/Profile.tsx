import React from 'react';
import { Row, Col, Typography, Avatar, Spin, Card } from 'antd';
import { MailOutlined, PhoneOutlined, UserOutlined } from '@ant-design/icons';
import { useGetProfileQuery } from '../../redux/api/profile.api';

const { Title, Text } = Typography;

const Profile: React.FC = () => {
  const { data: profile, isLoading } = useGetProfileQuery({});

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-40 bg-gray-900">
        <Spin size="large" tip="Yuklanmoqda..." />
      </div>
    );
  }

  const user = profile?.user;

  return (
    <div className="min-h-screen bg-white px-6 py-8 text-gray-200">
      <Row justify="center">
        <Col xs={24} sm={20} md={16} lg={10}>
          <Card
            className="bg-gray-800 border border-gray-700 rounded-xl shadow-md"
            bodyStyle={{ padding: '2rem' }}
          >
            <div className="flex flex-col items-center text-center">
              <Avatar
                size={100}
                icon={<UserOutlined />}
                style={{ backgroundColor: '#3b82f6' }}
                className="mb-4"
              />
              <Title level={3} className="text-white">
                {user?.full_name}
              </Title>
              <Text className="text-gray-400 mb-6">
                {user?.is_creator ? 'Main Admin' : 'Admin'}
              </Text>

              <div className="w-full text-left space-y-4 text-sm text-gray-300">
                <div className="flex items-center gap-3">
                  <MailOutlined className="text-gray-400" />
                  <Text>{user?.email}</Text>
                </div>
                <div className="flex items-center gap-3">
                  <PhoneOutlined className="text-gray-400" />
                  <Text>{user?.phone_number}</Text>
                </div>
                <div className="flex items-center gap-3">
                  <Text className="font-medium">Holati:</Text>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      user?.is_active ? 'bg-green-600 text-white' : 'bg-red-600 text-white'
                    }`}
                  >
                    {user?.is_active ? 'Faol' : 'Faol emas'}
                  </span>
                </div>
              </div>
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Profile;
