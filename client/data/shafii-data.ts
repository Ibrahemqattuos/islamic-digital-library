// Shafi'i Madhhab Data Structures and Loader

export interface ShafiScholar {
  id: string;
  name: string;
  arabicName: string;
  fullName: string;
  title: string;
  kunya: string; // أبو فلان
  nisba: string; // النسبة
  birthYear: string;
  deathYear: string;
  birthPlace: string;
  deathPlace: string;
  generation: number; // الطبقة
  century: string; // القرن
  biography: string;
  fullBiography: string;
  specializations: string[];
  contributions: string[];
  works: string[];
  teacherIds: string[];
  studentIds: string[];
  contemporaryIds: string[];
  sources: string[];
  notes: string;
  verified: boolean;
}

export interface ShafiBook {
  id: string;
  title: string;
  arabicTitle: string;
  subtitle?: string;
  authorId: string;
  authorName: string;
  category: string;
  subcategory: string;
  subject: string;
  description: string;
  fullDescription: string;
  manuscriptInfo?: {
    manuscripts: string[];
    oldestCopy?: string;
    publishedEditions: string[];
  };
  publishInfo: {
    originalDate?: string;
    publishedDate: string;
    publisher: string;
    editor?: string;
    verifier?: string;
  };
  bookType: "original" | "commentary" | "summary" | "critique" | "study";
  status: "complete" | "incomplete" | "lost" | "attributed";
  pages?: number;
  volumes?: number;
  language: "arabic" | "persian" | "turkish" | "other";
  difficulty: "beginner" | "intermediate" | "advanced" | "scholar";
  importance: "fundamental" | "important" | "supplementary";
  tags: string[];
  relatedBookIds: string[];
  sources: string[];
  notes: string;
  verified: boolean;
}

export interface ScholarRelation {
  teacherId: string;
  studentId: string;
  relationship: "direct" | "indirect" | "contemporary" | "influence";
  duration?: string;
  location?: string;
  sources: string[];
  verified: boolean;
  notes?: string;
}

export interface BookConnection {
  sourceBookId: string;
  targetBookId: string;
  connectionType:
    | "commentary"
    | "summary"
    | "critique"
    | "response"
    | "influence"
    | "plagiarism";
  description: string;
  sources: string[];
  verified: boolean;
  notes?: string;
}

export interface ShafiDataset {
  scholars: ShafiScholar[];
  books: ShafiBook[];
  scholarRelations: ScholarRelation[];
  bookConnections: BookConnection[];
  metadata: {
    version: string;
    lastUpdated: string;
    totalScholars: number;
    totalBooks: number;
    dataSource: string;
  };
}

