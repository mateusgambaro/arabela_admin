import { TextField } from '@mui/material'
import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
`
export const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  height: 400px;
  width: 100%;
  border-radius: 20px;
  margin-top: 10%;
  margin-bottom: 20%;
  background-color: ${props => props.theme.colors.secondary};
  padding: 30px;
`

export const StyledTextField = styled(TextField)`
  && {
    margin-bottom: 15px;
    width: 100%;
    .MuiOutlinedInput-root {
      border-radius: 8px;
      background-color: rgba(217, 217, 217, 0.7);
    }
    .MuiFilledInput-root {
      border-radius: 8px;
      background-color: rgba(217, 217, 217, 0.7);
    }
    .MuiInputBase-input {
      background-color: transparent;
    }
  }
`