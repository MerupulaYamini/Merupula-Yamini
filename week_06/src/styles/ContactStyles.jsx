import styled from 'styled-components'
import { lightTheme, darkTheme } from './theme.jsx'
import { SectionTitle } from './common.jsx'

export const ContactContainer = styled.section`
  min-height: 80vh;
  padding: 5rem 2rem;
  background-color: ${props => 
    props.theme === 'light' ? lightTheme.background : darkTheme.background};
  transition: background-color 0.3s ease;
`

export const ContactTitle = SectionTitle

export const ContactForm = styled.form`
  max-width: 600px;
  margin: 0 auto;
  background-color: ${props => 
    props.theme === 'light' ? lightTheme.surface : darkTheme.surface};
  padding: 2.5rem;
  border-radius: 15px;
  box-shadow: 0 4px 15px ${props => 
    props.theme === 'light' ? lightTheme.shadow : darkTheme.shadow};
  transition: all 0.3s ease;

  @media (max-width: 768px) {
    padding: 1.5rem;
  }
`

export const FormGroup = styled.div`
  margin-bottom: 1.5rem;
`

export const FormLabel = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  color: ${props => 
    props.theme === 'light' ? lightTheme.text : darkTheme.text};
  font-weight: 500;
`

export const FormInput = styled.input`
  width: 100%;
  padding: 0.75rem;
  border: 2px solid ${props => 
    props.theme === 'light' ? lightTheme.border : darkTheme.border};
  border-radius: 8px;
  font-size: 1rem;
  background-color: ${props => 
    props.theme === 'light' ? lightTheme.background : darkTheme.background};
  color: ${props => 
    props.theme === 'light' ? lightTheme.text : darkTheme.text};
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: ${props => 
      props.theme === 'light' ? lightTheme.primary : darkTheme.primary};
    box-shadow: 0 0 0 3px ${props => 
      props.theme === 'light' 
        ? `${lightTheme.primary}20` 
        : `${darkTheme.primary}20`};
  }
`

export const FormTextarea = styled.textarea`
  width: 100%;
  padding: 0.75rem;
  border: 2px solid ${props => 
    props.theme === 'light' ? lightTheme.border : darkTheme.border};
  border-radius: 8px;
  font-size: 1rem;
  font-family: inherit;
  background-color: ${props => 
    props.theme === 'light' ? lightTheme.background : darkTheme.background};
  color: ${props => 
    props.theme === 'light' ? lightTheme.text : darkTheme.text};
  resize: vertical;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: ${props => 
      props.theme === 'light' ? lightTheme.primary : darkTheme.primary};
    box-shadow: 0 0 0 3px ${props => 
      props.theme === 'light' 
        ? `${lightTheme.primary}20` 
        : `${darkTheme.primary}20`};
  }
`

export const SubmitButton = styled.button`
  width: 100%;
  padding: 1rem;
  background-color: ${props => 
    props.theme === 'light' ? lightTheme.primary : darkTheme.primary};
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 1rem;

  &:hover {
    background-color: ${props => 
      props.theme === 'light' ? lightTheme.hover : darkTheme.hover};
    transform: translateY(-2px);
    box-shadow: 0 4px 15px ${props => 
      props.theme === 'light' 
        ? `${lightTheme.primary}40` 
        : `${darkTheme.primary}40`};
  }

  &:active {
    transform: translateY(0);
  }
`

export const SuccessMessage = styled.div`
  background-color: ${props => 
    props.theme === 'light' ? lightTheme.success : darkTheme.success};
  color: white;
  padding: 1rem;
  border-radius: 8px;
  margin-bottom: 1rem;
  text-align: center;
  font-weight: 500;
  animation: slideIn 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;

  svg {
    font-size: 1.2rem;
  }

  @keyframes slideIn {
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

