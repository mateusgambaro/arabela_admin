import React from 'react'
import { Layout, Menu, Dropdown, Button, Avatar } from 'antd'
import { UserOutlined, LogoutOutlined } from '@ant-design/icons'
import { TitleContainer, UserContainer } from './styled'

const { Header } = Layout

const AdminHeader: React.FC<{ title: string; username: string }> = ({
  title,
  username
}) => {
  const logoutMenu = (
    <Menu>
      <Menu.Item key="1">
        <Button
          type="link"
          icon={<LogoutOutlined />}
          onClick={() => {
            /* add your logout function here */
          }}
        >
          Logout
        </Button>
      </Menu.Item>
    </Menu>
  )

  return (
    <Header
      style={{
        display: 'flex',
        position: 'fixed',
        zIndex: 1,
        width: '100%'
      }}
    >
      <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
        <TitleContainer>{title}</TitleContainer>
        <UserContainer>
          <Dropdown overlay={logoutMenu} key="2">
            <span>
              <Avatar
                style={{ backgroundColor: '#87d068', marginRight: '8px' }}
                icon={<UserOutlined />}
              />
              {username}
            </span>
          </Dropdown>
        </UserContainer>
      </Menu>
    </Header>
  )
}

export default AdminHeader
