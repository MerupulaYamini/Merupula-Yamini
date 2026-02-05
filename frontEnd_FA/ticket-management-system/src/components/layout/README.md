# Reusable Layout Components

## MainLayout Component

The `MainLayout` component provides a consistent header and sidebar that can be reused across all pages in the TicketFlow application.

### Features

- **Reusable Header**: TicketFlow logo and user avatar with logout functionality
- **Navigation Sidebar**: Menu items with active state management
- **Automatic Routing**: Menu clicks navigate to appropriate pages
- **Responsive Design**: Works on desktop and mobile devices
- **Consistent Styling**: Uses styled-components with no inline styles

### Usage

```jsx
import MainLayout from '../../components/layout/MainLayout';

const YourPage = () => {
  return (
    <MainLayout>
      {/* Your page content goes here */}
      <h1>Page Title</h1>
      <p>Page content...</p>
    </MainLayout>
  );
};
```

### File Structure

```
src/components/layout/
├── MainLayout.jsx     # Main layout component
├── layout.styles.js   # Styled components for layout
└── README.md         # This documentation
```

### Navigation Menu Items

- **Dashboard** (`/dashboard`) - Main dashboard with pending registrations and tickets
- **User Management** (`/user-management`) - User administration page
- **Create Ticket** (`/create-ticket`) - Ticket creation page

### Benefits of This Architecture

1. **DRY Principle**: Header and sidebar code is written once, used everywhere
2. **Consistent UX**: Same navigation experience across all pages
3. **Easy Maintenance**: Layout changes only need to be made in one place
4. **Scalable**: Easy to add new pages that use the same layout
5. **Clean Code**: Page components focus only on their specific content

### Example Pages Using MainLayout

- `src/pages/dashboard/Dashboard.jsx`
- `src/pages/user-management/UserManagement.jsx`
- `src/pages/create-ticket/CreateTicket.jsx`

### Adding New Pages

1. Create your page component
2. Import and wrap content with `MainLayout`
3. Add route to `src/App.jsx`
4. Optionally add menu item to `MainLayout.jsx`

```jsx
// New page example
import MainLayout from '../../components/layout/MainLayout';

const NewPage = () => {
  return (
    <MainLayout>
      <h1>New Page</h1>
      <p>Your content here...</p>
    </MainLayout>
  );
};
```

This architecture ensures all pages have the same professional look and navigation while keeping the code maintainable and scalable.