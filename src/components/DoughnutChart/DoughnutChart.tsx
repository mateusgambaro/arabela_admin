/* eslint-disable @typescript-eslint/restrict-plus-operands */
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Doughnut } from 'react-chartjs-2'
import {
  Chart,
  ArcElement,
  CategoryScale,
  DoughnutController,
  Title
} from 'chart.js'

Chart.register(ArcElement, CategoryScale, DoughnutController, Title)

const DoughnutChart = () => {
  const [chartData, setChartData] = useState(null)

  useEffect(() => {
    axios
      .get('https://11dsf3r6r6.execute-api.us-east-1.amazonaws.com/stage')
      .then(response => {
        const dataFromDB = response.data.body

        const ageGroups = {
          'Under 30': 0,
          '30-50': 0,
          '50-70': 0,
          'Over 70': 0
        }

        dataFromDB.forEach(item => {
          const age = parseInt(item.age, 10)
          if (age < 30) {
            ageGroups['Under 30'] += 1
          } else if (age < 50) {
            ageGroups['30-50'] += 1
          } else if (age < 70) {
            ageGroups['50-70'] += 1
          } else {
            ageGroups['Over 70'] += 1
          }
        })

        setChartData({
          labels: Object.keys(ageGroups),
          datasets: [
            {
              label: 'Idade',
              data: Object.values(ageGroups),
              backgroundColor: [
                'green',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)'
              ],
              borderColor: [
                'green',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)'
              ],
              borderWidth: 1
            }
          ]
        })
      })
      .catch(error => {
        console.error('Error fetching data: ', error)
      })
  }, [])

  const options = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      scales: {
        y: {
          beginAtZero: true
        }
      },
      title: {
        display: true,
        text: 'Idade',
        padding: {
          top: 10,
          bottom: 30
        }
      },
      legend: {
        labels: {
          color: 'black'
        }
      }
    }
  }
  console.log('CHART', chartData)

  return (
    <div style={{ width: '20%', height: '20%' }}>
      {chartData && <Doughnut data={chartData} options={options} />}
    </div>
  )
}

export default DoughnutChart
