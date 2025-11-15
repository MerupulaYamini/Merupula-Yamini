import styled from 'styled-components'
import { lightTheme, darkTheme } from './theme.jsx'
import { SectionTitle } from './common.jsx'

export const FeaturesContainer = styled.section`
  min-height: 80vh;
  padding: 5rem 2rem;
  background-color: ${props => 
    props.theme === 'light' ? lightTheme.background : darkTheme.background};
  transition: background-color 0.3s ease;
`

export const FeaturesTitle = SectionTitle

export const FeaturesGrid = styled.div`
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

export const FeatureCard = styled.div`
  background-color: ${props => 
    props.theme === 'light' ? lightTheme.surface : darkTheme.surface};
  border: 2px solid ${props => 
    props.theme === 'light' ? lightTheme.border : darkTheme.border};
  border-radius: 15px;
  padding: 2rem;
  text-align: center;
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

export const FeatureIcon = styled.div`
  font-size: 3.5rem;
  margin-bottom: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${props => 
    props.theme === 'light' ? lightTheme.primary : darkTheme.primary};

  svg {
    width: 1em;
    height: 1em;
  }

  ${FeatureCard}:hover & {
    transform: scale(1.1);
    transition: transform 0.3s ease;
  }
`

export const FeatureName = styled.h3`
  font-size: 1.5rem;
  font-weight: bold;
  color: ${props => 
    props.theme === 'light' ? lightTheme.text : darkTheme.text};
  margin-bottom: 1rem;
`

export const FeatureDescription = styled.p`
  color: ${props => 
    props.theme === 'light' ? lightTheme.textSecondary : darkTheme.textSecondary};
  line-height: 1.6;
  font-size: 1rem;
`

