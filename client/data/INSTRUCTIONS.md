# Integration Instructions for Shafi'i Madhhab JSON Dataset

## Overview

This guide helps you integrate your JSON datasets into the Islamic digital library web application. The structure is already in place and ready to accept your data.

## JSON Files Structure Expected

### 1. علماء*الشافعية*دفعة_1.json

```json
[
  {
    "id": "scholar-id",
    "name": "English Name",
    "arabicName": "الاسم العربي",
    "fullName": "الاسم الكامل",
    "title": "اللقب",
    "kunya": "الكنية",
    "nisba": "النسبة",
    "birthYear": "سنة الولادة",
    "deathYear": "سنة الوفاة",
    "birthPlace": "مكان الولادة",
    "deathPlace": "مكان الوفاة",
    "generation": 1,
    "century": "القرن",
    "biography": "سيرة مختصرة",
    "fullBiography": "السيرة الكاملة",
    "specializations": ["التخصص1", "التخصص2"],
    "contributions": ["الإنجاز1", "الإنجاز2"],
    "works": ["الكتاب1", "الكتاب2"],
    "teacherIds": ["معرف الشيخ1"],
    "studentIds": ["معرف التلميذ1"],
    "contemporaryIds": ["معرف المعاصر1"],
    "sources": ["المصدر1", "المصدر2"],
    "notes": "ملاحظات",
    "verified": true
  }
]
```

### 2. كتب*المذهب*الشافعي.json

```json
[
  {
    "id": "book-id",
    "title": "English Title",
    "arabicTitle": "العنوان العربي",
    "subtitle": "العنوان الفرعي",
    "authorId": "معرف المؤلف",
    "authorName": "اسم المؤلف",
    "category": "التصنيف الرئيسي",
    "subcategory": "التصنيف الفرعي",
    "subject": "الموضوع",
    "description": "وصف مختصر",
    "fullDescription": "الوصف الكامل",
    "bookType": "original|commentary|summary|critique|study",
    "status": "complete|incomplete|lost|attributed",
    "pages": 500,
    "volumes": 2,
    "language": "arabic",
    "difficulty": "beginner|intermediate|advanced|scholar",
    "importance": "fundamental|important|supplementary",
    "manuscriptInfo": {
      "manuscripts": ["مخطوطة 1", "مخطوطة 2"],
      "oldestCopy": "أقدم نسخة",
      "publishedEditions": ["طبعة 1", "طبعة 2"]
    },
    "publishInfo": {
      "originalDate": "تاريخ التأليف",
      "publishedDate": "تاريخ النشر",
      "publisher": "الناشر",
      "editor": "المحقق"
    },
    "tags": ["علامة1", "علامة2"],
    "relatedBookIds": ["معرف كتاب مرتبط"],
    "sources": ["مصدر1", "مصدر2"],
    "notes": "ملاحظات",
    "verified": true
  }
]
```

### 3. علاقات*علماء*الشافعية.json

```json
[
  {
    "teacherId": "معرف الشيخ",
    "studentId": "معرف التلميذ",
    "relationship": "direct|indirect|contemporary|influence",
    "duration": "المدة",
    "location": "المكان",
    "sources": ["مصدر1"],
    "verified": true,
    "notes": "ملاحظات"
  }
]
```

### 4. شبكة*كتب*الشافعية.json

```json
[
  {
    "sourceBookId": "معرف الكتاب المصدر",
    "targetBookId": "معرف الكتاب الهدف",
    "connectionType": "commentary|summary|critique|response|influence|plagiarism",
    "description": "وصف العلاقة",
    "sources": ["مصدر1"],
    "verified": true,
    "notes": "ملاحظات"
  }
]
```

## How to Load Your Data

### Option 1: Static JSON Files (Recommended)

