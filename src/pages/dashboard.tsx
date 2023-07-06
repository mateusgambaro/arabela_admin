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
import { MusicsByNight } from '../components/MusicsByNight/MusicsByNight'
import { ChartContainer, DoughnutContainer } from '../styles/pages/Dashboard'
import BarChart from '../components/BarCharts.tsx/BarCharts'

const { Content, Footer, Sider } = Layout

const App: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false)
  const [selectedKey, setSelectedKey] = useState('1')

  return (
    <>
      <ChartContainer>
        <DoughnutContainer>
          <BarChart />
        </DoughnutContainer>
        <DoughnutContainer>
          <DoughnutChart />
        </DoughnutContainer>
      </ChartContainer>
      <MusicsByNight />
      <InfoTable />
    </>
  )
}

export default App