// Sample data structure - replace with your actual JSON data
export const SAMPLE_SHAFI_DATA: ShafiDataset = {
  scholars: [
    {
      id: "imam-shafii",
      name: "Muhammad ibn Idris al-Shafi'i",
      arabicName: "محمد بن إدريس الشافعي",
      fullName:
        "أبو عبد الله محمد بن إدريس بن العباس بن عثمان بن شافع الهاشمي القرشي المطلبي الشافعي",
      title: "الإمام الشافعي",
      kunya: "أبو عبد الله",
      nisba: "الشافعي المطلبي",
      birthYear: "150 هـ",
      deathYear: "204 هـ",
      birthPlace: "غزة، فلسطين",
      deathPlace: "الفسطاط، مصر",
      generation: 1,
      century: "القرن الثاني الهجري",
      biography: "إمام المذهب الشافعي، واضع علم أصول الفقه",
      fullBiography:
        "الإمام الشافعي رحمه الله، واضع علم أصول الفقه وصاحب المذهب الشافعي...",
      specializations: ["أصول الفقه", "الفقه", "الحديث", "اللغة"],
      contributions: [
        "وضع علم أصول الفقه",
        "تأليف الرسالة",
        "تأسيس المذهب الشافعي",
      ],
      works: ["الرسالة", "الأم", "أحكام القرآن", "مسند الشافعي"],
      teacherIds: ["malik-ibn-anas", "muhammad-shaybani"],
      studentIds: ["al-buwayti", "al-muzani", "al-rabee"],
      contemporaryIds: ["ahmad-ibn-hanbal"],
      sources: ["طبقات الشافعية", "تاريخ بغداد"],
      notes: "",
      verified: true,
    },
    {
      id: "al-buwayti",
      name: "Abu Ya'qub al-Buwayti",
      arabicName: "أبو يعقوب البويطي",
      fullName: "أبو يعقوب يوسف بن يحيى البويطي المصري",
      title: "صاحب الشافعي",
      kunya: "أبو يعقوب",
      nisba: "البويطي",
      birthYear: "170 هـ",
      deathYear: "231 هـ",
      birthPlace: "مصر",
      deathPlace: "بغداد",
      generation: 2,
      century: "القرن الثالث الهجري",
      biography: "أجل أصحاب الشافعي وأعلمهم بمذهبه",
      fullBiography: "البويطي رحمه الله، من أجل أصحاب الإمام الشافعي...",
      specializations: ["الفقه الشافعي", "أصول الفقه"],
      contributions: ["نشر المذهب الشافعي", "تصنيف المختصر"],
      works: ["المختصر", "الجامع"],
      teacherIds: ["imam-shafii"],
      studentIds: ["al-karkhi"],
      contemporaryIds: ["al-muzani"],
      sources: ["طبقات الشافعية"],
      notes: "توفي في محنة خلق القرآن",
      verified: true,
    },
  ],
  books: [
    {
      id: "al-risala",
      title: "Al-Risala",
      arabicTitle: "الرسالة",
      authorId: "imam-shafii",
      authorName: "الإمام الشافعي",
      category: "أصول الفقه",
      subcategory: "أصول الفقه",
      subject: "قواعد الاستن��اط",
      description: "أول كتاب مؤلف في علم أصول الفقه",
      fullDescription:
        "الرسالة للإمام الشافعي، أول كتاب مؤلف في علم أصول الفقه...",
      bookType: "original",
      status: "complete",
      pages: 400,
      volumes: 1,
      language: "arabic",
      difficulty: "advanced",
      importance: "fundamental",
      publishInfo: {
        originalDate: "200 هـ",
        publishedDate: "1940",
        publisher: "مطبعة مصطفى البابي الحلبي",
        editor: "أحمد شاكر",
      },
      tags: ["أصول الفقه", "منهجية", "استنباط"],
      relatedBookIds: ["al-umm"],
      sources: ["فهارس المخطوطات"],
      notes: "",
      verified: true,
    },
    {
      id: "al-umm",
      title: "Al-Umm",
      arabicTitle: "الأم",
      authorId: "imam-shafii",
      authorName: "الإمام الشافعي",
      category: "الفقه",
      subcategory: "الفقه الشافعي",
      subject: "فقه شامل",
      description: "الكتاب الجامع لفقه الإمام الشافعي",
      fullDescription:
        "كتاب الأم للإمام الشافعي، يحتوي على فقه الإمام في مذهبه الجديد...",
      bookType: "original",
      status: "complete",
      pages: 2500,
      volumes: 8,
      language: "arabic",
      difficulty: "advanced",
      importance: "fundamental",
      publishInfo: {
        originalDate: "204 هـ",
        publishedDate: "1990",
        publisher: "دار المعرفة",
        editor: "رفعت عبد المطلب",
      },
      tags: ["فقه شافعي", "مذهب جديد", "فروع"],
      relatedBookIds: ["al-risala"],
      sources: ["المكتبات العامة"],
      notes: "",
      verified: true,
    },
  ],
  scholarRelations: [
    {
      teacherId: "malik-ibn-anas",
      studentId: "imam-shafii",
      relationship: "direct",
      duration: "سنتان",
      location: "المدينة المنورة",
      sources: ["طبقات الشافعية"],
      verified: true,
      notes: "أخذ عن مالك الموطأ",
    },
    {
      teacherId: "imam-shafii",
      studentId: "al-buwayti",
      relationship: "direct",
      duration: "عدة سنوات",
      location: "مصر",
      sources: ["طبقات الشافعية"],
      verified: true,
      notes: "أعلم أصحاب الشافعي بمذهبه",
    },
  ],
  bookConnections: [
    {
      sourceBookId: "al-risala",
      targetBookId: "al-umm",
      connectionType: "influence",
      description: "الرسالة وضعت الأسس النظرية للفقه المبسوط في الأم",
      sources: ["دراسات في فقه الشافعي"],
      verified: true,
      notes: "",
    },
  ],
  metadata: {
    version: "1.0",
    lastUpdated: "2024-01-20",
    totalScholars: 2,
    totalBooks: 2,
    dataSource: "مشروع التراث الشافعي الرقمي",
  },
};

