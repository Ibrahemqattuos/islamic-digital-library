# Islamic Digital Library - Complete Project Export

## 📁 Project Structure

```
islamic-digital-library/
├── README.md
├── package.json
├── tsconfig.json
├── tailwind.config.ts
├── postcss.config.js
├── vite.config.ts
├── vite.config.server.ts
├── components.json
├── index.html
├── netlify.toml
├── AGENTS.md
├── client/
│   ├── global.css
│   ├── vite-env.d.ts
│   ├── App.tsx
│   ├── components/
│   │   ├── Navigation.tsx
│   │   ├── SearchResults.tsx
│   │   ├── ScholarTree.tsx
│   │   └── ui/ (41 shadcn/ui components)
│   ├── hooks/
│   │   ├── use-mobile.tsx
│   │   └── use-toast.ts
│   ├── lib/
│   │   ├── utils.ts
│   │   └── utils.spec.ts
│   ├── pages/
│   │   ├── Index.tsx (Homepage)
│   │   ├── BooksNew.tsx (Books organized by madhhab)
│   │   ├── BookDetail.tsx (Individual book pages)
│   │   ├── ScholarsNew.tsx (Scholars by madhhab)
│   │   ├── ScholarDetail.tsx (Individual scholar profiles)
│   │   ├── ShafiScholars.tsx (Shafi'i scholars database)
│   │   ├── ShafiScholarDetail.tsx
│   │   ├── ShafiBooks.tsx (Shafi'i books database)
│   │   ├── ShafiBookDetail.tsx
│   │   ├── Fiqh.tsx (Islamic jurisprudence)
│   │   ├── Events.tsx (Islamic events)
│   │   ├── Search.tsx (Search functionality)
│   │   └── NotFound.tsx
│   └── data/
│       ├── library.ts (Core Islamic library data)
│       ├── shafii-data.ts (Shafi'i madhhab data structures)
│       └── INSTRUCTIONS.md (Data integration guide)
├── server/
│   ├── index.ts (Express server)
│   ├── node-build.ts
│   └── routes/
│       └── demo.ts
├── shared/
│   └── api.ts (Shared types)
├── public/
│   ├── placeholder.svg
│   ├── robots.txt
│   └── data/ (For your JSON datasets)
│       ├── علماء_الشافعية_دفعة_1.json
│       ├── علماء_الشافعية_دفعة_2.json
│       ├── كتب_المذهب_الشافعي.json
│       ├── علاقات_علماء_الشافعية.json
│       └── شبكة_كتب_الشافعية.json
└── netlify/
    └── functions/
        └── api.ts
```

## 🔧 Key Features Implemented

### ✅ **Core Islamic Library**

- **4 Great Imams** (Abu Hanifa, Malik, Al-Shafi'i, Ahmad ibn Hanbal)
- **Madhhab organization** (Hanafi, Maliki, Shafi'i, Hanbali)
- **Classical books** with full metadata
- **Scholar relationships** (teacher-student networks)
- **Visual scholar tree** and genealogies

### ✅ **Shafi'i Madhhab Integration**

- **Complete data structures** for your JSON datasets
- **Scholar database** with generations (الطبقات)
- **Book catalog** with manuscript information
- **Relationship mapping** (teacher-student, book connections)
- **Search and filtering** capabilities

### ✅ **Arabic-First Design**

- **Full RTL support** for Arabic content
- **Islamic typography** (Amiri, Noto Sans Arabic)
- **Islamic color scheme** (green/gold theme)
- **Cultural design** appropriate for Islamic scholarship

### ✅ **Modern Web Stack**

- **React 18** + TypeScript + Vite
- **Tailwind CSS 3** + shadcn/ui components
- **React Router 6** for SPA navigation
- **Express server** for API endpoints
- **Responsive design** for all devices

## 📊 Database Schema

### Scholar Data Structure:

```typescript
interface ShafiScholar {
  id: string;
  name: string;
  arabicName: string;
  fullName: string;
  title: string;
  kunya: string; // أبو فلان
  nisba: string; // النسبة
  birthYear: string;
  deathYear: string;
  generation: number; // الطبقة
  specializations: string[];
  works: string[];
  teacherIds: string[];
  studentIds: string[];
  // ... more fields
}
```

### Book Data Structure:

```typescript
interface ShafiBook {
  id: string;
  title: string;
  arabicTitle: string;
  authorId: string;
  category: string;
  bookType: "original" | "commentary" | "summary";
  importance: "fundamental" | "important" | "supplementary";
  manuscriptInfo: {
    manuscripts: string[];
    publishedEditions: string[];
  };
  // ... more fields
}
```

## 🌐 Live URLs

### Main Navigation:

- `/` - Homepage with featured content
- `/books` - Books organized by madhhab
- `/scholars` - Scholars organized by madhhab
- `/shafi-scholars` - Shafi'i scholars database
- `/shafi-books` - Shafi'i books catalog
- `/fiqh` - Contemporary Islamic jurisprudence
- `/events` - Islamic conferences and lectures
- `/search` - Global search functionality

### Detail Pages:

- `/books/:id` - Individual book details
- `/scholars/:id` - Individual scholar profiles
- `/shafi-scholars/:id` - Shafi'i scholar details
- `/shafi-books/:id` - Shafi'i book details

## 🎯 Ready for Collaboration

### For Developers:

- **TypeScript** throughout for type safety
- **Component-based** architecture
- **Modular design** for easy contribution
- **Clear data structures** and APIs

### For Scholars:

- **JSON-based** content management
- **Structured data** for accuracy
- **Verification system** for authenticity
- **Source citation** support

### For Contributors:

- **Open source** ready structure
- **Documentation** and guides included
- **Scalable architecture** for growth
- **International** and multilingual support
