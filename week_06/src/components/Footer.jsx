import React from 'react'
import { useAppContext } from '../context/AppContext.jsx'
import { 
  FooterContainer, 
  FooterContent, 
  FooterSection, 
  FooterTitle, 
  FooterLink,
  FooterBottom
} from '../styles/FooterStyles.jsx'

const footerSections = [
  { title: 'Indian Oil', items: ['India\'s Energy Partner', 'Powering the Nation'] },
  { title: 'Quick Links', links: [{ href: '#hero', text: 'Home' }, { href: '#services', text: 'Services' }, { href: '#features', text: 'Features' }, { href: '#testimonials', text: 'Testimonials' }, { href: '#faq', text: 'FAQ' }, { href: '#contact', text: 'Contact' }] },
  { title: 'Services', links: [{ text: 'Petrol & Diesel' }, { text: 'LPG Gas' }, { text: 'Lubricants' }] }
]

const Footer = () => {
  const { theme } = useAppContext()

  return (
    <FooterContainer theme={theme}>
      <FooterContent>
        {footerSections.map((section, idx) => (
          <FooterSection key={idx}>
            <FooterTitle theme={theme}>{section.title}</FooterTitle>
            {section.items?.map((item, i) => <p key={i}>{item}</p>)}
            {section.links?.map((link, i) => (
              <FooterLink key={i} theme={theme} href={link.href}>{link.text}</FooterLink>
            ))}
          </FooterSection>
        ))}
      </FooterContent>
      <FooterBottom theme={theme}>
        <p>&copy; 2024 Indian Oil Corporation. All rights reserved.</p>
      </FooterBottom>
    </FooterContainer>
  )
}

export default Footer

