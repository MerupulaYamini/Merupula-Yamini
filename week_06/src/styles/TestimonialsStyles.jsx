import styled from 'styled-components'
import { lightTheme, darkTheme } from './theme.jsx'
import { SectionTitle } from './common.jsx'

export const TestimonialsContainer = styled.section`
  min-height: 80vh;
  padding: 5rem 2rem;
  background-color: ${props => 
    props.theme === 'light' ? lightTheme.surface : darkTheme.surface};
  transition: background-color 0.3s ease;
`

export const TestimonialsTitle = SectionTitle

export const TestimonialsGrid = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
  padding: 0 1rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
`

export const TestimonialCard = styled.div`
  background-color: ${props => 
    props.theme === 'light' ? lightTheme.background : darkTheme.background};
  border: 2px solid ${props => 
    props.theme === 'light' ? lightTheme.border : darkTheme.border};
  border-radius: 15px;
  padding: 2rem;
  position: relative;
  transition: all 0.3s ease;
  box-shadow: 0 4px 10px ${props => 
    props.theme === 'light' ? lightTheme.shadow : darkTheme.shadow};

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 25px ${props => 
      props.theme === 'light' ? lightTheme.shadow : darkTheme.shadow};
    border-color: ${props => 
      props.theme === 'light' ? lightTheme.primary : darkTheme.primary};
  }
`

export const QuoteIcon = styled.div`
  font-size: 3rem;
  color: ${props => 
    props.theme === 'light' ? lightTheme.primary : darkTheme.primary};
  opacity: 0.3;
  margin-bottom: 1rem;

  svg {
    width: 1em;
    height: 1em;
  }
`

export const StarRating = styled.div`
  display: flex;
  gap: 0.3rem;
  margin-bottom: 1rem;
  color: #FFD700;

  svg {
    font-size: 1.2rem;
  }
`

export const TestimonialText = styled.p`
  color: ${props => 
    props.theme === 'light' ? lightTheme.text : darkTheme.text};
  line-height: 1.8;
  margin-bottom: 1.5rem;
  font-size: 1rem;
  font-style: italic;
`

export const TestimonialAuthor = styled.h4`
  font-size: 1.2rem;
  font-weight: bold;
  color: ${props => 
    props.theme === 'light' ? lightTheme.primary : darkTheme.primary};
  margin-bottom: 0.5rem;
`

export const TestimonialRole = styled.p`
  color: ${props => 
    props.theme === 'light' ? lightTheme.textSecondary : darkTheme.textSecondary};
  font-size: 0.9rem;
`

