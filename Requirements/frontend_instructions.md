# Valentine's AI Gift Suggestion App - Frontend Instructions

## App Overview
The Valentine's AI Gift Suggestion App is a romantic, AI-powered web application that helps users find the perfect gift for their significant other. Using OpenAI's API, the app generates personalized gift suggestions based on the partner's hobbies and preferences. The app features a love-themed design with elegant animations of hearts and flowers.

## Design Theme
- Primary color palette: Various shades of pink (#FF69B4, #FFB6C1, #FFC0CB)
- Secondary colors: White (#FFFFFF) and Red (#FF0000)
- Romantic elements: Floating hearts and flower animations
- Typography: Elegant, romantic fonts for headings (e.g., "Dancing Script")
- Modern, clean font for body text (e.g., "Poppins" or "Montserrat")

## App Flow

### 1. Landing Page
- Full-screen romantic background with subtle floating hearts and flower animations
- Centered content with app title and brief description
- Large, attractive "Find the Perfect Gift" CTA button
- Smooth transition animations between sections

### 2. Gift Questionnaire Form
- Clean, card-style form layout
- Input fields for:
  - Partner's name
  - Age range
  - Hobbies (multiple input)
  - Interests
  - Favorite colors
  - Price range preference
  - Special occasions or preferences
  - Any allergies or dislikes
- Progress indicator
- Animated transitions between form sections
- Form validation with helpful error messages

### 3. Results Page
- Loading animation while AI generates suggestions
- Display 3-5 gift suggestions, each containing:
  - Gift image
  - Gift name and description
  - Price range
  - Purchase link
  - Why this gift matches their preferences
- Option to regenerate suggestions
- Share buttons for social media
- Save/bookmark favorite suggestions

## Key Features

### 1. Animations and Visual Elements
- Floating hearts and flower petals on landing page
- Smooth page transitions
- Loading animations
- Micro-interactions for buttons and form elements

### 2. AI Integration
- OpenAI API integration for personalized gift suggestions
- Smart preference analysis
- Natural language processing for user inputs

### 3. User Experience
- Mobile-responsive design
- Intuitive navigation
- Form auto-save functionality
- Error handling and validation
- Loading states and feedback

### 4. Additional Features
- Gift suggestion history
- Favorite/bookmark system
- Share functionality
- Price comparison links
- Gift reminder system

## Technical Requirements
- React.js for frontend development
- Tailwind CSS for styling
- Framer Motion for animations
- OpenAI API integration
- Responsive design (mobile-first approach)
- Modern browser compatibility
- Optimized performance
- Secure API handling

## Performance Considerations
- Optimize animations for performance
- Lazy loading for images
- Efficient API calls
- Caching strategies
- Progressive web app capabilities

## Accessibility
- WCAG 2.1 compliance
- Keyboard navigation
- Screen reader compatibility
- Color contrast requirements
- Alt text for images

## Security
- Secure API key handling
- Input sanitization
- Rate limiting
- Data privacy compliance

## project structure
VALAI-APP/
├── app/
├── lib/
├── node_modules/
├── public/
├── Requirements/
│   └── frontend_instructions.md
├── .gitignore
├── components.json
├── eslint.config.mjs
├── next-env.d.ts
├── next.config.ts
├── package-lock.json
├── package.json
├── postcss.config.mjs
├── README.md
├── tailwind.config.ts
└── tsconfig.json

## rules 
- all new pages should go in /app and be named like example-page.tsx unless otherwise specified 
- all new components should go in /components 
