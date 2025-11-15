import styled from 'styled-components'
import { lightTheme, darkTheme } from './theme.jsx'

export const AppContainer = styled.div`
  min-height: 100vh;
  background-color: ${props => 
    props.theme === 'light' ? lightTheme.background : darkTheme.background};
  color: ${props => 
    props.theme === 'light' ? lightTheme.text : darkTheme.text};
  transition: background-color 0.3s ease, color 0.3s ease;
`

