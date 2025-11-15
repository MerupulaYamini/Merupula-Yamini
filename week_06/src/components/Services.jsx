import React from 'react'
import { useAppContext } from '../context/AppContext.jsx'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGasPump, faFire, faOilCan, faCar } from '@fortawesome/free-solid-svg-icons'
import { 
  ServicesContainer, 
  ServicesTitle, 
  ServicesGrid, 
  ServiceCard,
  ServiceIcon,
  ServiceName,
  ServiceDescription
} from '../styles/ServicesStyles.jsx'

const services = [
  { id: 1, name: 'Petrol & Diesel', icon: faGasPump, description: 'High-quality fuel for all your vehicles' },
  { id: 2, name: 'LPG Gas', icon: faFire, description: 'Clean and efficient cooking gas for homes' },
  { id: 3, name: 'Lubricants', icon: faOilCan, description: 'Premium engine oils and lubricants' },
  { id: 4, name: 'Auto Care', icon: faCar, description: 'Complete vehicle maintenance services' }
]

const Services = () => {
  const { theme, selectedService, selectService } = useAppContext()

  return (
    <ServicesContainer id="services" theme={theme}>
      <ServicesTitle theme={theme}>Our Services</ServicesTitle>
      <ServicesGrid>
        {services.map(service => (
          <ServiceCard
            key={service.id}
            theme={theme}
            isSelected={selectedService === service.name}
            onClick={() => selectService(service.name)}
          >
            <ServiceIcon theme={theme} isSelected={selectedService === service.name}>
              <FontAwesomeIcon icon={service.icon} />
            </ServiceIcon>
            <ServiceName theme={theme} isSelected={selectedService === service.name}>{service.name}</ServiceName>
            <ServiceDescription theme={theme} isSelected={selectedService === service.name}>{service.description}</ServiceDescription>
          </ServiceCard>
        ))}
      </ServicesGrid>
    </ServicesContainer>
  )
}

export default Services

