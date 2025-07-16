# 📁 Complete File List for Islamic Digital Library

## 🔧 Configuration Files (Root)

1. `package.json` - Dependencies and scripts
2. `tsconfig.json` - TypeScript configuration
3. `tailwind.config.ts` - Tailwind CSS configuration
4. `postcss.config.js` - PostCSS configuration
5. `vite.config.ts` - Vite build configuration
6. `vite.config.server.ts` - Server build configuration
7. `components.json` - shadcn/ui configuration
8. `index.html` - HTML entry point
9. `netlify.toml` - Netlify deployment configuration
10. `README.md` - Project documentation
11. `SETUP_GUIDE.md` - Local development setup
12. `PROJECT_EXPORT.md` - Project structure overview
13. `AGENTS.md` - Original project documentation

## 📱 Client Files (React Frontend)

### Core Files

14. `client/App.tsx` - Main React application with routing
15. `client/global.css` - Global styles with Islamic theme
16. `client/vite-env.d.ts` - Vite environment types

### Components

17. `client/components/Navigation.tsx` - Main navigation with Arabic support
18. `client/components/SearchResults.tsx` - Search results component
19. `client/components/ScholarTree.tsx` - Visual scholar relationship tree

### UI Components (shadcn/ui) - 41 components

20. `client/components/ui/accordion.tsx`
21. `client/components/ui/alert-dialog.tsx`
22. `client/components/ui/alert.tsx`
23. `client/components/ui/aspect-ratio.tsx`
24. `client/components/ui/avatar.tsx`
25. `client/components/ui/badge.tsx`
26. `client/components/ui/breadcrumb.tsx`
27. `client/components/ui/button.tsx`
28. `client/components/ui/calendar.tsx`
29. `client/components/ui/card.tsx`
30. `client/components/ui/carousel.tsx`
31. `client/components/ui/chart.tsx`
32. `client/components/ui/checkbox.tsx`
33. `client/components/ui/collapsible.tsx`
34. `client/components/ui/command.tsx`
35. `client/components/ui/context-menu.tsx`
36. `client/components/ui/dialog.tsx`
37. `client/components/ui/drawer.tsx`
38. `client/components/ui/dropdown-menu.tsx`
39. `client/components/ui/form.tsx`
40. `client/components/ui/hover-card.tsx`
41. `client/components/ui/input-otp.tsx`
42. `client/components/ui/input.tsx`
43. `client/components/ui/label.tsx`
44. `client/components/ui/menubar.tsx`
45. `client/components/ui/navigation-menu.tsx`
46. `client/components/ui/pagination.tsx`
47. `client/components/ui/popover.tsx`
48. `client/components/ui/progress.tsx`
49. `client/components/ui/radio-group.tsx`
50. `client/components/ui/resizable.tsx`
51. `client/components/ui/scroll-area.tsx`
52. `client/components/ui/select.tsx`
53. `client/components/ui/separator.tsx`
54. `client/components/ui/sheet.tsx`
55. `client/components/ui/sidebar.tsx`
56. `client/components/ui/skeleton.tsx`
57. `client/components/ui/slider.tsx`
58. `client/components/ui/sonner.tsx`
59. `client/components/ui/switch.tsx`
60. `client/components/ui/table.tsx`
61. `client/components/ui/tabs.tsx`
62. `client/components/ui/textarea.tsx`
63. `client/components/ui/toast.tsx`
64. `client/components/ui/toaster.tsx`
65. `client/components/ui/toggle-group.tsx`
66. `client/components/ui/toggle.tsx`
67. `client/components/ui/tooltip.tsx`
68. `client/components/ui/use-toast.ts`

### Hooks

69. `client/hooks/use-mobile.tsx` - Mobile detection hook
70. `client/hooks/use-toast.ts` - Toast notification hook

### Utilities

71. `client/lib/utils.ts` - Utility functions
72. `client/lib/utils.spec.ts` - Utility tests

### Pages

73. `client/pages/Index.tsx` - Homepage with featured content
74. `client/pages/BooksNew.tsx` - Books organized by madhhab
75. `client/pages/BookDetail.tsx` - Individual book detail pages
76. `client/pages/ScholarsNew.tsx` - Scholars organized by madhhab
77. `client/pages/ScholarDetail.tsx` - Individual scholar detail pages
78. `client/pages/ShafiScholars.tsx` - Shafi'i scholars database
79. `client/pages/ShafiScholarDetail.tsx` - Shafi'i scholar detail pages
80. `client/pages/ShafiBooks.tsx` - Shafi'i books database
81. `client/pages/ShafiBookDetail.tsx` - Shafi'i book detail pages
82. `client/pages/Fiqh.tsx` - Islamic jurisprudence issues
83. `client/pages/Events.tsx` - Islamic events and conferences
84. `client/pages/Search.tsx` - Global search functionality
85. `client/pages/NotFound.tsx` - 404 error page

