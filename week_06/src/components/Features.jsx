import React from 'react'
import { useAppContext } from '../context/AppContext.jsx'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShieldAlt, faTruck, faClock, faCertificate, faUsers, faHeart } from '@fortawesome/free-solid-svg-icons'
import { 
  FeaturesContainer, 
  FeaturesTitle, 
  FeaturesGrid, 
  FeatureCard,
  FeatureIcon,
  FeatureName,
  FeatureDescription
} from '../styles/FeaturesStyles.jsx'

const features = [
  { id: 1, name: 'Quality Assurance', icon: faCertificate, description: 'Certified quality products meeting international standards' },
  { id: 2, name: '24/7 Availability', icon: faClock, description: 'Round-the-clock service for all your fuel needs' },
  { id: 3, name: 'Safe & Secure', icon: faShieldAlt, description: 'Top-notch safety measures and secure transactions' },
  { id: 4, name: 'Fast Delivery', icon: faTruck, description: 'Quick and reliable delivery services at your doorstep' },
  { id: 5, name: 'Expert Support', icon: faUsers, description: 'Dedicated customer support team to assist you' },
  { id: 6, name: 'Trusted Brand', icon: faHeart, description: 'India\'s most trusted fuel and energy provider' }
]

const Features = () => {
  const { theme } = useAppContext()

  return (
    <FeaturesContainer id="features" theme={theme}>
      <FeaturesTitle theme={theme}>Our Features</FeaturesTitle>
      <FeaturesGrid>
        {features.map(feature => (
          <FeatureCard key={feature.id} theme={theme}>
            <FeatureIcon theme={theme}>
              <FontAwesomeIcon icon={feature.icon} />
            </FeatureIcon>
            <FeatureName theme={theme}>{feature.name}</FeatureName>
            <FeatureDescription theme={theme}>{feature.description}</FeatureDescription>
          </FeatureCard>
        ))}
      </FeaturesGrid>
    </FeaturesContainer>
  )
}

export default Features

