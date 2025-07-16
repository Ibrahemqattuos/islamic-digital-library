# 🚀 Islamic Digital Library - Local Development Setup

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18 or higher) - [Download here](https://nodejs.org/)
- **npm** (comes with Node.js)
- **Git** - [Download here](https://git-scm.com/)
- **VS Code** - [Download here](https://code.visualstudio.com/)

## 🔧 Quick Setup (5 minutes)

### 1. **Initialize Project**

```bash
# Create new directory
mkdir islamic-digital-library
cd islamic-digital-library

# Initialize git repository
git init

# Create package.json
npm init -y
```

### 2. **Install Dependencies**

```bash
# Core dependencies
npm install express zod

# Development dependencies (shadcn/ui stack)
npm install -D @hookform/resolvers @radix-ui/react-accordion @radix-ui/react-alert-dialog @radix-ui/react-aspect-ratio @radix-ui/react-avatar @radix-ui/react-checkbox @radix-ui/react-collapsible @radix-ui/react-context-menu @radix-ui/react-dialog @radix-ui/react-dropdown-menu @radix-ui/react-hover-card @radix-ui/react-label @radix-ui/react-menubar @radix-ui/react-navigation-menu @radix-ui/react-popover @radix-ui/react-progress @radix-ui/react-radio-group @radix-ui/react-scroll-area @radix-ui/react-select @radix-ui/react-separator @radix-ui/react-slider @radix-ui/react-slot @radix-ui/react-switch @radix-ui/react-tabs @radix-ui/react-toast @radix-ui/react-toggle @radix-ui/react-toggle-group @radix-ui/react-tooltip @react-three/drei @react-three/fiber @swc/core @tailwindcss/typography @tanstack/react-query @types/cors @types/express @types/node @types/react @types/react-dom @types/three @vitejs/plugin-react-swc autoprefixer class-variance-authority clsx cmdk cors date-fns embla-carousel-react framer-motion globals input-otp lucide-react next-themes postcss prettier react react-day-picker react-dom react-hook-form react-resizable-panels react-router-dom recharts serverless-http sonner tailwind-merge tailwindcss tailwindcss-animate three tsx typescript vaul vite vitest
```

### 3. **Create Project Structure**

```bash
# Create directory structure
mkdir -p client/{components/ui,hooks,lib,pages,data}
mkdir -p server/routes
mkdir -p shared
mkdir -p public/data
mkdir -p netlify/functions

# Create essential files
touch client/App.tsx client/global.css client/vite-env.d.ts
touch server/index.ts shared/api.ts
touch tsconfig.json tailwind.config.ts vite.config.ts
touch index.html README.md
```

## 📝 Configuration Files

### **package.json** (Update scripts section):

```json
{
  "scripts": {
    "dev": "vite",
    "build": "npm run build:client && npm run build:server",
    "build:client": "vite build",
    "build:server": "vite build --config vite.config.server.ts",
    "start": "node dist/server/node-build.mjs",
    "test": "vitest --run",
    "format.fix": "prettier --write .",
    "typecheck": "tsc"
  },
  "type": "module"
}
```

### **tsconfig.json**:

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,
    "baseUrl": ".",
    "paths": {
      "@/*": ["./client/*"],
      "@shared/*": ["./shared/*"]
    }
  },
  "include": ["client", "server", "shared"],
  "references": [{ "path": "./tsconfig.node.json" }]
}
```

### **vite.config.ts**:

```typescript
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./client"),
      "@shared": path.resolve(__dirname, "./shared"),
    },
  },
  build: {
    outDir: "dist/spa",
  },
});
```

### **tailwind.config.ts**:

```typescript
import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./client/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        arabic: ["Amiri", "Noto Sans Arabic", "serif"],
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      colors: {
        islamic: {
          green: {
            50: "#f0f9f4",
            100: "#dcf2e3",
            200: "#bce5cb",
            300: "#8dd2a8",
            400: "#5ab77f",
            500: "#369b5f",
            600: "#2a7c4c",
            700: "#22633f",
            800: "#1d4f34",
            900: "#19422c",
          },
          gold: {
            50: "#fefbf0",
            100: "#fdf6db",
            200: "#faecb7",
            300: "#f6dc88",
            400: "#f0c547",
            500: "#e8a626",
            600: "#d4891b",
            700: "#b06b18",
            800: "#8f551a",
            900: "#764619",
          },
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: {
            height: "0",
          },
          to: {
            height: "var(--radix-accordion-content-height)",
          },
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)",
          },
          to: {
            height: "0",
          },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
