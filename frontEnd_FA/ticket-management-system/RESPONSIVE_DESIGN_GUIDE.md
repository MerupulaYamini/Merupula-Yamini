# Responsive Design Implementation Guide

## Overview
This guide provides the steps to make the entire TicketFlow website responsive for mobile, tablet, and desktop devices.

## Breakpoints
```javascript
const breakpoints = {
  mobile: '576px',    // Small phones
  tablet: '768px',    // Tablets
  desktop: '992px',   // Small desktops
  large: '1200px'     // Large desktops
};
```

## Files to Update

### 1. Layout Components
**File: `src/components/layout/layout.styles.js`**
- ✅ Already updated with responsive styles
- Header: Sticky positioning, smaller padding on mobile
- Sidebar: Hidden on mobile/tablet (can add hamburger menu)
- Logo: Hides text on very small screens
- Content: Reduced padding on mobile

### 2. Dashboard Styles (Shared)
**File: `src/pages/dashboard/dashboard.styles.js`**

Key changes needed:
```javascript
// Page titles
export const PageTitle = styled.h1`
  font-size: 28px;
  @media (max-width: 768px) { font-size: 24px; }
  @media (max-width: 576px) { font-size: 20px; }
`;

// Cards - use max-width instead of fixed width
export const PendingCard = styled(Card)`
  width: 100%;
  max-width: 1034px;
  // Remove fixed height, use min-height
`;

// Filters - stack vertically on mobile
export const TicketFilters = styled.div`
  display: flex;
  gap: 12px;
  @media (max-width: 992px) {
    flex-direction: column;
  }
`;

// Tables - make scrollable on mobile
export const TicketTable = styled.div`
  @media (max-width: 768px) {
    overflow-x: auto;
  }
`;

// Table rows - adjust grid columns
export const TableRow = styled.div`
  display: grid;
  grid-template-columns: 100px 2fr 120px 120px 150px 120px 100px;
  
  @media (max-width: 992px) {
    grid-template-columns: 80px 1.5fr 100px 100px 120px 100px 80px;
  }
  
  @media (max-width: 768px) {
    // Make table scrollable or use card layout
    min-width: 800px;
  }
`;
```

### 3. Auth Pages
**Files: `src/pages/auth/auth.styles.js`**

```javascript
export const AuthCard = styled(Card)`
  width: 100%;
  max-width: 450px;
  padding: 40px;
  
  @media (max-width: 576px) {
    padding: 24px;
    margin: 16px;
  }
`;

export const BrandTitle = styled.h1`
  font-size: 32px;
  @media (max-width: 576px) {
    font-size: 24px;
  }
`;
```

### 4. Profile Page
**File: `src/pages/profile/profile.styles.js`**

```javascript
export const ProfileContent = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 24px;
  
  @media (max-width: 768px) {
    gap: 16px;
  }
`;

export const ProfileSection = styled.div`
  padding: 24px;
  
  @media (max-width: 576px) {
    padding: 16px;
  }
`;
```

### 5. Ticket Details
**File: `src/pages/ticket-details/ticket-details.styles.js`**

```javascript
export const TicketContent = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 24px;
  
  @media (max-width: 992px) {
    grid-template-columns: 1fr;
  }
`;

export const TicketHeader = styled.div`
  display: flex;
  justify-content: space-between;
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 16px;
  }
`;
```

### 6. Create/Edit Ticket
**Files: `src/pages/create-ticket/create-ticket.styles.js`, `src/pages/edit-ticket/edit-ticket.styles.js`**

```javascript
export const FormContainer = styled.div`
  max-width: 800px;
  
  @media (max-width: 768px) {
    max-width: 100%;
  }
`;

export const ButtonGroup = styled.div`
  display: flex;
  gap: 12px;
  
  @media (max-width: 576px) {
    flex-direction: column-reverse;
    
    button {
      width: 100%;
    }
  }
`;
```

### 7. User Management
**File: `src/pages/user-management/user-management.styles.js`**

```javascript
export const UserManagementTable = styled.div`
  @media (max-width: 768px) {
    overflow-x: auto;
  }
`;

export const UserTableRow = styled.div`
  display: grid;
  grid-template-columns: 2fr 2fr 120px 100px 120px;
  
  @media (max-width: 992px) {
    grid-template-columns: 1.5fr 1.5fr 100px 80px 100px;
  }
  
  @media (max-width: 768px) {
    min-width: 700px;
  }
`;
```

## Implementation Steps

1. **Add breakpoints constant** to each style file
2. **Update fixed widths** to use `max-width` and percentages
3. **Make grids responsive** using media queries
4. **Stack elements vertically** on mobile (flex-direction: column)
5. **Reduce padding/margins** on smaller screens
6. **Make tables scrollable** on mobile
7. **Adjust font sizes** for readability
8. **Test on different screen sizes**

## Testing Checklist

- [ ] Mobile (320px - 576px)
- [ ] Tablet (577px - 768px)
- [ ] Desktop (769px - 992px)
- [ ] Large Desktop (993px+)

Test each page:
- [ ] Login/Register
- [ ] Dashboard
- [ ] My Tickets
- [ ] Ticket Details
- [ ] Create Ticket
- [ ] Edit Ticket
- [ ] Profile
- [ ] User Management

## Quick Wins

1. **Use Chrome DevTools** responsive mode to test
2. **Start with layout** (header, sidebar, content)
3. **Then update tables** (most critical for mobile)
4. **Finally polish** forms and cards

## Common Patterns

```javascript
// Responsive padding
padding: 24px;
@media (max-width: 768px) { padding: 16px; }
@media (max-width: 576px) { padding: 12px; }

// Responsive font sizes
font-size: 28px;
@media (max-width: 768px) { font-size: 24px; }
@media (max-width: 576px) { font-size: 20px; }

// Responsive flex direction
display: flex;
@media (max-width: 768px) { flex-direction: column; }

// Responsive grid
display: grid;
grid-template-columns: 1fr 1fr 1fr;
@media (max-width: 992px) { grid-template-columns: 1fr 1fr; }
@media (max-width: 576px) { grid-template-columns: 1fr; }

// Full width on mobile
width: 250px;
@media (max-width: 576px) { width: 100%; }
```

## Priority Order

1. **High Priority** (Most used pages)
   - Dashboard
   - Ticket Details
   - My Tickets
   - Login/Register

2. **Medium Priority**
   - Profile
   - Create Ticket
   - Edit Ticket

3. **Low Priority**
   - User Management (Admin only)

## Notes

- The layout.styles.js has already been updated with responsive styles
- Focus on making tables scrollable on mobile rather than trying to reflow them
- Use `overflow-x: auto` for horizontal scrolling on small screens
- Consider adding a hamburger menu for mobile navigation
- Test with real devices when possible, not just browser DevTools
