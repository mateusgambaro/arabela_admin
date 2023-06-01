import React from 'react'
import ReactLoading, { LoadingType } from 'react-loading'

interface LoadingProps {
  type: LoadingType
  color: string
}

const Loading: React.FC<LoadingProps> = ({ type, color }) => (
  <ReactLoading type={type} color={color} height={30} width={30} />
)

export default Loading