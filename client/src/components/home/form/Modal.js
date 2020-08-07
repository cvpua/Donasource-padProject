import styled from 'styled-components'

const Modal = styled.div `
	display: ${props => props.open ? 'flex' : 'none'};
  position: fixed;
  z-index: 3;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0,0,0,0.6);
`

export default Modal