import { Button, Card, Switch } from 'antd'
import React from 'react'

export const SetList: React.FC = () => {
  return (
    <div>
      <Card
        title={
          <div style={{display: 'flex', justifyContent: 'space-between'}}>
            Hangar 51 - 05/08/2023 | 50 Músicas{' '}
            <Switch defaultChecked/>
          </div>
        }
        bordered={false}
      >
        <Button
          style={{
            backgroundColor: '#1677ff',
            color: 'white',
            marginRight: '10px'
          }}
        >
          Ver músicas
        </Button>
        <Button
          style={{
            backgroundColor: 'red',
            color: 'white'
          }}
        >
          Remover
        </Button>
      </Card>
    </div>
  )
}
