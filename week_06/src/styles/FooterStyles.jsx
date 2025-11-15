import styled from 'styled-components'
import { lightTheme, darkTheme } from './theme.jsx'

export const FooterContainer = styled.footer`
  background-color: ${props => 
    props.theme === 'light' ? darkTheme.surface : '#000000'};
  color: ${props => 
    props.theme === 'light' ? darkTheme.text : lightTheme.text};
  padding: 3rem 2rem 1rem;
  transition: all 0.3s ease;
`

export const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;
  margin-bottom: 2rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    text-align: center;
  }
`

export const FooterSection = styled.div`
  p {
    margin: 0.5rem 0;
    color: ${props => 
      props.theme === 'light' ? darkTheme.textSecondary : lightTheme.textSecondary};
  }
`

export const FooterTitle = styled.h3`
  color: ${props => 
    props.theme === 'light' ? lightTheme.primary : darkTheme.primary};
  margin-bottom: 1rem;
  font-size: 1.2rem;
`

export const FooterLink = styled.a`
  display: block;
  color: ${props => 
    props.theme === 'light' ? darkTheme.textSecondary : lightTheme.textSecondary};
  text-decoration: none;
  margin: 0.5rem 0;
  transition: color 0.3s ease;
  cursor: pointer;

  &:hover {
    color: ${props => 
      props.theme === 'light' ? lightTheme.primary : darkTheme.primary};
  }
`

export const FooterBottom = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding-top: 2rem;
  border-top: 1px solid ${props => 
    props.theme === 'light' ? '#333' : '#444'};
  text-align: center;
  color: ${props => 
    props.theme === 'light' ? darkTheme.textSecondary : lightTheme.textSecondary};
  
  p {
    margin: 0;
  }
`

