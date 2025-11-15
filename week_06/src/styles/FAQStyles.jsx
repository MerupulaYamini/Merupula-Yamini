import styled from 'styled-components'
import { lightTheme, darkTheme } from './theme.jsx'
import { SectionTitle } from './common.jsx'

export const FAQContainer = styled.section`
  min-height: 80vh;
  padding: 5rem 2rem;
  background-color: ${props => 
    props.theme === 'light' ? lightTheme.background : darkTheme.background};
  transition: background-color 0.3s ease;
`

export const FAQTitle = SectionTitle

export const FAQList = styled.div`
  max-width: 900px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`

export const FAQItem = styled.div`
  background-color: ${props => 
    props.theme === 'light' ? lightTheme.surface : darkTheme.surface};
  border: 2px solid ${props => 
    props.theme === 'light' ? lightTheme.border : darkTheme.border};
  border-radius: 10px;
  overflow: hidden;
  transition: all 0.3s ease;

  &:hover {
    border-color: ${props => 
      props.theme === 'light' ? lightTheme.primary : darkTheme.primary};
  }
`

export const FAQQuestion = styled.div`
  padding: 1.5rem;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: 600;
  font-size: 1.1rem;
  color: ${props => 
    props.theme === 'light' ? lightTheme.text : darkTheme.text};
  transition: all 0.3s ease;
  background-color: ${props => 
    props.isOpen 
      ? (props.theme === 'light' ? `${lightTheme.primary}10` : `${darkTheme.primary}10`)
      : 'transparent'};

  &:hover {
    color: ${props => 
      props.theme === 'light' ? lightTheme.primary : darkTheme.primary};
  }

  span {
    flex: 1;
    padding-right: 1rem;
  }
`

export const FAQIcon = styled.div`
  color: ${props => 
    props.theme === 'light' ? lightTheme.primary : darkTheme.primary};
  font-size: 1.2rem;
  transition: transform 0.3s ease;

  svg {
    width: 1em;
    height: 1em;
  }
`

export const FAQAnswer = styled.div`
  padding: 0 1.5rem 1.5rem 1.5rem;
  color: ${props => 
    props.theme === 'light' ? lightTheme.textSecondary : darkTheme.textSecondary};
  line-height: 1.8;
  animation: slideDown 0.3s ease;
  font-size: 1rem;

  @keyframes slideDown {
    from {
      opacity: 0;
      transform: translateY(-10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`

