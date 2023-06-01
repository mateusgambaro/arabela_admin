import React from 'react'
import { RingLoader } from 'react-spinners'
import { LoaderDiv, Wrapper } from './styled'

const Loader: React.FC = () => {
  return (
    <Wrapper>
      <RingLoader color="#C80C5D" size={80} />
    </Wrapper>
  )
}

export default Loader