// Data loader class
export class ShafiDataLoader {
  private static instance: ShafiDataLoader;
  private data: ShafiDataset | null = null;

  private constructor() {}

  static getInstance(): ShafiDataLoader {
    if (!ShafiDataLoader.instance) {
      ShafiDataLoader.instance = new ShafiDataLoader();
    }
    return ShafiDataLoader.instance;
  }

  async loadData(): Promise<ShafiDataset> {
    if (this.data) {
      return this.data;
    }

    try {
      // In production, load from your JSON files
      // const scholars1 = await fetch('/data/علماء_الشافعية_دفعة_1.json').then(r => r.json());
      // const scholars2 = await fetch('/data/علماء_الشافعية_دفعة_2.json').then(r => r.json());
      // const books = await fetch('/data/كتب_المذهب_الشافعي.json').then(r => r.json());
      // const relations = await fetch('/data/علاقات_علماء_الشافعية.json').then(r => r.json());
      // const bookConnections = await fetch('/data/شبكة_كتب_الشافعية.json').then(r => r.json());

      // For now, use sample data
      this.data = SAMPLE_SHAFI_DATA;

      return this.data;
    } catch (error) {
      console.error("Error loading Shafi data:", error);
      return SAMPLE_SHAFI_DATA;
    }
  }

  getScholars(): ShafiScholar[] {
    return this.data?.scholars || [];
  }

  getBooks(): ShafiBook[] {
    return this.data?.books || [];
  }

  getScholarById(id: string): ShafiScholar | undefined {
    return this.data?.scholars.find((s) => s.id === id);
  }

  getBookById(id: string): ShafiBook | undefined {
    return this.data?.books.find((b) => b.id === id);
  }

  getScholarsByGeneration(generation: number): ShafiScholar[] {
    return this.data?.scholars.filter((s) => s.generation === generation) || [];
  }

  getBooksByAuthor(authorId: string): ShafiBook[] {
    return this.data?.books.filter((b) => b.authorId === authorId) || [];
  }

  getTeachersOfScholar(scholarId: string): ShafiScholar[] {
    const scholar = this.getScholarById(scholarId);
    if (!scholar) return [];

    return scholar.teacherIds
      .map((id) => this.getScholarById(id))
      .filter(Boolean) as ShafiScholar[];
  }

  getStudentsOfScholar(scholarId: string): ShafiScholar[] {
    const scholar = this.getScholarById(scholarId);
    if (!scholar) return [];

    return scholar.studentIds
      .map((id) => this.getScholarById(id))
      .filter(Boolean) as ShafiScholar[];
  }

  getRelatedBooks(bookId: string): ShafiBook[] {
    const connections =
      this.data?.bookConnections.filter(
        (c) => c.sourceBookId === bookId || c.targetBookId === bookId,
      ) || [];

    const relatedIds = connections.map((c) =>
      c.sourceBookId === bookId ? c.targetBookId : c.sourceBookId,
    );

    return relatedIds
      .map((id) => this.getBookById(id))
      .filter(Boolean) as ShafiBook[];
  }

  searchScholars(query: string): ShafiScholar[] {
    const lowercaseQuery = query.toLowerCase();
    return (
      this.data?.scholars.filter(
        (s) =>
          s.name.toLowerCase().includes(lowercaseQuery) ||
          s.arabicName.includes(query) ||
          s.specializations.some((spec) => spec.includes(query)),
      ) || []
    );
  }

  searchBooks(query: string): ShafiBook[] {
    const lowercaseQuery = query.toLowerCase();
    return (
      this.data?.books.filter(
        (b) =>
          b.title.toLowerCase().includes(lowercaseQuery) ||
          b.arabicTitle.includes(query) ||
          b.description.includes(query) ||
          b.tags.some((tag) => tag.includes(query)),
      ) || []
    );
  }
}
