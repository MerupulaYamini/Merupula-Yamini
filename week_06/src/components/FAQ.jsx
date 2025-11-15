import React from 'react'
import { useAppContext } from '../context/AppContext.jsx'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons'
import { 
  FAQContainer, 
  FAQTitle, 
  FAQList, 
  FAQItem,
  FAQQuestion,
  FAQAnswer,
  FAQIcon
} from '../styles/FAQStyles.jsx'

const faqs = [
  {
    id: 1,
    question: 'What types of fuel do you offer?',
    answer: 'We offer a wide range of high-quality fuels including Petrol, Diesel, and LPG gas. All our products meet international quality standards and are certified for safe use.'
  },
  {
    id: 2,
    question: 'How can I order fuel or LPG gas?',
    answer: 'You can contact us through our website, call our customer service hotline, or visit any of our authorized dealers. We also offer online ordering and home delivery services for your convenience.'
  },
  {
    id: 3,
    question: 'What safety measures do you follow?',
    answer: 'Safety is our top priority. We follow strict safety protocols, conduct regular quality checks, and ensure all our products are stored and transported according to international safety standards. Our staff is trained in safety procedures.'
  },
  {
    id: 4,
    question: 'Do you provide delivery services?',
    answer: 'Yes, we provide fast and reliable delivery services for both fuel and LPG gas. Our delivery network covers most areas, and we ensure timely delivery to your location.'
  },
  {
    id: 5,
    question: 'What payment methods do you accept?',
    answer: 'We accept cash, credit/debit cards, UPI, and other digital payment methods. We also offer flexible payment options for bulk orders and regular customers.'
  }
]

const FAQ = () => {
  const { theme } = useAppContext()
  const [openFAQ, setOpenFAQ] = React.useState(null)

  const toggleFAQ = (id) => {
    setOpenFAQ(openFAQ === id ? null : id)
  }

  return (
    <FAQContainer id="faq" theme={theme}>
      <FAQTitle theme={theme}>Frequently Asked Questions</FAQTitle>
      <FAQList>
        {faqs.map(faq => (
          <FAQItem key={faq.id} theme={theme}>
            <FAQQuestion 
              onClick={() => toggleFAQ(faq.id)} 
              theme={theme}
              isOpen={openFAQ === faq.id}
            >
              <span>{faq.question}</span>
              <FAQIcon>
                <FontAwesomeIcon icon={openFAQ === faq.id ? faChevronUp : faChevronDown} />
              </FAQIcon>
            </FAQQuestion>
            {openFAQ === faq.id && (
              <FAQAnswer theme={theme}>
                {faq.answer}
              </FAQAnswer>
            )}
          </FAQItem>
        ))}
      </FAQList>
    </FAQContainer>
  )
}

export default FAQ

