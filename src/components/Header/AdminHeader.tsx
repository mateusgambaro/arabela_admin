import React from 'react'
import { Layout, Menu, Dropdown, Button, Avatar } from 'antd'
import { UserOutlined, LogoutOutlined } from '@ant-design/icons'
import { LogoContainer, TitleContainer, UserContainer } from './styled'
import Image from 'next/image'
import arabela_logo_header from '../../../public/arabela_logo_header.png'

const { Header } = Layout

const AdminHeader: React.FC<{ username: string }> = ({ username }) => {
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
        width: '100%',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      <LogoContainer>
        <Image
          src={arabela_logo_header}
          alt="arabela-logo"
          width={150}
          height={150}
        />
      </LogoContainer>
      <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
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
