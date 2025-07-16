# 🕌 Islamic Digital Library

A comprehensive digital platform for Islamic scholarship, featuring the complete works and biographies of Islamic scholars across different madhabs (schools of thought), with special focus on the Shafi'i madhhab.

[**🌐 Live Demo**](https://your-domain.com) | [**📖 Documentation**](./docs/) | [**🤝 Contributing**](./CONTRIBUTING.md)

## ✨ Features

### 📚 **Comprehensive Islamic Library**

- **Classical Books** - Organized by madhhab and category
- **Scholar Profiles** - Detailed biographies with relationships
- **Manuscript Information** - Publication history and sources
- **Search & Filter** - Advanced search across all content

### 👨‍🏫 **Scholar Database**

- **The Four Imams** - Abu Hanifa, Malik, Al-Shafi'i, Ahmad ibn Hanbal
- **Madhhab Organization** - Hanafi, Maliki, Shafi'i, Hanbali schools
- **Teacher-Student Networks** - Visual relationship mapping
- **Generations (الطبقات)** - Historical scholarly layers

### 🔗 **Shafi'i Madhhab Integration**

- **Complete JSON Dataset** support for Shafi'i scholars
- **Book Connection Networks** - Commentary, summary, and influence relationships
- **Historical Accuracy** - Verified data with source citations
- **Advanced Filtering** - By generation, century, and specialization

### 🌍 **Arabic-First Design**

- **Full RTL Support** - Proper right-to-left layout
- **Islamic Typography** - Amiri and Arabic fonts
- **Cultural Design** - Islamic aesthetic and color scheme
- **Multilingual** - Arabic and English content

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/YOUR_USERNAME/islamic-digital-library.git
cd islamic-digital-library

# Install dependencies
npm install

# Start development server
npm run dev

# Open your browser to http://localhost:5173
```

### Adding Your Data

1. Place your JSON datasets in `public/data/`:

   ```
   public/data/
   ├── علماء_الشافعية_دفعة_1.json
   ├── علماء_الشافعية_دفعة_2.json
   ├── كتب_المذهب_الشافعي.json
   ├── علاقات_علماء_الشافعية.json
   └── شبكة_كتب_الشافعية.json
   ```

2. Follow the [Data Integration Guide](./client/data/INSTRUCTIONS.md)

## 🏗️ Project Structure

```
islamic-digital-library/
├── client/                 # React frontend
│   ├── components/         # UI components
│   ├── pages/             # Route components
│   ├── data/              # Data structures and loaders
│   └── hooks/             # Custom React hooks
├── server/                # Express backend
├── shared/                # Shared TypeScript types
├── public/                # Static assets and data
└── docs/                  # Documentation
```

## 🛠️ Tech Stack

- **Frontend**: React 18, TypeScript, Tailwind CSS
- **UI Components**: shadcn/ui, Radix UI
- **Backend**: Express.js, Node.js
- **Routing**: React Router 6
- **Build Tool**: Vite
- **Icons**: Lucide React
- **Fonts**: Amiri (Arabic), Inter (Latin)

## 📖 Main Features

### 🏠 **Homepage**

- Featured books and scholars
- Statistics dashboard
- Recent activities and updates

### 📚 **Books Section** (`/books`)

- Books organized by madhhab
- Individual book detail pages
- Manuscript and publication information
- Related books and commentary networks

### 👨‍🏫 **Scholars Section** (`/scholars`)

- Scholars organized by madhhab and generation
- Teacher-student relationship networks
- Individual scholar biography pages
- Visual scholar tree

### 🕌 **Shafi'i Database** (`/shafi-scholars`, `/shafi-books`)

- Comprehensive Shafi'i scholar database
- Book catalog with connection networks
- Advanced filtering and search
- Historical accuracy with source verification

### 🔍 **Search** (`/search`)

- Global search across all content
- Advanced filtering options
- Arabic and English search support

## 🤝 Contributing

We welcome contributions from developers, Islamic scholars, and the community!

### For Developers

- Check [Contributing Guide](./CONTRIBUTING.md)
- Review [Setup Guide](./SETUP_GUIDE.md)
- Follow [Code Standards](./docs/CODE_STANDARDS.md)

### For Scholars

- Submit accurate historical data
- Provide source verification
- Review existing content for accuracy

### For Translators

- Help with Arabic-English translations
- Improve RTL layout and typography
- Add support for other languages

## 📊 Data Schema

### Scholar Data Structure

```typescript
interface Scholar {
  id: string;
  name: string; // English name
  arabicName: string; // الاسم العربي
  title: string; // اللقب
  birthYear: string; // سنة الولادة
  deathYear: string; // سنة الوفاة
  specializations: string[];
  works: string[];
  teacherIds: string[];
  studentIds: string[];
  // ... more fields
}
```

### Book Data Structure

```typescript
interface Book {
  id: string;
  title: string; // English title
  arabicTitle: string; // العنوان العربي
  authorId: string;
  category: string;
  bookType: "original" | "commentary" | "summary";
  manuscriptInfo: {
    manuscripts: string[];
    publishedEditions: string[];
  };
  // ... more fields
}
```

## 🌟 Roadmap

### Phase 1 (Current)

- ✅ Core library structure
- ✅ Four madhhab organization
- ✅ Shafi'i database integration
- ✅ Arabic RTL support

### Phase 2 (Planned)

- [ ] User authentication and profiles
- [ ] Community contributions system
- [ ] Advanced search with AI
- [ ] Mobile application

### Phase 3 (Future)

- [ ] Multilingual support (Urdu, Persian, Turkish)
- [ ] Audio recitations and lectures
- [ ] Interactive scholarly networks
- [ ] API for third-party integrations

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Islamic Scholars** - For preserving and transmitting knowledge
- **Open Source Community** - For tools and libraries
- **Contributors** - For making this project possible
- **Ummah** - For the inspiration and purpose

## 📧 Contact

- **Email**: [your-email@domain.com]
- **Issues**: [GitHub Issues](https://github.com/YOUR_USERNAME/islamic-digital-library/issues)
- **Discussions**: [GitHub Discussions](https://github.com/YOUR_USERNAME/islamic-digital-library/discussions)

## 🔗 Related Projects

- [Islamic Library APIs](https://github.com/link-to-related-project)
- [Arabic Text Processing](https://github.com/link-to-related-project)
- [Islamic Calendar Tools](https://github.com/link-to-related-project)

---

<div align="center">

**"وَقُل رَّبِّ زِدْنِي عِلْمًا"**  
_"And say: My Lord, increase me in knowledge"_ - Quran 20:114

Made with ❤️ for the Ummah

[⭐ Star this project](https://github.com/YOUR_USERNAME/islamic-digital-library) | [🐛 Report Bug](https://github.com/YOUR_USERNAME/islamic-digital-library/issues) | [💡 Request Feature](https://github.com/YOUR_USERNAME/islamic-digital-library/issues)

</div>
