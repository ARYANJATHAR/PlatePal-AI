# PlatePal AI

A modern, AI-powered menu translation and explanation service built with Next.js, React, and Tailwind CSS. Instantly understand any menu with cultural insights, ingredient breakdowns, and allergen alerts.

## Features

- 🤖 **Instant Translation** - Powered by Google Gemini AI
- 📸 **Image Recognition** - Upload or capture menu photos
- 🌍 **Multi-Language Support** - 100+ languages
- ⚠️ **Allergen Alerts** - 24+ tracked allergens
- 🍽️ **Cultural Context** - Learn about dishes and dining customs
- 🎨 **Modern UI/UX** - Beautiful glass-morphism design with Framer Motion animations
- 📱 **Responsive Design** - Works seamlessly on desktop, tablet, and mobile
- 🔒 **Privacy First** - Images are encrypted and auto-deleted post-translation

## Tech Stack

- **Framework**: [Next.js 14](https://nextjs.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **AI/ML**: [Google Gemini API](https://ai.google.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)

## Getting Started

### Prerequisites

- Node.js 16.8 or later
- npm, yarn, pnpm, or bun
- Google Gemini API key

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd platepal-ai
```

2. Install dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Create environment variables file (`.env.local`):
```bash
NEXT_PUBLIC_GEMINI_API_KEY=your_gemini_api_key_here
```

### Running the Development Server

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

### Building for Production

```bash
npm run build
npm run start
```

## Project Structure

```
├── app/
│   ├── layout.tsx          # Root layout with metadata
│   ├── page.tsx            # Main application page
│   └── globals.css         # Global styles and gradients
├── components/
│   ├── Header.tsx          # Navigation header
│   ├── Hero.tsx            # Hero section with call-to-action
│   ├── MenuUploader.tsx    # File upload interface
│   ├── ResultsDisplay.tsx  # Results container
│   ├── MenuItemCard.tsx    # Individual menu item card
│   ├── Loader.tsx          # Loading spinner
│   └── Footer.tsx          # Footer component
├── services/
│   └── geminiService.ts    # Gemini API integration
├── types.ts                # TypeScript type definitions
├── tailwind.config.ts      # Tailwind configuration
├── next.config.js          # Next.js configuration
└── package.json            # Dependencies and scripts
```

## Design System

### Colors

- **Brand Primary**: #4f46e5 (Indigo)
- **Brand Accent**: #22d3ee (Cyan)
- **Surface**: #0f172a (Dark Navy)
- **Surface Soft**: #1e293b

### Components

- **Glass Panel**: Frosted glass effect with backdrop blur
- **Hero Gradient**: Multi-color radial gradient background
- **Smooth Animations**: Framer Motion for entrance animations and interactions

## Environment Variables

Create a `.env.local` file in the root directory:

```bash
NEXT_PUBLIC_GEMINI_API_KEY=your_gemini_api_key_here
```

Get your free API key at [Google AI Studio](https://aistudio.google.com/)

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License.

## Support

For support, please open an issue on the GitHub repository.

---

Built with ❤️ for curious travelers and food enthusiasts.