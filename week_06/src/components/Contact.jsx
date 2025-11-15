import React from 'react'
import { useAppContext } from '../context/AppContext.jsx'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck } from '@fortawesome/free-solid-svg-icons'
import { 
  ContactContainer, 
  ContactTitle, 
  ContactForm, 
  FormGroup, 
  FormLabel, 
  FormInput, 
  FormTextarea, 
  SubmitButton,
  SuccessMessage
} from '../styles/ContactStyles.jsx'

const formFields = [
  { id: 'name', label: 'Name', type: 'text', component: 'input' },
  { id: 'email', label: 'Email', type: 'email', component: 'input' },
  { id: 'message', label: 'Message', component: 'textarea', rows: 5 }
]

const Contact = () => {
  const { theme, contactData, updateContactData } = useAppContext()
  const [submitted, setSubmitted] = React.useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => {
      setSubmitted(false)
      Object.keys(contactData).forEach(key => updateContactData(key, ''))
    }, 3000)
  }

  return (
    <ContactContainer id="contact" theme={theme}>
      <ContactTitle theme={theme}>Contact Us</ContactTitle>
      <ContactForm onSubmit={handleSubmit} theme={theme}>
        {formFields.map(field => (
          <FormGroup key={field.id}>
            <FormLabel theme={theme} htmlFor={field.id}>{field.label}</FormLabel>
            {field.component === 'textarea' ? (
              <FormTextarea
                theme={theme}
                id={field.id}
                rows={field.rows}
                value={contactData[field.id]}
                onChange={(e) => updateContactData(field.id, e.target.value)}
                required
              />
            ) : (
              <FormInput
                theme={theme}
                type={field.type}
                id={field.id}
                value={contactData[field.id]}
                onChange={(e) => updateContactData(field.id, e.target.value)}
                required
              />
            )}
          </FormGroup>
        ))}

        {submitted && (
          <SuccessMessage theme={theme}>
            <FontAwesomeIcon icon={faCheck} /> Thank you! Your message has been sent.
          </SuccessMessage>
        )}

        <SubmitButton type="submit" theme={theme}>Send Message</SubmitButton>
      </ContactForm>
    </ContactContainer>
  )
}

export default Contact

