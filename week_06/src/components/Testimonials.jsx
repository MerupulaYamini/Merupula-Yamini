import React from 'react'
import { useAppContext } from '../context/AppContext.jsx'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faQuoteLeft, faStar } from '@fortawesome/free-solid-svg-icons'
import { 
  TestimonialsContainer, 
  TestimonialsTitle, 
  TestimonialsGrid, 
  TestimonialCard,
  QuoteIcon,
  TestimonialText,
  TestimonialAuthor,
  TestimonialRole,
  StarRating
} from '../styles/TestimonialsStyles.jsx'

const testimonials = [
  {
    id: 1,
    text: 'Indian Oil has been our trusted partner for years. Their quality fuel and excellent service keep our vehicles running smoothly.',
    author: 'Rajesh Kumar',
    role: 'Transport Business Owner',
    rating: 5
  },
  {
    id: 2,
    text: 'The LPG gas delivery is always on time, and the quality is consistently excellent. Highly recommended for all households.',
    author: 'Priya Sharma',
    role: 'Homemaker',
    rating: 5
  },
  {
    id: 3,
    text: 'Best lubricants in the market. Our fleet has been using Indian Oil products for over a decade with zero issues.',
    author: 'Amit Patel',
    role: 'Fleet Manager',
    rating: 5
  }
]

const Testimonials = () => {
  const { theme } = useAppContext()

  return (
    <TestimonialsContainer id="testimonials" theme={theme}>
      <TestimonialsTitle theme={theme}>What Our Customers Say</TestimonialsTitle>
      <TestimonialsGrid>
        {testimonials.map(testimonial => (
          <TestimonialCard key={testimonial.id} theme={theme}>
            <QuoteIcon theme={theme}>
              <FontAwesomeIcon icon={faQuoteLeft} />
            </QuoteIcon>
            <StarRating>
              {[...Array(testimonial.rating)].map((_, i) => (
                <FontAwesomeIcon key={i} icon={faStar} />
              ))}
            </StarRating>
            <TestimonialText theme={theme}>{testimonial.text}</TestimonialText>
            <TestimonialAuthor theme={theme}>{testimonial.author}</TestimonialAuthor>
            <TestimonialRole theme={theme}>{testimonial.role}</TestimonialRole>
          </TestimonialCard>
        ))}
      </TestimonialsGrid>
    </TestimonialsContainer>
  )
}

export default Testimonials

