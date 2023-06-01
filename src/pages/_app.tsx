import React, { useState } from 'react'
import { AppProps } from 'next/app'
import GlobalStyle from '../styles/global'
import { ThemeProvider } from 'styled-components'
import theme from '../styles/theme'
import NProgress from 'nprogress'
import { Router, useRouter } from 'next/router'
import Head from 'next/head'
import { createWrapper } from 'next-redux-wrapper'
import configureStore from '../store'
import { Layout, Menu } from 'antd'
import AdminHeader from '../components/Header/AdminHeader'
import Link from 'next/link'
import { PieChartOutlined } from '@ant-design/icons'
import { MusicNote } from '@mui/icons-material'

const { Content, Footer, Sider } = Layout

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  const [collapsed, setCollapsed] = useState(false)
  const [selectedKey, setSelectedKey] = useState('1')
  const router = useRouter()

  Router.events.on('routeChangeStart', url => {
    NProgress.start()
  })

  Router.events.on('routeChangeComplete', url => {
    NProgress.done(false)
  })
  NProgress.configure({ showSpinner: false })
  return (
    <>
      <Head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/nprogress/0.2.0/nprogress.min.css"
          integrity="sha512-42kB9yDlYiCEfx2xVwq0q7hT4uf26FUgSIZBK8uiaEnTdShXjwr8Ip1V4xGJMg3mHkUt9nNuTDxunHF0/EgxLQ=="
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        />
      </Head>
      <ThemeProvider theme={theme}>
        {router.pathname !== '/' ? (
          <Layout style={{ minHeight: '100vh' }}>
            <Sider
              collapsible
              collapsed={collapsed}
              onCollapse={value => setCollapsed(value)}
            >
              <div className="demo-logo-vertical" />
              <Menu theme="dark" selectedKeys={[selectedKey]} mode="inline">
                <Menu.Item
                  key="1"
                  icon={<PieChartOutlined />}
                  onClick={() => setSelectedKey('1')}
                >
                  <Link href="/dashboard">Pedidos</Link>
                </Menu.Item>
                <Menu.Item
                  key="2"
                  icon={<MusicNote />}
                  onClick={() => setSelectedKey('2')}
                >
                  <Link href="/musics">Músicas</Link>
                </Menu.Item>
              </Menu>
            </Sider>
            <Layout>
              <AdminHeader title="ARABELA" username="mateus" />
              <Content style={{ margin: '0 16px', marginTop: '100px' }}>
                <Component {...pageProps} />
              </Content>
              <Footer style={{ textAlign: 'center' }}>
                Arabela Banda ©2023 Designed by Mateus Gambaro & Gustavo Faria
              </Footer>
            </Layout>
          </Layout>
        ) : (
          <Component {...pageProps} />
        )}

        <GlobalStyle />
      </ThemeProvider>
    </>
  )
}

const wrapper = createWrapper(configureStore)

export default wrapper.withRedux(MyApp)
