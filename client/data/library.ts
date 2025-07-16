// Data structures for the Islamic Digital Library

export interface Scholar {
  id: string;
  name: string;
  arabicName: string;
  title: string;
  birthYear: string;
  deathYear: string;
  birthPlace: string;
  deathPlace: string;
  madhhab: "hanafi" | "maliki" | "shafii" | "hanbali" | "zahiri" | "other";
  specializations: string[];
  biography: string;
  fullBiography: string;
  contributions: string[];
  majorWorks: string[];
  teachers: string[];
  students: string[];
  contemporaries: string[];
  period: string;
  image?: string;
  quotes: string[];
}

export interface Book {
  id: string;
  title: string;
  arabicTitle: string;
  author: string;
  authorId: string;
  category: string;
  subcategory: string;
  madhhab:
    | "hanafi"
    | "maliki"
    | "shafii"
    | "hanbali"
    | "general"
    | "comparative";
  description: string;
  fullDescription: string;
  language: "arabic" | "english" | "both";
  pages: number;
  chapters: Chapter[];
  tableOfContents: TableOfContentsItem[];
  publishInfo: {
    originalDate?: string;
    publishedDate: string;
    publisher: string;
    editor?: string;
  };
  tags: string[];
  relatedBooks: string[];
  commentaries: string[];
  rating: number;
  downloads: number;
  views: number;
  pdfUrl?: string;
  content?: string;
  difficulty: "beginner" | "intermediate" | "advanced" | "scholar";
}

export interface Chapter {
  id: string;
  title: string;
  arabicTitle: string;
  pageStart: number;
  pageEnd: number;
  content: string;
  subsections?: Subsection[];
}

export interface Subsection {
  id: string;
  title: string;
  arabicTitle: string;
  content: string;
}

export interface TableOfContentsItem {
  id: string;
  title: string;
  arabicTitle: string;
  page: number;
  level: number;
  children?: TableOfContentsItem[];
}

export interface Madhhab {
  id: string;
  name: string;
  arabicName: string;
  founder: string;
  founderId: string;
  description: string;
  principles: string[];
  keyScholars: string[];
  majorWorks: string[];
  regions: string[];
  characteristics: string[];
}

