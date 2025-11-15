import styled from 'styled-components'
import { lightTheme, darkTheme } from './theme.jsx'

export const HeroContainer = styled.section`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: space-around;
  padding: 8rem 2rem 4rem;
  background: linear-gradient(
    135deg,
    ${props => props.theme === 'light' 
      ? `${lightTheme.background} 0%, ${lightTheme.surface} 100%`
      : `${darkTheme.background} 0%, ${darkTheme.surface} 100%`}
  );
  position: relative;
  overflow: hidden;

  @media (max-width: 768px) {
    flex-direction: column;
    text-align: center;
    padding: 6rem 1rem 2rem;
  }

  &::before {
    content: '';
    position: absolute;
    top: -50%;
    right: -20%;
    width: 500px;
    height: 500px;
    background: radial-gradient(
      circle,
      ${props => props.theme === 'light' 
        ? `${lightTheme.primary}20` 
        : `${darkTheme.primary}20`}
    );
    border-radius: 50%;
    z-index: 0;
  }
`

export const HeroContent = styled.div`
  flex: 1;
  max-width: 600px;
  z-index: 1;
  position: relative;

  @media (max-width: 768px) {
    max-width: 100%;
  }
`

export const HeroTitle = styled.h1`
  font-size: 3.5rem;
  font-weight: bold;
  color: ${props => 
    props.theme === 'light' ? lightTheme.primary : darkTheme.primary};
  margin-bottom: 1rem;
  line-height: 1.2;
  animation: fadeInUp 0.8s ease;

  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`

export const HeroSubtitle = styled.p`
  font-size: 1.3rem;
  color: ${props => 
    props.theme === 'light' ? lightTheme.textSecondary : darkTheme.textSecondary};
  margin-bottom: 2rem;
  animation: fadeInUp 1s ease;

  @media (max-width: 768px) {
    font-size: 1.1rem;
  }
`

export const HeroButton = styled.button`
  background-color: ${props => 
    props.theme === 'light' ? lightTheme.primary : darkTheme.primary};
  color: white;
  padding: 1rem 2.5rem;
  font-size: 1.1rem;
  font-weight: 600;
  border: none;
  border-radius: 50px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px ${props => 
    props.theme === 'light' 
      ? `${lightTheme.primary}40` 
      : `${darkTheme.primary}40`};
  animation: fadeInUp 1.2s ease;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 6px 20px ${props => 
      props.theme === 'light' 
        ? `${lightTheme.primary}60` 
        : `${darkTheme.primary}60`};
    background-color: ${props => 
      props.theme === 'light' ? lightTheme.hover : darkTheme.hover};
  }

  &:active {
    transform: translateY(-1px);
  }
`

export const HeroImage = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1;
  position: relative;

  div {
    font-size: 15rem;
    opacity: 0.3;
    animation: float 3s ease-in-out infinite;
    display: flex;
    align-items: center;
    justify-content: center;
    
    svg {
      width: 100%;
      height: 100%;
    }
  }

  @keyframes float {
    0%, 100% {
      transform: translateY(0px);
    }
    50% {
      transform: translateY(-20px);
    }
  }

  @media (max-width: 768px) {
    display: none;
  }
`

