import { ResponsivePie } from '@nivo/pie'
import React, { useEffect, useState } from 'react'
import chroma from 'chroma-js'
import { Title } from './styled'
import axiosInstance from '../../config/api'
import { Skeleton } from '@mui/material'

type Datum = {
  id: string
  label: string
  value: number
  color: string
}

const DoughnutChart: React.FC = () => {
  const [chartData, setChartData] = useState<Datum[]>([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    setIsLoading(true)
    axiosInstance
      .get('/admin/requests')
      .then(response => {
        const dataFromDB = response.data
        const baseColor = '#c80c5d'
        const colorScale = chroma
          .scale([baseColor, 'white'])
          .mode('lch')
          .colors(4)

        const ageGroups = {
          'Abaixo de 20 anos': 0,
          '20-40': 0,
          'Acima de 40 anos': 0
        }

        dataFromDB.forEach(item => {
          const age = parseInt(item.age, 10)
          if (age < 20) {
            ageGroups['Abaixo de 20 anos'] += 1
          } else if (age < 40) {
            ageGroups['20-40'] += 1
          } else {
            ageGroups['Acima de 40 anos'] += 1
          }
        })
        setIsLoading(false)
        setChartData(
          Object.keys(ageGroups).map((key, i) => ({
            id: key,
            label: key,
            value: ageGroups[key],
            color: colorScale[i % colorScale.length]
          }))
        )
      })
      .catch(error => {
        console.error('Error fetching data: ', error)
      })
  }, [])

  return (
    <div style={{ height: '500px' }}>
      <Title>Faixa etária</Title>
      {isLoading ? (
        <Skeleton
          variant="rectangular"
          style={{
            width: '100%',
            height: '80%',
            padding: '40px',
            marginTop: '10px'
          }}
        />
      ) : (
        <ResponsivePie
          data={chartData}
          margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
          innerRadius={0.5}
          padAngle={0.7}
          cornerRadius={3}
          isInteractive
          activeOuterRadiusOffset={8}
          borderWidth={1}
          borderColor={{ from: 'color', modifiers: [['darker', 0.2]] }}
          arcLinkLabelsSkipAngle={10}
          arcLinkLabelsTextColor="#333333"
          arcLinkLabelsThickness={2}
          arcLinkLabelsColor={{ from: 'color' }}
          arcLabelsSkipAngle={10}
          arcLabelsTextColor={{ from: 'color', modifiers: [['darker', 2]] }}
          theme={{
            tooltip: {
              container: {
                background: 'black',
                color: 'white',
                fontSize: '12px',
                borderRadius: '4px',
                boxShadow: '3px 3px 10px rgba(0, 0, 0, 0.15)'
              }
            }
          }}
        />
      )}
    </div>
  )
}

export default DoughnutChart