// The Four Great Imams
export const GREAT_IMAMS: Scholar[] = [
  {
    id: "abu-hanifa",
    name: "Abu Hanifa al-Nu'man",
    arabicName: "أبو حنيفة النعمان",
    title: "الإمام الأعظم",
    birthYear: "80 هـ / 699 م",
    deathYear: "150 هـ / 767 م",
    birthPlace: "الكوفة، العراق",
    deathPlace: "بغداد، العراق",
    madhhab: "hanafi",
    specializations: ["الفقه", "أصول الفقه", "القياس", "الرأي"],
    biography:
      "الإمام الأعظم أبو حنيفة النعمان بن ثابت التيمي، إمام المذهب الحنفي ومؤسس أول المذاهب الفقهية الأربعة.",
    fullBiography: `أبو حنيفة النعمان بن ثابت بن زوطا التيمي الكوفي (80-150 هـ) هو الإمام الأعظم وإمام أهل الرأي، ومؤسس المذهب الحنفي. وُلد في الكوفة في عهد الخليفة الأموي عبد الملك بن مروان.

تميز الإمام أبو حنيفة بذكائه الحاد وقدرته على الاستنباط والقياس، مما جعله يُلقب بـ"إمام أهل الرأي". عاش في فترة انتقالية مهمة في تاريخ الفقه الإسلامي، حيث كان هناك حاجة لتطوير منهجية فقهية تواكب التطورات الاجتماعية والسياسية.

أسس الإمام أبو حنيفة مدرسة فقهية اعتمدت على القرآن والسنة أولاً، ثم الإجماع والقياس والاستحسان والعرف. وكان يؤمن بأهمية الرأي المبني على الأدلة الشرعية في حل المسائل الفقهية الجديدة.

من أبرز خصائص منهجه:
- التوسع في استخدام القياس
- الاهتمام بالاستحسان كأصل من أصول الفقه
- مراعاة العرف والمصلحة
- التيسير على الناس في الأحكام

لم يترك الإمام أبو حنيفة كتباً مؤلفة بيده، ولكن تلاميذه حفظوا علمه ونقلوه، وأشهرهم أبو يوسف ومحمد بن الحسن الشيباني. توفي في بغداد في عهد الخليفة العباسي أبو جعفر المنصور.`,
    contributions: [
      "تأسيس المذهب الحنفي",
      "تطوير منهجية القياس في الفقه",
      "وضع أسس الاستحسان كمصدر تشريعي",
      "تربية جيل من الفقهاء المتميزين",
    ],
    majorWorks: ["الفقه الأكبر", "الوصية", "رسالة إلى عثمان البتي"],
    teachers: ["حماد بن أبي سليمان", "عطاء بن أبي رباح", "الشعبي"],
    students: ["أبو يوسف", "محمد بن الحسن الشيباني", "زفر بن الهذيل"],
    contemporaries: ["الإمام مالك", "سفيان الثوري", "الأوزاعي"],
    period: "العصر الأموي والعباسي المبكر",
    quotes: [
      "لولا السنتان لهلك النعمان",
      "إذا صح الحديث فهو مذهبي",
      "لا يحل لأحد أن يأخذ بقولنا ما لم يعلم من أين أخذناه",
    ],
  },
  {
    id: "malik",
    name: "Malik ibn Anas",
    arabicName: "مالك بن أنس",
    title: "إمام دار الهجرة",
    birthYear: "93 هـ / 711 م",
    deathYear: "179 هـ / 795 م",
    birthPlace: "المدينة المنورة",
    deathPlace: "المدينة المنورة",
    madhhab: "maliki",
    specializations: ["الحديث", "الفقه", "عمل أهل المدينة"],
    biography:
      "إمام دار اله��رة وصاحب الموطأ، أحد الأئمة الأربعة ومؤسس المذهب المالكي.",
    fullBiography: `الإمام مالك بن أنس بن مالك بن أبي عامر الأصبحي المدني (93-179 هـ) هو إمام دار الهجرة وأحد الأئمة الأربعة المجتهدين، ومؤسس المذهب المالكي.

وُلد ونشأ في المدينة المنورة، مدينة الرسول صلى الله عليه وسلم، مما أكسبه معرفة عميقة بأعمال أهل المدينة وتطبيقاتهم العملية للأحكام الشرعية. طلب العلم من صغره وأخذ عن كبار التابعين وتابعيهم.

تميز منهج الإمام مالك بالاعتماد على:
- القرآن الكريم
- السنة النبوية الصحيحة
- عمل أهل المدينة (الإجماع العملي)
- الإجماع
- القياس
- المصلحة المرسلة
- الاستحسان
- سد الذرائع

أشهر مؤلفاته "الموطأ" الذي يعتبر من أقدم كتب الحديث والفقه المؤلفة، وقد أثنى عليه العلماء كثيراً. قال الشافعي: "ما ظهر على الأرض كتاب بعد كتاب الله أصح من كتاب مالك".

كان الإمام مالك معروفاً بورعه وتقواه، وكان يعظم السنة النبوية تعظيماً شديداً، حتى أنه كان لا يركب في المدينة تعظيماً لتراب وطئته أقدام النبي صلى الله عليه وسلم.

انتشر مذهبه في المغرب والأندلس ومصر وبلاد السودان، وما زال المذهب السائد في شمال وغرب أفريقيا حتى اليوم.`,
    contributions: [
      "تأليف الموطأ - أول كتاب جامع للحديث والفقه",
      "تأسيس المذهب المالكي",
      "تطوير مفهوم عمل أهل المدينة كدليل شرعي",
      "وضع أسس المصلحة المرسلة وسد الذرائع",
    ],
    majorWorks: ["الموطأ", "رسالة في أصول الفقه", "تفسير غريب القرآن"],
    teachers: ["نافع مولى ابن عمر", "الزهري", "يحيى بن سعيد الأنصاري"],
    students: ["الشافعي", "ابن القاسم", "أشهب"],
    contemporaries: ["أبو حنيفة", "سفيان الثوري", "الليث بن سعد"],
    period: "العصر الأموي والعباسي",
    quotes: [
      "ليس العلم بكثرة الرواية، ولكن العلم نور يقذفه الله في القلب",
      "كل أحد يؤخذ من قوله ويترك إلا صاحب هذا القبر",
      "لا أدري نصف العلم",
    ],
  },
  {
    id: "al-shafii",
    name: "Muhammad ibn Idris al-Shafi'i",
    arabicName: "محمد بن إدريس الشافعي",
    title: "ناصر السنة",
    birthYear: "150 هـ / 767 م",
    deathYear: "204 هـ / 820 م",
    birthPlace: "غزة، فلسطين",
    deathPlace: "الفسطاط، مصر",
    madhhab: "shafii",
    specializations: ["أصول الفقه", "الفقه", "الحديث", "اللغة العربية"],
    biography: "واضع علم أصول الفقه ومؤسس المذهب الشافعي، أحد الأئمة الأربعة.",
    fullBiography: `الإمام محمد بن إدريس الشافعي المطلبي القرشي (150-204 هـ) هو واضع علم أصول الفقه وأحد الأئمة الأربعة المجتهدين، ومؤسس المذهب الشافعي.

وُلد في غزة ونشأ في مكة، ثم رحل إلى المدينة وأخذ عن الإمام مالك، ثم إلى العراق وأخذ عن تلاميذ أبي حنيفة، ثم استقر في مصر حيث توفي.

يُعتبر الإمام الشافعي أول من وضع علم أصول الفقه في كتابه "الرسالة"، والذي وضع فيه القواعد والضوابط لاستنباط الأحكام الشرعية من مصادرها.

أصول مذهبه ترتيباً:
1. القرآن الكريم
2. السنة النبوية
3. الإجماع
4. القياس

تميز منهجه بالدقة والوضوح في التعامل مع النصوص، ورفض الاستحسان والمصلحة المرسلة إذا لم تكن مستندة إلى نص صريح.

له مذهبان: القديم (وضعه في بغداد) والجديد (وضعه في مصر)، والمعتمد هو المذهب الجديد.

أشهر كتبه "الأم" في الفقه و"الرسالة" في أصول الفقه. كان بليغاً فصيحاً، شاعراً أديباً، وكان يحفظ ديوان هذيل كاملاً.

انتشر مذهبه في مصر والشام والحجاز وأجزاء من العراق واليمن، وهو المذهب السائد اليوم في مصر وبلاد الشام وإندونيسيا وماليزيا.`,
    contributions: [
      "وضع علم أصول الفقه",
      "تأليف الرسالة - أول كتاب في أصول الفقه",
      "تطوير منهجية دقيقة لفهم النصوص",
      "التوفيق بين مدرسة أهل الحديث وأهل الرأي",
    ],
    majorWorks: [
      "الرسالة",
      "الأم",
      "أحكام القرآن",
      "مسند الشافعي",
      "اختلاف الحديث",
    ],
    teachers: ["الإمام مالك", "محمد بن الحسن الشيباني", "سفيان بن عيينة"],
    students: ["أحمد بن حنبل", "البويطي", "المزني", "الربيع بن سليمان"],
    contemporaries: ["أحمد بن حنبل", "إسحاق بن راهويه", "يحيى بن معين"],
    period: "العصر العباسي",
    quotes: [
      "ما أفلح من آذى المعلمين",
      "طلب العلم أولى من طلب المال",
      "ما ناظرت أحداً إلا وددت أن يوفق ويسدد ويعان ويكون عليه رعاية من الله وحفظ",
    ],
  },
  {
    id: "ahmad-ibn-hanbal",
    name: "Ahmad ibn Muhammad ibn Hanbal",
    arabicName: "أحمد بن محمد بن حنبل",
    title: "إمام أهل السنة",
    birthYear: "164 هـ / 780 م",
    deathYear: "241 هـ / 855 م",
    birthPlace: "بغداد، العراق",
    deathPlace: "بغداد، العراق",
    madhhab: "hanbali",
    specializations: ["الحديث", "الفقه", "العقيدة", "الرجال"],
    biography:
      "إمام أهل السنة وأحد الأئمة الأربعة، محدث عصره ومؤسس المذهب الحنبلي.",
    fullBiography: `الإمام أحمد بن محمد بن حنبل الشيباني الذهلي (164-241 هـ) هو إمام أهل السنة والجماعة، وأحد الأئمة الأربعة المجتهدين، ومؤسس المذهب الحنبلي.

وُلد في بغداد ونشأ بها، وطلب العلم من صغره ورحل في طلب الحديث إلى مختلف البلدان. التقى بالإمام الشافعي وأخذ عنه، وكان الشافعي يقول: "خرجت من بغداد وما خلّفت بها أحداً أورع ولا أتقى ولا أفقه من أحمد بن حنبل".

اشتهر الإمام أحمد بالحديث أكثر من الفقه، وكان يُعتبر أحد حفاظ الحديث الكبار. جمع في مسنده حوالي 30 ألف حديث، وهو من أشهر كتب الحديث.

منهجه في الفقه:
- الكتاب والسنة أولاً
- فتاوى الصحابة إذا لم تُعرف لهم مخالف
- الأخذ بالأضعف من أقوال الصحابة إذا اختلفوا
- الحديث الضعيف أولى من الرأي
- القياس عند الضرورة

تعرض لمحنة خلق القرآن في عهد المأمون والمعتصم والواثق، وصبر على التعذيب ولم يقل بخلق القرآن، مما جعله رمزاً للصمود أمام البدع.

كان زاهداً متقشفاً، ورعاً تقياً، يأكل من عمل يده. انتشر مذهبه في بلاد الشام والعراق ونجد، وهو المذهب الرسمي في المملكة العربية السعودية اليوم.`,
    contributions: [
      "جمع وتأليف المسند - أشهر كتب الحديث",
      "الصمود في محنة خلق القرآن",
      "تأسيس المذهب الحنبلي",
      "تطوير منهج الاعتماد على النص والأثر",
    ],
    majorWorks: [
      "المسند",
      "كتاب السنة",
      "كتاب الورع",
      "فضائل الصحابة",
      "كتاب الزهد",
    ],
    teachers: [
      "الإمام الشافعي",
      "سفيان بن عيينة",
      "وكيع بن الجراح",
      "يحيى بن سعيد القطان",
    ],
    students: ["البخاري", "مسلم", "أبو داود", "الترمذي", "ابنه عبد الله"],
    contemporaries: ["البخاري", "مسلم", "أبو داود", "يحيى بن معين"],
    period: "العصر العباسي",
    quotes: [
      "العلم لا يعدله شيء إذا كان خالصاً",
      "الناس يحتاجون إلى العلم أكثر من حاجتهم إلى الطعام والشراب",
      "أصول السنة عندنا التمسك بما كان عليه أصحاب رسول الله",
    ],
  },
];

