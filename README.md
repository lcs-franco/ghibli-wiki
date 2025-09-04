# 🎬 Studio Ghibli Wiki

> **⚠️ This project is currently in development**

A modern, interactive wiki application for exploring the magical world of Studio Ghibli films. Built with Next.js 15 and featuring comprehensive information about films, characters, locations, species, and vehicles from the legendary animation studio.

## ✨ Features

- **🎭 Comprehensive Film Database**: Browse all Studio Ghibli films with detailed information including ratings, directors, producers, and descriptions
- **👥 Character Profiles**: Explore memorable characters with their species, gender, and film appearances
- **🗺️ Magical Locations**: Discover the enchanting places and settings from Ghibli films
- **🌿 Species & Creatures**: Learn about the various species and magical creatures in the Ghibli universe
- **🚗 Vehicles & Transports**: Explore unique and magical transportation from the films
- **🔍 Advanced Search & Filtering**: Search across all content with filters for directors, decades, ratings, and more
- **📱 Responsive Design**: Beautiful, mobile-first design that works on all devices
- **🎨 Custom UI Components**: Built with Radix UI and Tailwind CSS for accessibility and performance
- **⚡ Real-time Data**: Powered by React Query for efficient data fetching and caching
- **🎪 Interactive Carousels**: Featured films with autoplay carousels and smooth animations
- **🔗 Related Content Discovery**: Smart suggestions for related films, characters, and locations

## 🛠️ Tech Stack

### Frontend

- **Next.js 15** - React framework with App Router
- **React 19** - Latest React with concurrent features
- **TypeScript** - Type-safe development
- **Tailwind CSS 4** - Utility-first CSS framework
- **Framer Motion** - Smooth animations and transitions

### UI & Components

- **Radix UI** - Accessible, unstyled UI primitives
- **Lucide React** - Beautiful icon library
- **Embla Carousel** - Touch-friendly carousel component
- **Class Variance Authority** - Component variant management

### Data Management

- **TanStack Query** - Server state management and caching
- **Axios** - HTTP client for API requests
- **React Context** - Global state management for filters and search

### Development Tools

- **ESLint** - Code linting and quality
- **Prettier** - Code formatting
- **Husky** - Git hooks for quality assurance
- **Commitlint** - Conventional commit messages
- **TypeScript** - Static type checking

### Data Source

- **Ghibli API** - Official Studio Ghibli API (ghibliapi.vercel.app)

## 🚀 Getting Started

### Prerequisites

- Node.js 20.x or higher
- npm

### Installation

1. Clone the repository:

```bash
git clone https://github.com/your-username/ghibli-wiki.git
cd ghibli-wiki
```

2. Install dependencies:

```bash
npm install
```

3. Run the development server:

```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── films/             # Film-related pages and components
│   ├── people/            # Character pages and components
│   ├── locations/         # Location pages and components
│   └── page.tsx           # Home page
├── components/            # Reusable UI components
│   ├── ui/               # Base UI components (Radix UI)
│   └── ...               # Feature-specific components
├── lib/                   # Core application logic
│   ├── contexts/         # React contexts
│   ├── hooks/            # Custom React hooks
│   ├── services/         # API services
│   └── types/            # TypeScript type definitions
└── utils/                # Utility functions
```

## 🎯 Key Features Implementation

### Search & Filtering System

- Global search across all content types
- Advanced filtering by director, decade, rating, species, gender, climate, and terrain
- Real-time search with debounced input
- Context-based filter management

### Data Architecture

- Type-safe API integration with TypeScript
- Efficient data fetching with React Query
- Optimistic updates and error handling
- Infinite scroll and pagination support

### UI/UX Design

- Mobile-first responsive design
- Custom masked images with SVG shapes
- Smooth animations and transitions
- Loading states and error boundaries
- Accessible components with ARIA support

## 📄 License

This project is for educational purposes and uses data from the [Studio Ghibli API](https://ghibliapi.vercel.app/).

## 🙏 Acknowledgments

- [Studio Ghibli](https://www.ghibli.jp/) for creating these magical films
- [Ghibli API](https://ghibliapi.vercel.app/) for providing the data