### Data Structures

86. `client/data/library.ts` - Core Islamic library data structures
87. `client/data/shafii-data.ts` - Shafi'i madhhab data structures and loader
88. `client/data/INSTRUCTIONS.md` - Data integration guide for JSON datasets

## 🖥️ Server Files (Express Backend)

89. `server/index.ts` - Main Express server setup
90. `server/node-build.ts` - Server build configuration
91. `server/routes/demo.ts` - Demo API routes

## 🔗 Shared Files

92. `shared/api.ts` - Shared TypeScript interfaces

## 📁 Public Assets

93. `public/placeholder.svg` - Placeholder image
94. `public/robots.txt` - SEO robots file

### Data Directory (for JSON datasets)

95. `public/data/علماء_الشافعية_دفعة_1.json` - Scholars batch 1 (your data)
96. `public/data/علماء_الشافعية_دفعة_2.json` - Scholars batch 2 (your data)
97. `public/data/كتب_المذهب_الشافعي.json` - Shafi'i books (your data)
98. `public/data/علاقات_علماء_الشافعية.json` - Scholar relationships (your data)
99. `public/data/شبكة_كتب_الشافعية.json` - Book connections (your data)

## ☁️ Netlify Functions

100. `netlify/functions/api.ts` - Serverless function for deployment

## 📋 Priority Order for Download/Creation

### **🚨 Critical Files (Must have first):**

1. `package.json` - To install dependencies
2. `tsconfig.json` - TypeScript configuration
3. `tailwind.config.ts` - Styling configuration
4. `vite.config.ts` - Build configuration
5. `client/App.tsx` - Main application
6. `client/global.css` - Core styles

### **🎨 UI Foundation:**

7. All `client/components/ui/*` files (shadcn/ui components)
8. `client/components/Navigation.tsx` - Main navigation
9. `client/lib/utils.ts` - Utility functions

### **📄 Core Pages:**

10. `client/pages/Index.tsx` - Homepage
11. `client/pages/BooksNew.tsx` - Books page
12. `client/pages/ScholarsNew.tsx` - Scholars page

### **🗄️ Data Structures:**

13. `client/data/library.ts` - Core data
14. `client/data/shafii-data.ts` - Shafi'i data structures

### **📚 Shafi'i Integration:**

15. `client/pages/ShafiScholars.tsx`
16. `client/pages/ShafiBooks.tsx`
17. `client/pages/ShafiScholarDetail.tsx`
18. `client/pages/ShafiBookDetail.tsx`

### **🔍 Additional Features:**

19. `client/pages/Search.tsx`
20. `client/components/SearchResults.tsx`
21. `client/components/ScholarTree.tsx`

### **🛠️ Remaining Files:**

22. All other page components
23. Server files
24. Documentation files
25. Configuration files

## 💾 How to Download/Export

### Method 1: Builder.io Export (if available)

- Look for "Export Project" or "Download" option
- Should give you a complete ZIP file

### Method 2: Manual File Copy

- Use the Read tool to get content of each file
- Create files locally following the structure above
- Copy content exactly as shown

### Method 3: GitHub Integration

- Connect Builder.io project directly to GitHub
- Automatic sync of all files

## ✅ Verification Checklist

After downloading/creating all files:

- [ ] All 100 files created successfully
- [ ] `npm install` runs without errors
- [ ] `npm run dev` starts development server
- [ ] Homepage loads with Islamic library content
- [ ] Navigation works between all pages
- [ ] Arabic text displays correctly with RTL layout
- [ ] Shafi'i scholar and book pages load
- [ ] Search functionality works

## 🎯 Next Steps

1. **Download all files** using one of the methods above
2. **Follow SETUP_GUIDE.md** for local development
3. **Add your JSON datasets** to `public/data/`
4. **Test locally** with `npm run dev`
5. **Push to GitHub** for collaboration
6. **Deploy to production** (Netlify, Vercel, etc.)

Your complete Islamic Digital Library project is ready for collaborative development! 🕌📚