// Major Classical Books by Madhhab
export const CLASSICAL_BOOKS: Book[] = [
  // Hanafi Books
  {
    id: "al-mabsut",
    title: "Al-Mabsut",
    arabicTitle: "المبسوط",
    author: "Muhammad ibn Ahmad al-Sarakhsi",
    authorId: "al-sarakhsi",
    category: "الفقه",
    subcategory: "الفقه الحنفي",
    madhhab: "hanafi",
    description: "أشهر كتب الفقه الحنفي، شرح مفصل لكتاب الكافي للحاكم الشهيد",
    fullDescription:
      "المبسوط للسرخسي هو من أعظم كتب الفقه الحنفي وأشملها، يقع في ثلاثين جزءاً، وهو شرح لكتاب الكافي للحاكم الشهيد. أملاه السرخسي من محبسه، وهو من أهم المراجع في المذهب الحنفي.",
    language: "arabic",
    pages: 9000,
    chapters: [],
    tableOfContents: [],
    publishInfo: {
      originalDate: "483 هـ",
      publishedDate: "1906",
      publisher: "مطبعة السعادة",
    },
    tags: ["فقه حنفي", "فقه مقارن", "أصول"],
    relatedBooks: ["al-hidaya", "badai-al-sanai"],
    commentaries: [],
    rating: 4.9,
    downloads: 2500,
    views: 15000,
    difficulty: "advanced",
  },
  {
    id: "al-hidaya",
    title: "Al-Hidaya",
    arabicTitle: "الهداية",
    author: "Burhan al-Din al-Marghinani",
    authorId: "al-marghinani",
    category: "الفقه",
    subcategory: "الفقه الحنفي",
    madhhab: "hanafi",
    description: "من أشهر متون الفقه الحنفي، شرح لكتاب بداية المبتدي",
    fullDescription:
      "الهداية في شرح بداية المبتدي للمرغيناني، من أهم كتب الفقه الحنفي وأكثرها دراسة في المدارس الشرعية. يتميز بوضوح العبارة ودقة التنظيم.",
    language: "arabic",
    pages: 1200,
    chapters: [],
    tableOfContents: [],
    publishInfo: {
      originalDate: "593 هـ",
      publishedDate: "1900",
      publisher: "دار المعرفة",
    },
    tags: ["فقه حنفي", "متن فقهي"],
    relatedBooks: ["al-mabsut", "bidayat-al-mubtadi"],
    commentaries: ["fath-al-qadeer"],
    rating: 4.8,
    downloads: 3200,
    views: 18000,
    difficulty: "intermediate",
  },

  // Maliki Books
  {
    id: "al-muwatta",
    title: "Al-Muwatta",
    arabicTitle: "الموطأ",
    author: "Malik ibn Anas",
    authorId: "malik",
    category: "الحديث والفقه",
    subcategory: "الفقه المالكي",
    madhhab: "maliki",
    description: "أول كتاب جامع للحديث والفقه، من أصح الكتب بعد القرآن",
    fullDescription:
      'الموطأ للإمام مالك هو أول كتاب ألف في الحديث والفقه معاً، جمع فيه الإمام مالك الأحاديث الصحيحة وأقوال الصحابة والتابعين وعمل أهل المدينة. قال عنه الشافعي: "ما ظهر على الأرض كتاب بعد كتاب الله أصح من كتاب مالك".',
    language: "arabic",
    pages: 600,
    chapters: [],
    tableOfContents: [],
    publishInfo: {
      originalDate: "179 هـ",
      publishedDate: "1985",
      publisher: "دار الكتب العلمية",
    },
    tags: ["حديث", "فقه مالكي", "عمل أهل المدينة"],
    relatedBooks: ["al-mudawwana", "al-risala"],
    commentaries: ["al-muntaha", "sharh-al-zarqani"],
    rating: 4.9,
    downloads: 4500,
    views: 25000,
    difficulty: "intermediate",
  },
  {
    id: "al-mudawwana",
    title: "Al-Mudawwana",
    arabicTitle: "المدونة",
    author: "Sahnun ibn Sa'id",
    authorId: "sahnun",
    category: "الفقه",
    subcategory: "الفقه المالكي",
    madhhab: "maliki",
    description: "أشهر كتب الفقه المالكي، نقل فيه سحنون أقوال الإمام مالك",
    fullDescription:
      "المدونة الكبرى لسحنون، وهي من أهم كتب المذهب المالكي، جمع فيها سحنون أقوال الإمام مالك في الفقه من خلال تلميذه ابن القاسم.",
    language: "arabic",
    pages: 2000,
    chapters: [],
    tableOfContents: [],
    publishInfo: {
      originalDate: "240 هـ",
      publishedDate: "1900",
      publisher: "دار الكتب العلمية",
    },
    tags: ["فقه مالكي", "أقوال مالك"],
    relatedBooks: ["al-muwatta", "al-risala"],
    commentaries: [],
    rating: 4.7,
    downloads: 1800,
    views: 12000,
    difficulty: "advanced",
  },

  // Shafi'i Books
  {
    id: "al-umm",
    title: "Al-Umm",
    arabicTitle: "الأم",
    author: "Muhammad ibn Idris al-Shafi'i",
    authorId: "al-shafii",
    category: "الفقه",
    subcategory: "الفقه الشافعي",
    madhhab: "shafii",
    description: "كتاب الفقه الشافعي الأساسي، يحتوي على المذهب الجديد للشافعي",
    fullDescription:
      "كتاب الأم للإمام الشافعي، وهو أهم كتب الفقه الشافعي، يحتوي على آراء الإمام الشافعي الفقهية في مذهبه الجديد الذي استقر عليه في مصر.",
    language: "arabic",
    pages: 2500,
    chapters: [],
    tableOfContents: [],
    publishInfo: {
      originalDate: "204 هـ",
      publishedDate: "1990",
      publisher: "دار المعرفة",
    },
    tags: ["فقه شافعي", "مذهب جديد"],
    relatedBooks: ["al-risala", "musnad-al-shafii"],
    commentaries: ["al-majmu", "al-muhazzab"],
    rating: 4.8,
    downloads: 3000,
    views: 20000,
    difficulty: "advanced",
  },
  {
    id: "al-risala",
    title: "Al-Risala",
    arabicTitle: "الرسالة",
    author: "Muhammad ibn Idris al-Shafi'i",
    authorId: "al-shafii",
    category: "أصول الفقه",
    subcategory: "أصول الفقه",
    madhhab: "general",
    description: "أول كتاب مؤلف في علم أصول الفقه",
    fullDescription:
      "الرسالة للإمام الشافعي هي أول كتاب مؤلف في علم أصول الفقه، وضع فيها الإمام الشافعي القواعد والأصول التي يستند إليها في استنباط الأحكام الشرعية.",
    language: "arabic",
    pages: 300,
    chapters: [],
    tableOfContents: [],
    publishInfo: {
      originalDate: "204 هـ",
      publishedDate: "1940",
      publisher: "مطبعة مصطفى البابي الحلبي",
    },
    tags: ["أصول الفقه", "منهجية", "استنباط"],
    relatedBooks: ["al-umm", "al-majmu"],
    commentaries: [],
    rating: 4.9,
    downloads: 5000,
    views: 30000,
    difficulty: "advanced",
  },

  // Hanbali Books
  {
    id: "musnad-ahmad",
    title: "Musnad Ahmad",
    arabicTitle: "مسند الإمام أحمد",
    author: "Ahmad ibn Muhammad ibn Hanbal",
    authorId: "ahmad-ibn-hanbal",
    category: "الحديث",
    subcategory: "المسانيد",
    madhhab: "general",
    description: "أكبر كتب الحدي��، يحتوي على حوالي 30 ألف حديث",
    fullDescription:
      "مسند الإمام أحمد بن حنبل، من أشهر وأكبر كتب الحديث، جمع فيه الإمام أحمد حوالي 30 ألف حديث مرتبة على أسماء الصحابة.",
    language: "arabic",
    pages: 6000,
    chapters: [],
    tableOfContents: [],
    publishInfo: {
      originalDate: "241 هـ",
      publishedDate: "1950",
      publisher: "دار صادر",
    },
    tags: ["حديث", "مسند", "صحابة"],
    relatedBooks: ["sahih-bukhari", "sahih-muslim"],
    commentaries: [],
    rating: 4.9,
    downloads: 6000,
    views: 35000,
    difficulty: "intermediate",
  },
];

