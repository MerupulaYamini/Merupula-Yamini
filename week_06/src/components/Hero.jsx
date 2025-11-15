import React from 'react'
import { useAppContext } from '../context/AppContext.jsx'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGasPump } from '@fortawesome/free-solid-svg-icons'
import { 
  HeroContainer, 
  HeroContent, 
  HeroTitle, 
  HeroSubtitle, 
  HeroButton,
  HeroImage
} from '../styles/HeroStyles.jsx'

const Hero = () => {
  const { theme } = useAppContext()

  return (
    <HeroContainer id="hero" theme={theme}>
      <HeroContent>
        <HeroTitle theme={theme}>India's Energy Partner</HeroTitle>
        <HeroSubtitle theme={theme}>
          Powering the Nation with Quality Fuels and Services
        </HeroSubtitle>
        <HeroButton theme={theme} onClick={() => {
          const element = document.getElementById('services')
          if (element) element.scrollIntoView({ behavior: 'smooth' })
        }}>
          Explore Our Services
        </HeroButton>
      </HeroContent>
      <HeroImage theme={theme}>
        <div><FontAwesomeIcon icon={faGasPump} /></div>
      </HeroImage>
    </HeroContainer>
  )
}

export default Hero

