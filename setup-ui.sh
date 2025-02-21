#!/bin/bash

# setup-ui.sh
echo "🎨 Setting up UI components..."

# Create UI components directory
mkdir -p src/components/ui

# Create theme provider directory
mkdir -p src/components/theme-provider

# Install additional dependencies
pnpm add next-themes @radix-ui/react-toast @radix-ui/react-scroll-area clsx tailwind-merge lucide-react

# Create components directory structure
mkdir -p src/components/{ui,forms,layout,papers,chat}

# Copy UI component files
echo "📝 Creating UI components..."

# Create all the necessary files
touch src/components/ui/{button,input,scroll-area,toast,toaster,use-toast}.tsx
touch src/components/theme-provider.tsx

echo "✅ UI setup complete!"
echo "Now you can run: pnpm dev"
