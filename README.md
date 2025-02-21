# AI Preprint Forge Frontend

A modern, chat-based interface for AI Preprint Forge built with Next.js 14, TypeScript, and Tailwind CSS.

## Features

- 🎯 Clean, minimal chat interface
- 📑 Real-time paper generation tracking
- 📊 Paper history sidebar with GitHub repository links
- 🌙 Dark mode support
- 🎨 Customizable theme using Tailwind CSS
- 📱 Responsive design
- 🔄 Real-time updates

## Tech Stack

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- shadcn/ui components
- React Query for data fetching
- Lucide React for icons

## Getting Started

1. Clone the repository:
```bash
git clone https://github.com/yourusername/preprint-forge-frontend.git
cd preprint-forge-frontend
```

2. Install dependencies:
```bash
pnpm install
```

3. Copy the environment variables:
```bash
cp .env.example .env.local
```

4. Update the environment variables in `.env.local`:
```
NEXT_PUBLIC_API_URL=http://localhost:8000
```

5. Start the development server:
```bash
pnpm dev
```

The application will be available at http://localhost:3000.

## Project Structure

```
src/
├── app/                 # Next.js app router
│   ├── api/            # API routes
│   ├── layout.tsx      # Root layout
│   └── page.tsx        # Home page
├── components/         # React components
│   ├── ui/            # Reusable UI components
│   ├── paper-list.tsx # Paper listing sidebar
│   └── chat-interface.tsx # Chat interface
├── lib/               # Utility functions
├── types/             # TypeScript types
└── styles/            # Global styles
```

## API Integration

The frontend communicates with the AI Preprint Forge backend through RESTful API endpoints:

- `GET /api/papers` - Fetch generated papers
- `POST /api/generate` - Generate new paper

## Contributing

1. Fork the repository
2. Create a new branch: `git checkout -b feature/your-feature`
3. Make your changes and commit: `git commit -m 'Add new feature'`
4. Push to the branch: `git push origin feature/your-feature`
5. Submit a pull request

## Development Best Practices

- Follow TypeScript best practices and maintain strict type checking
- Use ESLint and Prettier for code formatting
- Write unit tests for components and utilities
- Keep components small and focused
- Use proper semantic HTML elements
- Follow accessibility guidelines
- Implement proper error handling
- Use environment variables for configuration

## Testing

```bash
# Run unit tests
pnpm test

# Run e2e tests
pnpm test:e2e
```

## Building for Production

```bash
# Build the application
pnpm build

# Start production server
pnpm start
```

## License

MIT License - see the [LICENSE](LICENSE) file for details.
