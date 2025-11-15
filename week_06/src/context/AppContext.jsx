import React, { createContext, useState, useContext } from 'react'

// Create the Context
const AppContext = createContext()

// Provider Component
export const AppProvider = ({ children }) => {
  // Global State - Theme (Dark/Light Mode)
  const [theme, setTheme] = useState('light')
  
  // Global State - Selected Service
  const [selectedService, setSelectedService] = useState(null)
  
  // Global State - Contact Form Data
  const [contactData, setContactData] = useState({
    name: '',
    email: '',
    message: ''
  })

  // Toggle Theme Function
  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light')
  }

  // Update Contact Data Function
  const updateContactData = (field, value) => {
    setContactData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  // Select Service Function
  const selectService = (serviceName) => {
    setSelectedService(serviceName)
  }

  // Context Value
  const value = {
    theme,
    toggleTheme,
    selectedService,
    selectService,
    contactData,
    updateContactData
  }

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  )
}

// Custom Hook to use the Context
export const useAppContext = () => {
  const context = useContext(AppContext)
  if (!context) {
    throw new Error('useAppContext must be used within AppProvider')
  }
  return context
}

