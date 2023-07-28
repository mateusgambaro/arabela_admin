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
import { ButtonContainer, TableContainer } from './styled'
import axios from 'axios'
import { DownloadOutlined } from '@mui/icons-material'
import PlaylistModal from '../PlaylistModal/PlaylistModal'

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
  },
  {
    title: 'Repertório',
    dataIndex: 'setList',
    render: (_text: string, _record: DataType, _index: number) => (
      <Button
        style={{
          backgroundColor: '#C80C5D',
          color: 'white'
        }}
        onClick={() => console.log('Add to repertoire')}
      >
        Adicionar
      </Button>
    ),
    width: 100
  }
]
const onChange: TableProps<DataType>['onChange'] = (pagination, filters) => {
  console.log('params', pagination, filters)
}

const MusicsTable: React.FC = () => {
  const [data, setData] = React.useState<DataType[]>([])
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [openArtistModal, setOpenArtistModal] = useState(false)
  const [loadingArtist, setLoadingArtist] = useState(false)
  const [artists, setArtists] = useState([])
  const [form] = Form.useForm()
  const [artistForm] = Form.useForm()
  const { Option } = Select

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

  const handleSubmitArtist = () => {
    artistForm
      .validateFields()
      .then(values => {
        setLoadingArtist(true)
        axios
          .post(
            'https://4x26pxitic.execute-api.us-east-1.amazonaws.com/Stage/admin/artists',
            { name: values.artistName }
          )
          .then(() => {
            artistForm.resetFields()
            setLoadingArtist(false)
            setOpenArtistModal(false)
          })
          .catch(error => {
            console.error('Error while creating artist:', error)
            setLoadingArtist(false)
          })
      })
      .catch(info => {
        console.log('Validate Failed:', info)
      })
  }

  React.useEffect(() => {
    axios
      .get(
        'https://4x26pxitic.execute-api.us-east-1.amazonaws.com/Stage/admin/sogs'
      )
      .then(response => {
        const transformedData = response.data.map((item, index) => ({
          key: index,
          id: item.id,
          music: item.name,
          artist: item.artist_name,
          status: item.status
        }))
        setData(transformedData)
      })
      .catch(error => console.error(error))
  }, [])

  React.useEffect(() => {
    axios
      .get(
        'https://4x26pxitic.execute-api.us-east-1.amazonaws.com/Stage/admin/artists'
      )
      .then(response => {
        const transformedData = response.data.map((item, index) => ({
          key: index,
          id: item.id,
          name: item.name
        }))
        setArtists(transformedData)
      })
      .catch(error => console.error(error))
  }, [])

  return (
    <TableContainer>
      <ButtonContainer>
        <Button
          style={{
            backgroundColor: '#C80C5D',
            color: 'white'
          }}
          onClick={() => setIsModalVisible(true)}
        >
          Adicionar música
        </Button>
        <PlaylistModal />
      </ButtonContainer>
      <Modal
        title="Adicionar nova música"
        open={isModalVisible}
        onOk={handleOk}
        okText="Adicionar"
        cancelText="Cancelar"
        onCancel={() => setIsModalVisible(false)}
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
                message: 'Por favor, selecione um artista!'
              }
            ]}
          >
            <Select placeholder="Selecione uma artista">
              {artists.map(artist => (
                <Option value={artist.id}>{artist.name}</Option>
              ))}
            </Select>
            <Button
              style={{
                marginTop: '10px',
                backgroundColor: '#C80C5D',
                color: 'white'
              }}
              onClick={() => setOpenArtistModal(true)}
            >
              Adicionar novo artista
            </Button>
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
      <Modal
        title="Novo artista"
        open={openArtistModal}
        onOk={() => handleSubmitArtist()}
        okText="Adicionar"
        cancelText="Cancelar"
        onCancel={() => setOpenArtistModal(false)}
        confirmLoading={loadingArtist}
      >
        <Form
          form={artistForm}
          name="newArtist"
          layout="vertical"
          initialValues={{ remember: true }}
        >
          <Form.Item label="Nome" name="artistName">
            <Input />
          </Form.Item>
        </Form>
      </Modal>
      <Table columns={columns} dataSource={data} onChange={onChange} />
    </TableContainer>
  )
}

export default MusicsTable
