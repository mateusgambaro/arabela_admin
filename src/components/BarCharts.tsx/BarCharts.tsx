import { ResponsiveBar } from '@nivo/bar'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Title } from './styled'

type Datum = {
  music: string
  quantity: number
}

const BarChart: React.FC = () => {
  const [chartData, setChartData] = useState<Datum[]>([])

  useEffect(() => {
    axios
      .get('https://11dsf3r6r6.execute-api.us-east-1.amazonaws.com/stage')
      .then(response => {
        const dataFromDB: { song_name: string }[] = response.data.body

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

        setChartData(formattedData)
      })
      .catch(error => {
        console.error('Error fetching data: ', error)
      })
  }, [])

  return (
    <div style={{ height: '500px' }}>
      <Title>Músicas pedidas</Title>
      {chartData.length > 0 && (
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
          motionStiffness={90}
          motionDamping={15}
        />
      )}
    </div>
  )
}

export default BarChart
