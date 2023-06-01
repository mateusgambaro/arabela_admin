import React, { useState } from 'react'
import {
  Button,
  Form,
  Input,
  Menu,
  MenuProps,
  Modal,
  Select,
  Table
} from 'antd'
import type { ColumnsType, TableProps } from 'antd/es/table'
import { TableContainer } from './styled'
import axios from 'axios'

interface DataType {
  key: React.Key
  id: number
  music: string
  artist: string
}

const columns: ColumnsType<DataType> = [
  {
    title: 'Id',
    dataIndex: 'id'
  },
  {
    title: 'Música',
    dataIndex: 'music'
  },
  {
    title: 'Artista',
    dataIndex: 'artist'
  },
  {
    title: 'Status',
    dataIndex: 'status'
  }
]
const onChange: TableProps<DataType>['onChange'] = (pagination, filters) => {
  console.log('params', pagination, filters)
}

const MusicsTable: React.FC = () => {
  const [data, setData] = React.useState<DataType[]>([])
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [form] = Form.useForm()
  const { Option } = Select

  const showModal = () => {
    setIsModalVisible(true)
  }

  const handleOk = () => {
    form
      .validateFields()
      .then(values => {
        form.resetFields()
        console.log(values)
        setIsModalVisible(false)
      })
      .catch(info => {
        console.log('Validate Failed:', info)
      })
  }

  const handleCancel = () => {
    setIsModalVisible(false)
  }

  React.useEffect(() => {
    axios
      .get('https://11dsf3r6r6.execute-api.us-east-1.amazonaws.com/stage')
      .then(response => {
        const transformedData = response.data.body.map((item, index) => ({
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
      <Button
        style={{
          marginBottom: '50px',
          backgroundColor: '#C80C5D',
          color: 'white',
        }}
        onClick={showModal}
      >
        Adicionar Música
      </Button>
      <Modal
        title="Adicionar nova música"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form
          form={form}
          name="newMusic"
          layout="vertical"
          initialValues={{ remember: true }}
        >
          <Form.Item
            label="Nome"
            name="name"
            rules={[
              { required: true, message: 'Por favor, insira o nome da música!' }
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Artista"
            name="artist"
            rules={[
              {
                required: true,
                message: 'Por favor, insira o nome do artista!'
              }
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Status"
            name="status"
            rules={[
              {
                required: true,
                message: 'Por favor, selecione uma das opções!'
              }
            ]}
          >
            <Select placeholder="Selecione uma opção">
              <Option value="new">NOVA</Option>
              <Option value="played">REPERTÓRIO</Option>
              <Option value="old">ANTIGA</Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
      <Table columns={columns} dataSource={data} onChange={onChange} />
    </TableContainer>
  )
}

export default MusicsTable
