// Common breakpoints for responsive design
export const breakpoints = {
  mobile: '576px',
  tablet: '768px',
  desktop: '992px',
  large: '1200px'
};

// Media query helpers
export const media = {
  mobile: `@media (max-width: ${breakpoints.mobile})`,
  tablet: `@media (max-width: ${breakpoints.tablet})`,
  desktop: `@media (max-width: ${breakpoints.desktop})`,
  large: `@media (max-width: ${breakpoints.large})`
};
