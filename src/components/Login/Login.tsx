/* eslint-disable @typescript-eslint/no-misused-promises */
import { useRouter } from 'next/router'
import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react'
import { Container, InputContainer, StyledTextField } from './styled'
import { Button, IconButton, InputAdornment, InputLabel } from '@mui/material'
import Loading from '../Loading/Loading'
import Loader from '../Loader/Loader'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../store/actions/login/types'
import { loginUser } from '../../services/login'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import { ThunkDispatch } from 'redux-thunk'
import { AnyAction, Store } from 'redux'

interface FormData {
  username: string
  password: string
}

const Login: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    username: '',
    password: ''
  })
  const [showPassword, setShowPassword] = useState(false)

  const dispatch: ThunkDispatch<Store, unknown, AnyAction> = useDispatch()
  const { isFetching, isAuthenticated } = useSelector(
    (state: RootState) => state.login
  )
  const router = useRouter()

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()
    await dispatch(loginUser(formData.username, formData.password))
  }

  useEffect(() => {
    if (isAuthenticated) void router.push('/dashboard')
  }, [isAuthenticated, router])

  return (
    <>
      {isFetching && <Loader />}
      <form onSubmit={handleSubmit}>
        <Container>
          <InputContainer>
            <InputLabelField
              name="username"
              label="Login"
              value={formData.username}
              handleChange={handleChange}
            />
            <InputLabelField
              name="password"
              label="Senha"
              type={showPassword ? 'text' : 'password'}
              value={formData.password}
              handleChange={handleChange}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={() => setShowPassword(prev => !prev)}
                    onMouseDown={e => {
                      e.preventDefault()
                      setShowPassword(prev => !prev)
                    }}
                  >
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              }
            />
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

interface InputLabelFieldProps {
  name: string
  label: string
  value: string
  type?: string
  handleChange: (event: ChangeEvent<HTMLInputElement>) => void
  endAdornment?: JSX.Element
}

const InputLabelField: React.FC<InputLabelFieldProps> = ({
  name,
  label,
  value,
  type = 'text',
  handleChange,
  endAdornment
}) => (
  <div style={{ width: '100%' }}>
    <InputLabel style={{ color: '#d9d9d9' }}>{label}</InputLabel>
    <StyledTextField
      required
      placeholder={`${label}*`}
      name={name}
      type={type}
      InputLabelProps={{ shrink: false }}
      value={value}
      onChange={handleChange}
      variant="outlined"
      InputProps={{ endAdornment }}
    />
  </div>
)

export default Login
