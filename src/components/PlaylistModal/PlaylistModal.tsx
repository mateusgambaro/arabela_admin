import React, { useState } from 'react'
import { Table, Button, Modal } from 'antd'
import {
  SortableContainer,
  SortableElement,
  SortableHandle
} from 'react-sortable-hoc'
import { DownloadOutlined, MenuOutlined } from '@ant-design/icons'

// define data here
const data = [
  {
    key: '1',
    name: 'Song 1',
    age: 32,
    address: 'New York No. 1 Lake Park',
    index: 0
  },
  {
    key: '2',
    name: 'Song 2',
    age: 42,
    address: 'London No. 1 Lake Park',
    index: 1
  }
  // add more songs as required
]

const DragHandle = SortableHandle(() => (
  <MenuOutlined style={{ cursor: 'pointer', color: '#999' }} />
))

const SortableItem = SortableElement(props => <tr {...props} />)
const SortableContainerItem = SortableContainer(props => <tbody {...props} />)

const PlaylistModal = () => {
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [dataSource, setDataSource] = useState(data)

  const handleOk = () => {
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
      title: 'Sort',
      dataIndex: 'sort',
      width: 30,
      className: 'drag-visible',
      render: () => <DragHandle />
    },
    {
      title: 'Name',
      dataIndex: 'name',
      className: 'drag-visible'
    },
    {
      title: 'Age',
      dataIndex: 'age'
    },
    {
      title: 'Address',
      dataIndex: 'address'
    }
  ]

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
        icon={<DownloadOutlined />}
        onClick={() => setIsModalVisible(true)}
      >
        Gerar repertório
      </Button>
      <Modal
        title="Revise seu repertório"
        open={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
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
      </Modal>
    </>
  )
}

export default PlaylistModal
