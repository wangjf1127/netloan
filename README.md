# StartTrek

A modern Next.js application built with TypeScript and Tailwind CSS using Feature-based architecture.

## 🏗️ Architecture

This project follows a **Feature-based** folder structure, organizing code by functionality rather than file type. This approach provides better maintainability, scalability, and team collaboration.

## 📁 Project Structure

\`\`\`
startrek/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── globals.css        # Global styles
│   │   ├── layout.tsx         # Root layout
│   │   └── page.tsx           # Home page
│   ├── features/              # Feature modules
│   │   ├── navigation/        # Navigation feature
│   │   │   ├── components/    # Navigation components
│   │   │   ├── config/        # Navigation configuration
│   │   │   └── types/         # Navigation types
│   │   └── home/              # Home page feature
│   │       ├── components/    # Home page components
│   │       ├── config/        # Home page configuration
│   │       └── types/         # Home page types
│   ├── shared/                # Shared components and utilities
│   │   └── components/        # Reusable UI components
│   │       └── ui/            # Base UI components
│   ├── lib/                   # Utility libraries
│   │   ├── utils.ts          # Common utilities
│   │   └── api-client.ts     # API client
│   └── types/                 # Global type definitions
│       └── global.ts         # Global types
├── public/                    # Static assets
├── next.config.ts            # Next.js configuration
├── tailwind.config.ts        # Tailwind configuration
├── tsconfig.json             # TypeScript configuration
└── package.json              # Dependencies and scripts
\`\`\`

## 🚀 Features

- ⚡ **Next.js 15** - Latest version with App Router
- 🔷 **TypeScript** - Full type safety
- 🎨 **Tailwind CSS** - Utility-first CSS framework
- 🏗️ **Feature-based Architecture** - Organized by functionality
- 📱 **Responsive Design** - Mobile-first approach
- 🔧 **Reusable Components** - Shared UI component library
- 🛠️ **Developer Experience** - Optimized tooling and configuration

## 🏛️ Feature-based Architecture Benefits

1. **Better Organization** - Code is grouped by feature, not file type
2. **Improved Maintainability** - Easy to locate and modify feature-specific code
3. **Enhanced Scalability** - New features can be added without affecting existing ones
4. **Team Collaboration** - Multiple developers can work on different features simultaneously
5. **Code Reusability** - Shared components and utilities are centralized

## 📦 Feature Structure

Each feature follows a consistent structure:

\`\`\`
feature-name/
├── components/     # Feature-specific components
├── hooks/         # Feature-specific custom hooks
├── services/      # API calls and business logic
├── types/         # Feature-specific type definitions
├── utils/         # Feature-specific utilities
└── config/        # Feature configuration and constants
\`\`\`

## 🛠️ Getting Started

1. Install dependencies:
\`\`\`bash
npm install
\`\`\`

2. Run the development server:
\`\`\`bash
npm run dev
\`\`\`

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📝 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run vercel:production` - Deploy to Vercel production
- `npm run vercel:preview` - Deploy to Vercel preview

## 🚀 Deployment

This project is configured for deployment to Vercel via GitLab:

- **GitLab Repository**: Push code to GitLab
- **Vercel Integration**: Automatic deployment via GitLab integration
- **CI/CD Pipeline**: GitLab CI/CD with Vercel deployment

See `GITLAB_VERCEL_DEPLOYMENT.md` for detailed deployment instructions.

## 🎯 Adding New Features

To add a new feature:

1. Create a new folder in `src/features/`
2. Follow the feature structure pattern
3. Export components from the feature
4. Import and use in your pages or other features

Example:
\`\`\`typescript
// src/features/user-profile/components/profile-card.tsx
export function ProfileCard() {
  // Component implementation
}

// src/app/profile/page.tsx
import { ProfileCard } from '@/features/user-profile/components/profile-card'
\`\`\`

## 🔗 Path Aliases

The project uses TypeScript path aliases for clean imports:

- `@/*` - Root src directory
- `@/app/*` - App router files
- `@/features/*` - Feature modules
- `@/shared/*` - Shared components and utilities
- `@/lib/*` - Utility libraries
- `@/types/*` - Type definitions

## 📚 Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [TypeScript Documentation](https://www.typescriptlang.org/docs)
- [Feature-Driven Development](https://en.wikipedia.org/wiki/Feature-driven_development)
