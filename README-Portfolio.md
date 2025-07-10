# Shashank Reddy - Portfolio Website

A modern, responsive portfolio website built with React, TypeScript, and Vite. This project showcases the professional skills, projects, and experience of Shashank Reddy, a Software Engineer specializing in full-stack development and autonomous systems.

## About

This portfolio website represents Shashank Reddy, a software engineer with:

- MS in Computer Science from Arizona State University
- Current role at Woven AI (Toyota subsidiary) working on autonomous driving technology
- Expertise in Java, Spring Boot, React, AWS, and cloud technologies
- Experience in building scalable microservices and real-time systems
- Based in Phoenix, Arizona

## Features

- **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices
- **Modern UI/UX**: Clean, professional design with smooth animations and particle effects
- **TypeScript**: Full type safety and better development experience
- **Fast Performance**: Built with Vite for optimal build performance
- **Modular Components**: Well-organized, reusable React components
- **Smooth Scrolling**: Navigation with smooth scroll effects
- **Interactive Elements**: Typewriter effect, animated skill bars, and counters
- **Project Showcase**: Portfolio section with filtering capabilities and modal popups
- **Contact Form**: Functional contact form with validation
- **Social Integration**: Links to professional social media profiles
- **Dynamic Backgrounds**: Particle system and geometric animations

## Tech Stack

- **React 19+**: Modern React with hooks
- **TypeScript**: Type-safe JavaScript
- **Vite**: Fast build tool and dev server
- **CSS3**: Modern CSS with flexbox, grid, and animations
- **ESLint**: Code linting and formatting

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Install dependencies:

```bash
npm install
```

2. Start the development server:

```bash
npm run dev
```

3. Open your browser and navigate to `http://localhost:5173`

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Navbar/         # Navigation component
│   ├── Home/           # Hero section
│   ├── About/          # About section with skills
│   ├── Portfolio/      # Projects showcase
│   ├── Training/       # Education and training
│   ├── Contact/        # Contact form
│   ├── Footer/         # Footer component
│   └── Social/         # Social media links
├── types/              # TypeScript type definitions
├── App.tsx            # Main app component
├── index.css          # Global styles
└── main.tsx           # App entry point
```

## Customization

### Personal Information

Update the following components with your personal information:

- `src/components/Home/Home.tsx` - Your name and title
- `src/components/About/About.tsx` - Your bio and skills
- `src/components/Contact/Contact.tsx` - Your contact information

### Projects

Add your projects in `src/components/Portfolio/Portfolio.tsx`

### Styling

Each component has its own CSS file for easy customization.

## Deployment

### Build for Production

```bash
npm run build
```

The build artifacts will be stored in the `dist/` directory.

## License

This project is licensed under the MIT License.
