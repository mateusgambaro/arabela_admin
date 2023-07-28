import React from 'react'
import { Menu, MenuProps, Table } from 'antd'
import type { ColumnsType, TableProps } from 'antd/es/table'
import { TableContainer } from './styled'
import axios from 'axios'

interface DataType {
  key: React.Key
  song_name: string
  user_name: string
  age: string
  phone: string
  comments: string
}

const columns: ColumnsType<DataType> = [
  {
    title: 'Música',
    dataIndex: 'song_name'
  },
  {
    title: 'Usuário',
    dataIndex: 'user_name'
  },
  {
    title: 'Idade',
    dataIndex: 'age',
    sorter: (a, b) => Number(a.age) - Number(b.age),
    sortDirections: ['descend', 'ascend']
  },
  {
    title: 'Celular',
    dataIndex: 'phone'
  },
  {
    title: 'Comentários',
    dataIndex: 'comments'
  },
  {
    title: 'Avaliações',
    dataIndex: 'rating'
  }
]
const onChange: TableProps<DataType>['onChange'] = (pagination, filters) => {
  console.log('params', pagination, filters)
}

const InfoTable: React.FC = () => {
  const [data, setData] = React.useState<DataType[]>([])

  React.useEffect(() => {
    axios
      .get('https://4x26pxitic.execute-api.us-east-1.amazonaws.com/Stage/songs')
      .then(response => {
        const transformedData = response.data.map((item, index) => ({
          key: index,
          song_name: item.song_name,
          user_name: item.user_name,
          age: item.age,
          phone: item.phone,
          comments: item.comments,
          rating: item.rating ? 'Gostei' : 'Não gostei'
        }))
        setData(transformedData)
      })
      .catch(error => console.error(error))
  }, [])

  return (
    <TableContainer>
      <Table columns={columns} dataSource={data} onChange={onChange} />
    </TableContainer>
  )
}

export default InfoTable
