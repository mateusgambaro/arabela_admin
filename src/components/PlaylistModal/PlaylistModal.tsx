import React, { useState } from 'react'
import {
  Table,
  Button,
  Modal,
  Form,
  Input,
  DatePicker,
  DatePickerProps
} from 'antd'
import {
  SortableContainer,
  SortableElement,
  SortableHandle
} from 'react-sortable-hoc'
import { DownloadOutlined, MenuOutlined, FormOutlined } from '@ant-design/icons'
import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'
import locale from 'antd/es/date-picker/locale/pt_BR'
import moment from 'moment'
import 'moment/locale/pt-br'

moment.locale('pt-br')

const DragHandle = SortableHandle(() => (
  <MenuOutlined style={{ cursor: 'pointer', color: '#999' }} />
))

const SortableItem = SortableElement(props => <tr {...props} />)
const SortableContainerItem = SortableContainer(props => <tbody {...props} />)

const PlaylistModal: React.FC<{ data: any }> = ({ data }) => {
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [dateSetList, setDateSetList] = useState('')
  const [dataSource, setDataSource] = useState(data)
  const [form] = Form.useForm()

  React.useEffect(() => {
    setDataSource(data)
  }, [data])

  const handleOk = () => {
    const { barName, date } = form.getFieldsValue()
    const formatTitleRepertoire = `${barName} - ${moment(date).format('DD/MM/YYYY')}`
    console.log('Format', formatTitleRepertoire)
    setIsModalVisible(false)
  }

  const handleCancel = () => {
    setIsModalVisible(false)
  }

  const DraggableContainer = props => (
    <SortableContainerItem
      useDragHandle
      helperClass="row-dragging"
      onSortEnd={onSortEnd}
      {...props}
    />
  )

  const DraggableBodyRow = ({ className, style, ...restProps }) => {
    const index = dataSource.findIndex(
      x => x.index === restProps['data-row-key']
    )
    return <SortableItem index={index} {...restProps} />
  }

  const onSortEnd = ({ oldIndex, newIndex }) => {
    if (oldIndex !== newIndex) {
      const newData = arrayMove(
        [].concat(dataSource),
        oldIndex,
        newIndex
      ).filter(el => !!el)
      setDataSource(newData)
    }
  }

  const arrayMove = (arr, previousIndex, newIndex) => {
    if (newIndex >= arr.length) {
      let k = newIndex - arr.length
      while (k-- + 1) {
        arr.push(undefined)
      }
    }
    arr.splice(newIndex, 0, arr.splice(previousIndex, 1)[0])
    return arr
  }

  const columns = [
    {
      title: 'Fila',
      dataIndex: 'sort',
      width: 30,
      className: 'drag-visible',
      render: () => <DragHandle />
    },
    {
      title: 'Nome',
      dataIndex: 'music',
      className: 'drag-visible'
    },
    {
      title: 'Artista',
      dataIndex: 'artist'
    }
  ]

  const downloadPdf = () => {
    // eslint-disable-next-line new-cap
    const doc = new jsPDF()
    const { barName, date } = form.getFieldsValue()

    doc.setFontSize(18)
    doc.text(barName, 15, 15)

    doc.setFontSize(14)
    doc.text(`Data: ${moment(date).format('dddd DD/MM/YYYY')}`, 15, 25)
    autoTable(doc, {
      startY: 35,
      head: [['Nome', 'Artista']],
      body: dataSource.map(row => [row.music, row.artist])
    })
    doc.save('repertoire.pdf')
  }

  const onChangeDate: DatePickerProps['onChange'] = (date, dateString) => {
    setDateSetList(dateString)
  }
  return (
    <>
      <Button
        style={{
          backgroundColor: '#1677ff',
          color: 'white',
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
        icon={<FormOutlined />}
        onClick={() => setIsModalVisible(true)}
      >
        Gerar repertório
      </Button>
      <Modal
        title="Revise seu repertório"
        open={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="Salvar"
        cancelText="Cancelar"
      >
        <Form
          form={form}
          name="newSetList"
          layout="vertical"
          initialValues={{ remember: true }}
        >
          <Form.Item label="Nome do Bar/Balada" name="barName">
            <Input />
          </Form.Item>
          <Form.Item label="Data" name="date">
            <DatePicker onChange={onChangeDate} locale={locale} format="DD/MM/YYYY"/>
          </Form.Item>
        </Form>
        <Table
          pagination={false}
          dataSource={dataSource}
          columns={columns}
          rowKey="index"
          components={{
            body: {
              wrapper: DraggableContainer,
              row: DraggableBodyRow
            }
          }}
        />
        <Button
          style={{
            backgroundColor: '#1677ff',
            color: 'white',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: '20px'
          }}
          icon={<DownloadOutlined />}
          onClick={downloadPdf}
        >
          Download
        </Button>
      </Modal>
    </>
  )
}

export default PlaylistModal
