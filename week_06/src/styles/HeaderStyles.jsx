import styled from 'styled-components'
import { lightTheme, darkTheme } from './theme.jsx'

export const HeaderContainer = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  background-color: ${props => 
    props.theme === 'light' ? lightTheme.background : darkTheme.background};
  box-shadow: 0 2px 10px ${props => 
    props.theme === 'light' ? lightTheme.shadow : darkTheme.shadow};
  transition: all 0.3s ease;
  border-bottom: 2px solid ${props => 
    props.selectedService 
      ? (props.theme === 'light' ? lightTheme.primary : darkTheme.primary)
      : 'transparent'};
`

export const NavBar = styled.nav`
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`

export const Logo = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  color: ${props => 
    props.theme === 'light' ? lightTheme.primary : darkTheme.primary};
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: transform 0.3s ease;
  
  svg {
    font-size: 1.3rem;
  }
  
  &:hover {
    transform: scale(1.05);
  }
`

export const NavLinks = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;

  @media (max-width: 768px) {
    display: none;
  }
`

export const NavLink = styled.a`
  color: ${props => 
    props.theme === 'light' ? lightTheme.text : darkTheme.text};
  text-decoration: none;
  font-weight: 500;
  cursor: pointer;
  transition: color 0.3s ease;
  position: relative;
  
  &:hover {
    color: ${props => 
      props.theme === 'light' ? lightTheme.primary : darkTheme.primary};
  }
  
  &::after {
    content: '';
    position: absolute;
    bottom: -5px;
    left: 0;
    width: 0;
    height: 2px;
    background-color: ${props => 
      props.theme === 'light' ? lightTheme.primary : darkTheme.primary};
    transition: width 0.3s ease;
  }
  
  &:hover::after {
    width: 100%;
  }
`

export const ThemeToggle = styled.button`
  background: none;
  border: 2px solid ${props => 
    props.theme === 'light' ? lightTheme.primary : darkTheme.primary};
  color: ${props => 
    props.theme === 'light' ? lightTheme.primary : darkTheme.primary};
  padding: 0.5rem 1rem;
  border-radius: 25px;
  cursor: pointer;
  font-size: 1.2rem;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  
  span {
    font-size: 1rem;
  }
  
  svg {
    font-size: 1.2rem;
  }
  
  &:hover {
    background-color: ${props => 
      props.theme === 'light' ? lightTheme.primary : darkTheme.primary};
    color: ${props => 
      props.theme === 'light' ? lightTheme.background : darkTheme.background};
    transform: scale(1.1);
  }
`

export const MobileMenuButton = styled.button`
  display: none;
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: ${props => 
    props.theme === 'light' ? lightTheme.text : darkTheme.text};
  
  @media (max-width: 768px) {
    display: block;
  }
`

export const MobileNav = styled.div`
  display: none;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem 2rem;
  background-color: ${props => 
    props.theme === 'light' ? lightTheme.surface : darkTheme.surface};
  border-top: 1px solid ${props => 
    props.theme === 'light' ? lightTheme.border : darkTheme.border};
  
  @media (max-width: 768px) {
    display: flex;
  }
`

