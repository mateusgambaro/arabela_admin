  import React, { useState } from 'react'
  import { Button, Form, Input, Modal, Select, Table } from 'antd'
  import type { ColumnsType } from 'antd/es/table'
  import { ButtonContainer, TableContainer } from './styled'
  import PlaylistModal from '../PlaylistModal/PlaylistModal'
  import axiosInstance from '../../config/api'
  import { Delete } from '@mui/icons-material'

  interface DataType {
    key: React.Key
    id: number
    music: string
    artist: string
  }

  const MusicsTable: React.FC = () => {
    const [data, setData] = React.useState<DataType[]>([])
    const [repertoire, setRepertoire] = React.useState<DataType[]>([])
    const [isModalVisible, setIsModalVisible] = useState(false)
    const [openArtistModal, setOpenArtistModal] = useState(false)
    const [loadingArtist, setLoadingArtist] = useState(false)
    const [artists, setArtists] = useState([])
    const [form] = Form.useForm()
    const [artistForm] = Form.useForm()
    const { Option } = Select

    const addToRepertoire = React.useCallback((song: DataType) => {
      setRepertoire(prevRepertoire => {
        const songExists = prevRepertoire.find(item => item.id === song.id)

        if (songExists) {
          return prevRepertoire.filter(item => item.id !== song.id)
        } else {
          return [...prevRepertoire, song]
        }
      })
    }, [])

    const columns: ColumnsType<DataType> = React.useMemo(
      () => [
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
          render: (_text: string, record: DataType, _index: number) => {
            const songExists = repertoire.find(item => item.id === record.id)

            return (
              <Button
                style={{
                  backgroundColor: songExists ? '#ff0000' : '#C80C5D',
                  color: 'white'
                }}
                onClick={() => addToRepertoire(record)}
              >
                {songExists ? <Delete /> : 'Adicionar'}
              </Button>
            )
          },
          width: 100
        }
      ],
      [addToRepertoire, repertoire]
    )

    const handleSubmitArtist = () => {
      artistForm
        .validateFields()
        .then(values => {
          setLoadingArtist(true)
          axiosInstance
            .post('/admin/artists', { name: values.artistName })
            .then(response => {
              artistForm.resetFields()
              setLoadingArtist(false)
              setOpenArtistModal(false)
              setArtists(prevArtists => [
                ...prevArtists,
                {
                  key: prevArtists.length,
                  id: response.data.id,
                  name: values.artistName
                }
              ])
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

    const handleSubmitSong = () => {
      form
        .validateFields()
        .then(values => {
          setIsModalVisible(true)
          axiosInstance
            .post('/admin/songs', {
              name: values.name,
              artist_id: Number(values.artist),
              status: values.status
            })
            .then(response => {
              form.resetFields()
              setIsModalVisible(false)

              setData(prevData => [
                ...prevData,
                {
                  key: prevData.length,
                  id: response.data.id,
                  music: values.name,
                  artist: artists.find(artist => artist.id === values.artist)
                    ?.name,
                  status: values.status
                }
              ])
            })
            .catch(error => {
              console.error('Error while creating song:', error)
              setIsModalVisible(false)
            })
        })
        .catch(info => {
          console.log('Validate Failed:', info)
        })
    }

    React.useEffect(() => {
      axiosInstance
        .get('/admin/songs')
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
      axiosInstance
        .get('/admin/artists')
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
          <PlaylistModal data={repertoire.map((item, index) => ({ ...item, index }))} />
        </ButtonContainer>
        <Modal
          title="Adicionar nova música"
          open={isModalVisible}
          onOk={handleSubmitSong}
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
                  <Option key={artist.id} value={artist.id}>
                    {artist.name}
                  </Option>
                ))}
              </Select>
            </Form.Item>
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
        <Table columns={columns} dataSource={data} />
      </TableContainer>
    )
  }

  export default MusicsTable
