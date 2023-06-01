/* eslint-disable @typescript-eslint/consistent-type-assertions */
import React, { useState } from 'react'
import { PieChartOutlined } from '@ant-design/icons'
import type { MenuProps } from 'antd'
import { Layout, Menu, theme } from 'antd'
import InfoTable from '../components/Table/Table'
import DoughnutChart from '../components/DoughnutChart/DoughnutChart'
import AdminHeader from '../components/Header/AdminHeader'
import { MusicNote } from '@mui/icons-material'
import Link from 'next/link'

const { Content, Footer, Sider } = Layout

const App: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false)
  const [selectedKey, setSelectedKey] = useState('1')

  return (
    <>
      <DoughnutChart />
      <InfoTable />
    </>
  )
}

export default App