```

## 🎨 VS Code Setup

### **Recommended Extensions**:

1. **ES7+ React/Redux/React-Native snippets**
2. **Tailwind CSS IntelliSense**
3. **TypeScript Importer**
4. **Prettier - Code formatter**
5. **Auto Rename Tag**
6. **Bracket Pair Colorizer**
7. **GitLens**
8. **Arabic Language Pack** (for Arabic content editing)

### **VS Code Settings** (.vscode/settings.json):

```json
{
  "typescript.preferences.importModuleSpecifier": "relative",
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "tailwindCSS.experimental.classRegex": [
    ["cva\\(([^)]*)\\)", "[\"'`]([^\"'`]*).*?[\"'`]"],
    ["cx\\(([^)]*)\\)", "(?:'|\"|`)([^']*)(?:'|\"|`)"]
  ],
  "files.associations": {
    "*.css": "tailwindcss"
  }
}
```

## 🚀 Development Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run tests
npm test

# Format code
npm run format.fix

# Type checking
npm run typecheck
```

## 📁 File Import/Creation Order

### **1. Copy all files from Builder.io project**

Use the Read tool to get content of each file, then create them locally:

```bash
# Core files (copy content from Builder.io)
client/App.tsx
client/global.css
client/components/Navigation.tsx
client/pages/Index.tsx
# ... (all other files)
```

### **2. Copy UI components**

Copy all 41 shadcn/ui components from `client/components/ui/`

### **3. Copy data structures**

```bash
client/data/library.ts
client/data/shafii-data.ts
```

### **4. Copy all page components**

```bash
client/pages/BooksNew.tsx
client/pages/ScholarDetail.tsx
client/pages/ShafiScholars.tsx
# ... (all page files)
```

## 🌍 GitHub Repository Setup

### **1. Create Repository**

```bash
# After setting up locally, push to GitHub
git add .
git commit -m "Initial commit: Islamic Digital Library"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/islamic-digital-library.git
git push -u origin main
```

### **2. Repository Structure**

```
📁 islamic-digital-library/
├── 📄 README.md (Project overview)
├── 📄 CONTRIBUTING.md (How to contribute)
├── 📄 LICENSE (Open source license)
├── 📄 SETUP_GUIDE.md (This file)
├── 📁 .github/
│   ├── 📁 workflows/ (GitHub Actions)
│   └── 📄 ISSUE_TEMPLATE.md
├── 📁 docs/ (Documentation)
├── 📁 client/ (React frontend)
├── 📁 server/ (Express backend)
└── 📁 shared/ (Shared types)
```

## 🤝 Collaboration Setup

### **Branch Strategy**:

```bash
main           # Production branch
develop        # Development branch
feature/*      # Feature branches
hotfix/*       # Hotfix branches
docs/*         # Documentation branches
```

### **Issue Labels**:

- `enhancement` - New features
- `bug` - Bug reports
- `documentation` - Documentation improvements
- `good first issue` - Good for newcomers
- `help wanted` - Extra attention needed
- `arabic-content` - Arabic content related
- `scholars` - Scholar data related
- `books` - Book data related

## 📚 Next Steps

1. **Set up local environment** using this guide
2. **Copy all files** from Builder.io project
3. **Test locally** with `npm run dev`
4. **Push to GitHub** for collaboration
5. **Set up CI/CD** with GitHub Actions
6. **Create documentation** for contributors
7. **Add your JSON datasets** to `public/data/`

## 🎯 Ready for Open Source!

Your Islamic Digital Library is now ready to become a collaborative open-source project that can serve the global Muslim community! 🕌📚
