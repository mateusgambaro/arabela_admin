import React, { useEffect } from 'react'
import { Layout, Menu, Dropdown, Button, Avatar } from 'antd'
import { UserOutlined, LogoutOutlined } from '@ant-design/icons'
import { LogoContainer, TitleContainer, UserContainer } from './styled'
import Image from 'next/image'
import arabela_logo_header from '../../../public/arabela_logo_header.png'
import { logoutUser } from '../../services/login'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../store/actions/login/types'
import { useRouter } from 'next/router'
import { logOut } from '../../store/actions/login'
import avatar from '../../../public/avatar.png'

const { Header } = Layout

const AdminHeader: React.FC<{ username: string }> = ({ username }) => {
  const { user, isAuthenticated } = useSelector(
    (state: RootState) => state.login
  )
  const router = useRouter()
  const dispatch = useDispatch()
  const logoutMenu = (
    <Menu>
      <Menu.Item key="1">
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'column'
          }}
        >
          <div
            style={{ display: 'flex', alignItems: 'center', marginBottom: 10 }}
          >
            <Avatar src="/avatar.png" size={70} />
            <span style={{ marginLeft: 10 }}>Guguinha</span>
          </div>
          <Button
            type="link"
            icon={<LogoutOutlined />}
            // eslint-disable-next-line @typescript-eslint/no-misused-promises
            onClick={async () => {
              await logoutUser()
              dispatch(logOut())
              await router.push('/')
            }}
          >
            Sair
          </Button>
        </div>
      </Menu.Item>
    </Menu>
  )

  return (
    <Header
      style={{
        display: 'flex',
        width: '100%',
        justifyContent: 'space-between',
        alignItems: 'center'
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
                src="/avatar.png"
              />
              {user.username}
            </span>
          </Dropdown>
        </UserContainer>
      </Menu>
    </Header>
  )
}

export default AdminHeader