1. Place your JSON files in the `public/data/` directory:

   ```
   public/
   └── data/
       ├── علماء_الشافعية_دفعة_1.json
       ├── علماء_الشافعية_دفعة_2.json
       ├── كتب_المذهب_الشافعي.json
       ├── علاقات_علماء_الشافعية.json
       └── شبكة_كتب_الشافعية.json
   ```

2. Update the data loader in `client/data/shafii-data.ts`:

   ```typescript
   async loadData(): Promise<ShafiDataset> {
     if (this.data) {
       return this.data;
     }

     try {
       // Load all your JSON files
       const scholars1Response = await fetch('/data/علماء_الشافعية_دفعة_1.json');
       const scholars1 = await scholars1Response.json();

       const scholars2Response = await fetch('/data/علماء_الشافعية_دفعة_2.json');
       const scholars2 = await scholars2Response.json();

       const booksResponse = await fetch('/data/كتب_المذهب_الشافعي.json');
       const books = await booksResponse.json();

       const relationsResponse = await fetch('/data/علاقات_علماء_الشافعية.json');
       const relations = await relationsResponse.json();

       const connectionsResponse = await fetch('/data/شبكة_كتب_الشافعية.json');
       const connections = await connectionsResponse.json();

       // Combine the data
       this.data = {
         scholars: [...scholars1, ...scholars2],
         books: books,
         scholarRelations: relations,
         bookConnections: connections,
         metadata: {
           version: "1.0",
           lastUpdated: new Date().toISOString(),
           totalScholars: scholars1.length + scholars2.length,
           totalBooks: books.length,
           dataSource: "مشروع التراث الشافعي الرقمي"
         }
       };

       return this.data;
     } catch (error) {
       console.error("Error loading Shafi data:", error);
       return SAMPLE_SHAFI_DATA; // Fallback to sample data
     }
   }
   ```

### Option 2: Import Directly

If you prefer to import the data directly:

1. Convert your JSON files to TypeScript files:

   ```typescript
   // scholars-data.ts
   export const SHAFI_SCHOLARS_BATCH_1 = [
     // Your scholar data here
   ];
   ```

2. Import and use in the data loader:
   ```typescript
   import { SHAFI_SCHOLARS_BATCH_1 } from "./scholars-data";
   ```

## Features Available

### ✅ Scholar Pages

- Complete scholar profiles with biographies
- Teacher-student relationship mapping
- Works and contributions listing
- Generation-based organization
- Search and filtering capabilities

### ✅ Book Pages

- Detailed book information with metadata
- Author linking to scholar profiles
- Book connection networks (commentary, summary, etc.)
- Manuscript and publication information
- Category and importance-based organization

### ✅ Interlinking

- Click any scholar name → go to their profile
- Click any book title → go to book details
- Click author name → go to scholar profile
- Related books and scholars suggestions

### ✅ Arabic Support

- Full RTL (Right-to-Left) support
- Arabic typography with Amiri font
- Proper Arabic text rendering
- Islamic-themed design

## Navigation URLs

Once your data is loaded, the following URLs will be available:

- `/shafi-scholars` - All Shafi'i scholars
- `/shafi-scholars/scholar-id` - Individual scholar profile
- `/shafi-books` - All Shafi'i books
- `/shafi-books/book-id` - Individual book details

## Testing Your Data

1. Load your JSON files using the instructions above
2. Navigate to `/shafi-scholars` to see the scholar listing
3. Navigate to `/shafi-books` to see the book catalog
4. Click on individual items to test the detail pages
5. Verify that links between scholars and books work correctly

## Customization Options

### Visual Customization

- Colors and themes in `client/global.css`
- Component styling in individual page files
- Islamic design elements and patterns

### Data Structure Extensions

- Add new fields to the interfaces in `shafii-data.ts`
- Extend the UI components to display new fields
- Add new filtering and search criteria

## Support

If you need help integrating your data or customizing the interface, the structure is designed to be flexible and extensible. The sample data provides a complete example of how your real data should be formatted.
