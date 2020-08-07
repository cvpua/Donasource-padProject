import styled from 'styled-components'
import theme from '../theme.js'

const FormContainer = styled.div `
  width: 90%;
  max-width: 600px;
  border-radius: ${theme.spacing(1)};
  margin: auto;
  background-color: ${theme.color.white};
  padding: 20px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
  transition: all 0.3s cubic-bezier(.25,.8,.25,1);
`

export default FormContainer