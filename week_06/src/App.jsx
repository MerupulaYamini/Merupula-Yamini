import React from 'react'
import { useAppContext } from './context/AppContext.jsx'
import Header from './components/Header.jsx'
import Hero from './components/Hero.jsx'
import Services from './components/Services.jsx'
import Features from './components/Features.jsx'
import Testimonials from './components/Testimonials.jsx'
import FAQ from './components/FAQ.jsx'
import Contact from './components/Contact.jsx'
import Footer from './components/Footer.jsx'
import { AppContainer } from './styles/AppStyles.jsx'

const App = () => {
  const { theme } = useAppContext()

  return (
    <AppContainer theme={theme}>
      <Header />
      <Hero />
      <Services />
      <Features />
      <Testimonials />
      <FAQ />
      <Contact />
      <Footer />
    </AppContainer>
  )
}

export default App

