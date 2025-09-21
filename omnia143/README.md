# Omnia - Enchanted Story Realms

A progressive web app designed for people with developmental issues, featuring accessible storytelling through multiple media formats.

## Features

- **Interactive Landing Page**: Three clickable orbs representing different content realms
- **Story Realm**: Written stories with scrollable parchment-style interface
- **Audio Galaxy**: Audio content with album covers and playback controls
- **Visual Cosmos**: Future video content (placeholder)
- **Accessibility Focused**: Large touch targets, clear navigation, and intuitive design
- **PWA Ready**: Installable on mobile devices with offline capabilities

## Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Deployment**: Vercel (ready)

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
omnia143/
├── app/
│   ├── globals.css          # Global styles and CSS variables
│   ├── layout.tsx           # Root layout with PWA meta tags
│   └── page.tsx             # Main landing page component
├── public/
│   └── manifest.json        # PWA manifest
├── package.json
├── tailwind.config.js
├── tsconfig.json
└── next.config.js
```

## Accessibility Features

- Large, clear touch targets for easy interaction
- High contrast colors for better visibility
- Simple, intuitive navigation
- Clear visual feedback for interactions
- Keyboard navigation support
- Screen reader friendly markup

## Deployment

The app is configured for easy deployment on Vercel:

1. Push to GitHub
2. Connect repository to Vercel
3. Deploy automatically

## Future Enhancements

- Firebase integration for content management
- User progress tracking
- Customizable themes
- Voice narration
- Interactive story elements
- Social sharing features

## Contributing

This project is designed with accessibility in mind. When contributing, please ensure:
- All interactive elements are keyboard accessible
- Color contrast meets WCAG guidelines
- Touch targets are at least 44px
- Text is readable and well-spaced
