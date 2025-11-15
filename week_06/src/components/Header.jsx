import React from 'react'
import { useAppContext } from '../context/AppContext.jsx'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faMoon, faSun, faFlag } from '@fortawesome/free-solid-svg-icons'
import { 
  HeaderContainer, 
  NavBar, 
  Logo, 
  NavLinks, 
  NavLink, 
  ThemeToggle,
  MobileMenuButton,
  MobileNav
} from '../styles/HeaderStyles.jsx'

const navItems = [
  { id: 'hero', label: 'Home' },
  { id: 'services', label: 'Services' },
  { id: 'features', label: 'Features' },
  { id: 'testimonials', label: 'Testimonials' },
  { id: 'faq', label: 'FAQ' },
  { id: 'contact', label: 'Contact' }
]

const Header = () => {
  const { theme, toggleTheme, selectedService } = useAppContext()
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false)
  const handleNavClick = (id) => {
    const element = document.getElementById(id)
    if (element) element.scrollIntoView({ behavior: 'smooth' })
    setMobileMenuOpen(false)
  }

  return (
    <HeaderContainer theme={theme} selectedService={selectedService}>
      <NavBar>
        <Logo onClick={() => handleNavClick('hero')} theme={theme}>
          <FontAwesomeIcon icon={faFlag} /> Indian Oil
        </Logo>
        
        <NavLinks>
          {navItems.map(item => (
            <NavLink key={item.id} onClick={() => handleNavClick(item.id)} theme={theme}>
              {item.label}
            </NavLink>
          ))}
          <ThemeToggle onClick={toggleTheme} theme={theme}>
            <FontAwesomeIcon icon={theme === 'light' ? faMoon : faSun} />
            <span>{theme === 'light' ? 'Dark Mode' : 'Light Mode'}</span>
          </ThemeToggle>
        </NavLinks>

        <MobileMenuButton onClick={() => setMobileMenuOpen(!mobileMenuOpen)} theme={theme}>
          <FontAwesomeIcon icon={faBars} />
        </MobileMenuButton>
      </NavBar>

      {mobileMenuOpen && (
        <MobileNav theme={theme}>
          {navItems.map(item => (
            <NavLink key={item.id} onClick={() => handleNavClick(item.id)} theme={theme}>
              {item.label}
            </NavLink>
          ))}
          <ThemeToggle onClick={toggleTheme} theme={theme}>
            <FontAwesomeIcon icon={theme === 'light' ? faMoon : faSun} />
            <span>{theme === 'light' ? 'Dark Mode' : 'Light Mode'}</span>
          </ThemeToggle>
        </MobileNav>
      )}
    </HeaderContainer>
  )
}

export default Header