// Madhhab Information
export const MADHABS: Madhhab[] = [
  {
    id: "hanafi",
    name: "Hanafi",
    arabicName: "الحنفي",
    founder: "Abu Hanifa al-Nu'man",
    founderId: "abu-hanifa",
    description: "أول المذاهب الفقهية الأربعة تأسيساً، يعتمد على الرأي والقياس",
    principles: [
      "القرآن الكريم",
      "السنة النبوية",
      "الإجماع",
      "القياس",
      "الاستحسان",
      "العرف",
      "قول الصحابي",
    ],
    keyScholars: ["abu-hanifa", "abu-yusuf", "muhammad-al-shaybani"],
    majorWorks: ["al-mabsut", "al-hidaya", "badai-al-sanai"],
    regions: [
      "تركيا",
      "آسيا الوسطى",
      "الهند",
      "باكستان",
      "أفغانستان",
      "البلقان",
    ],
    characteristics: [
      "التوسع في استخدام القياس",
      "الاهتمام بالاستحسان",
      "مراعاة العرف والعادة",
      "التيسير في الأحكام",
    ],
  },
  {
    id: "maliki",
    name: "Maliki",
    arabicName: "المالكي",
    founder: "Malik ibn Anas",
    founderId: "malik",
    description: "مذهب أهل المدينة، يعتمد على عمل أهل المدينة والمصلحة",
    principles: [
      "القرآن الكريم",
      "السنة النبوية",
      "عمل أهل المدينة",
      "الإجماع",
      "القياس",
      "المصلحة المرسلة",
      "الاستحسان",
      "سد الذرائع",
    ],
    keyScholars: ["malik", "ibn-qasim", "sahnun"],
    majorWorks: ["al-muwatta", "al-mudawwana", "al-risala"],
    regions: [
      "المغرب",
      "الجزا��ر",
      "تونس",
      "ليبيا",
      "موريتانيا",
      "السودان",
      "مالي",
    ],
    characteristics: [
      "الاعتماد على عمل أهل المدينة",
      "الاهتمام بالمصلحة المرسلة",
      "سد الذرائع",
      "مراعاة المقاصد",
    ],
  },
  {
    id: "shafii",
    name: "Shafi'i",
    arabicName: "الشافعي",
    founder: "Muhammad ibn Idris al-Shafi'i",
    founderId: "al-shafii",
    description: "مذهب متوسط بين أهل الحديث وأهل الرأي، واضع أصول الفقه",
    principles: ["القرآن الكريم", "السنة النبوية", "الإجماع", "القياس"],
    keyScholars: ["al-shafii", "al-buwayti", "al-muzani"],
    majorWorks: ["al-umm", "al-risala", "musnad-al-shafii"],
    regions: ["مصر", "الشام", "الحجاز", "اليمن", "إندونيسيا", "ماليزيا"],
    characteristics: [
      "وضع علم أصول الفقه",
      "الدقة في التعامل مع النصوص",
      "رفض الاستحسان والمصلحة المرسلة",
      "التوسط بين المذاهب",
    ],
  },
  {
    id: "hanbali",
    name: "Hanbali",
    arabicName: "الحنبلي",
    founder: "Ahmad ibn Muhammad ibn Hanbal",
    founderId: "ahmad-ibn-hanbal",
    description: "مذهب أهل الحديث والأثر، أكثر المذاهب تمسكاً بالنصوص",
    principles: [
      "القرآن الكريم",
      "السنة النبوية",
      "فتاوى الصحابة",
      "الحديث الضعيف (أولى من الرأي)",
      "القياس (عند الضرورة)",
    ],
    keyScholars: ["ahmad-ibn-hanbal", "ibn-qudama", "ibn-taymiyyah"],
    majorWorks: ["musnad-ahmad", "al-mughni", "majmu-al-fatawa"],
    regions: ["السعودية", "قطر", "الإمارات", "أجزاء من الشام والعراق"],
    characteristics: [
      "التمسك الشديد بالنصوص",
      "تقديم الحديث الضعيف على الرأي",
      "الاعتماد على أقوال الصحابة",
      "الحذر من الرأي والقياس",
    ],
  },
];
