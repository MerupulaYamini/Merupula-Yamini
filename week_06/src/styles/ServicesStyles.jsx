import styled from 'styled-components'
import { lightTheme, darkTheme } from './theme.jsx'
import { SectionTitle } from './common.jsx'

export const ServicesContainer = styled.section`
  min-height: 80vh;
  padding: 5rem 2rem;
  background-color: ${props => 
    props.theme === 'light' ? lightTheme.surface : darkTheme.surface};
  transition: background-color 0.3s ease;
`

export const ServicesTitle = SectionTitle

export const ServicesGrid = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  padding: 0 1rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
`

export const ServiceCard = styled.div`
  background-color: ${props => 
    props.isSelected
      ? (props.theme === 'light' ? lightTheme.primary : darkTheme.primary)
      : (props.theme === 'light' ? lightTheme.background : darkTheme.background)};
  border: 2px solid ${props => 
    props.isSelected
      ? (props.theme === 'light' ? lightTheme.primary : darkTheme.primary)
      : (props.theme === 'light' ? lightTheme.border : darkTheme.border)};
  border-radius: 15px;
  padding: 2rem;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 10px ${props => 
    props.theme === 'light' ? lightTheme.shadow : darkTheme.shadow};

  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 8px 25px ${props => 
      props.theme === 'light' ? lightTheme.shadow : darkTheme.shadow};
    border-color: ${props => 
      props.theme === 'light' ? lightTheme.primary : darkTheme.primary};
  }
`

export const ServiceIcon = styled.div`
  font-size: 4rem;
  margin-bottom: 1rem;
  filter: ${props => props.isSelected ? 'brightness(1.2)' : 'none'};
  transition: transform 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${props => 
    props.theme === 'light' && props.isSelected
      ? 'white'
      : props.theme === 'dark' && props.isSelected
      ? darkTheme.background
      : (props.theme === 'light' ? lightTheme.primary : darkTheme.primary)};

  svg {
    width: 1em;
    height: 1em;
  }

  ${ServiceCard}:hover & {
    transform: scale(1.2) rotate(5deg);
  }
`

export const ServiceName = styled.h3`
  font-size: 1.5rem;
  font-weight: bold;
  color: ${props => 
    props.theme === 'light' && props.isSelected
      ? 'white'
      : props.theme === 'dark' && props.isSelected
      ? darkTheme.background
      : (props.theme === 'light' ? lightTheme.text : darkTheme.text)};
  margin-bottom: 1rem;
`

export const ServiceDescription = styled.p`
  color: ${props => 
    props.theme === 'light' && props.isSelected
      ? 'rgba(255, 255, 255, 0.9)'
      : props.theme === 'dark' && props.isSelected
      ? darkTheme.textSecondary
      : (props.theme === 'light' ? lightTheme.textSecondary : darkTheme.textSecondary)};
  line-height: 1.6;
`

