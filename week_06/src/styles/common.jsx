import styled from 'styled-components'
import { lightTheme, darkTheme } from './theme.jsx'

export const SectionTitle = styled.h2`
  text-align: center;
  font-size: 2.5rem;
  color: ${props => props.theme === 'light' ? lightTheme.primary : darkTheme.primary};
  margin-bottom: 3rem;
  font-weight: bold;

  @media (max-width: 768px) {
    font-size: 2rem;
    margin-bottom: 2rem;
  }
`

