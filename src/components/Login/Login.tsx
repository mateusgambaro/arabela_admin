/* eslint-disable @typescript-eslint/no-floating-promises */
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { Container, InputContainer, StyledTextField } from './styled'
import { Button, InputLabel } from '@mui/material'
import Loading from '../Loading/Loading'
import Loader from '../Loader/Loader'
import { useDispatch, useSelector } from 'react-redux'
import { loginRequest } from '../../store/actions/login'
import { RootState } from '../../store/actions/login/types'

const Login: React.FC = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  })

  // useDispatch hook to dispatch actions
  const dispatch = useDispatch()

  // useSelector hook to select state from redux store
  const { isFetching, isAuthenticated } = useSelector(
    (state: RootState) => state.login
  )

  const router = useRouter()

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    setFormData({ ...formData, [name]: value })
  }
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    dispatch(
      loginRequest({ username: formData.username, password: formData.password })
    )
  }

  // Redirect user if authenticated
  React.useEffect(() => {
    if (isAuthenticated) {
      router.push('/dashboard')
    }
  }, [isAuthenticated])

  return (
    <>
      {isFetching && <Loader />}
      <form onSubmit={handleSubmit}>
        <Container>
          <InputContainer>
            <div style={{ width: '100%' }}>
              <InputLabel style={{ color: '#d9d9d9' }}>Nome</InputLabel>
              <StyledTextField
                required
                placeholder="Username*"
                name="username"
                InputLabelProps={{ shrink: false }}
                value={formData.username}
                onChange={handleChange}
                variant="outlined"
              />
            </div>
            <div style={{ width: '100%' }}>
              <InputLabel style={{ color: '#d9d9d9' }}>Senha</InputLabel>
              <StyledTextField
                required
                placeholder="Senha*"
                name="password"
                type="password"
                InputLabelProps={{ shrink: false }}
                value={formData.password}
                onChange={handleChange}
                variant="outlined"
              />
            </div>
            <Button
              type="submit"
              variant="contained"
              style={{
                backgroundColor: 'black',
                color: 'white',
                width: 250,
                marginBottom: '10%'
              }}
            >
              {isFetching ? <Loading type="spin" color="white" /> : 'Entrar'}
            </Button>
          </InputContainer>
        </Container>
      </form>
    </>
  )
}

export default Login
