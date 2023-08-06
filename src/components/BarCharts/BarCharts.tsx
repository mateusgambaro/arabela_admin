import { ResponsiveBar } from '@nivo/bar'
import React, { useEffect, useState } from 'react'
import { Title } from './styled'
import axiosInstance from '../../config/api'
import { Skeleton } from '@mui/material'

type Datum = {
  music: string
  quantity: number
}

const BarChart: React.FC = () => {
  const [chartData, setChartData] = useState<Datum[]>([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    setIsLoading(true)
    axiosInstance
      .get('/admin/requests')
      .then(response => {
        const dataFromDB: { song_name: string }[] = response.data

        const songCounts: Record<string, number> = dataFromDB.reduce(
          (acc: Record<string, number>, curr: { song_name: string }) => {
            const songName = curr.song_name
            acc[songName] = (acc[songName] ?? 0) + 1
            return acc
          },
          {}
        )

        const formattedData: Datum[] = Object.keys(songCounts).map(song => ({
          music: song,
          quantity: songCounts[song]
        }))

        setIsLoading(false)
        setChartData(formattedData)
      })
      .catch(error => {
        console.error('Error fetching data: ', error)
      })
  }, [])

  return (
    <div style={{ height: '500px' }}>
      <Title>Músicas pedidas</Title>
      {isLoading ? (
        <Skeleton
          variant="rectangular"
          style={{ width: '100%', height: '80%', padding: '40px', marginTop: '10px' }}
        />
      ) : (
        <ResponsiveBar
          data={chartData}
          keys={['quantity']}
          indexBy="music"
          margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
          padding={0.3}
          valueScale={{ type: 'linear' }}
          indexScale={{ type: 'band', round: true }}
          colors={{ scheme: 'nivo' }}
          defs={[
            {
              id: 'dots',
              type: 'patternDots',
              background: 'inherit',
              color: '#38bcb2',
              size: 4,
              padding: 1,
              stagger: true
            },
            {
              id: 'lines',
              type: 'patternLines',
              background: 'inherit',
              color: '#eed312',
              rotation: -45,
              lineWidth: 6,
              spacing: 10
            }
          ]}
          fill={[
            {
              match: {
                id: 'quantity'
              },
              id: 'lines'
            }
          ]}
          borderColor={{ from: 'color', modifiers: [['darker', 4.6]] }}
          axisTop={null}
          axisRight={null}
          axisBottom={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'Músicas',
            legendPosition: 'middle',
            legendOffset: 32
          }}
          axisLeft={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'Quantidade de pedidos',
            legendPosition: 'middle',
            legendOffset: -40
          }}
          labelSkipWidth={12}
          labelSkipHeight={12}
          labelTextColor={{ from: 'color', modifiers: [['darker', 4.6]] }}
          animate={true}
        />
      )}
    </div>
  )
}

export default BarChart
