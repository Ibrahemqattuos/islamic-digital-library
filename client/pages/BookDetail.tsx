import { useParams, Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  BookOpen,
  User,
  Calendar,
  Download,
  Eye,
  Star,
  ChevronRight,
  ExternalLink,
  Heart,
  Share2,
  Bookmark,
} from "lucide-react";
import { CLASSICAL_BOOKS, GREAT_IMAMS } from "@/data/library";

export default function BookDetail() {
  const { id } = useParams<{ id: string }>();

  // Find the book by ID
  const book = CLASSICAL_BOOKS.find((b) => b.id === id);
  const author = GREAT_IMAMS.find((s) => s.id === book?.authorId);

  if (!book) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4 font-arabic">
              الكتاب غير موجود
            </h1>
            <Link to="/books">
              <Button className="font-arabic">العودة إلى المكتبة</Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const relatedBooks = CLASSICAL_BOOKS.filter(
    (b) => book.relatedBooks.includes(b.id) || b.authorId === book.authorId,
  ).slice(0, 3);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "beginner":
        return "bg-green-100 text-green-800";
      case "intermediate":
        return "bg-yellow-100 text-yellow-800";
      case "advanced":
        return "bg-red-100 text-red-800";
      case "scholar":
        return "bg-purple-100 text-purple-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getDifficultyLabel = (difficulty: string) => {
    switch (difficulty) {
      case "beginner":
        return "مبتدئ";
      case "intermediate":
        return "متوسط";
      case "advanced":
        return "متقدم";
      case "scholar":
        return "علمي";
      default:
        return "غير محدد";
    }
  };

  const getMadhabLabel = (madhhab: string) => {
    switch (madhhab) {
      case "hanafi":
        return "حنفي";
      case "maliki":
        return "مالكي";
      case "shafii":
        return "شافعي";
      case "hanbali":
        return "حنبلي";
      case "general":
        return "عام";
      case "comparative":
        return "مقارن";
      default:
        return madhhab;
    }
  };

  // Mock table of contents
  const tableOfContents = [
    {
      title: "كتاب الطهارة",
      page: 1,
      subsections: ["باب الوضوء", "باب الغسل", "باب التيمم"],
    },
    {
      title: "كتاب الصلاة",
      page: 45,
      subsections: ["باب المواقيت", "باب الأذان", "باب شروط الصلاة"],
    },
    {
      title: "كتاب الزكاة",
      page: 120,
      subsections: ["باب زكاة المال", "باب زكاة الذهب", "باب زكاة الزروع"],
    },
    {
      title: "كتاب الصوم",
      page: 180,
      subsections: ["باب وجوب الصوم", "باب مفطرات الصوم", "باب صوم التطوع"],
    },
    {
      title: "كتاب الحج",
      page: 220,
      subsections: ["باب فرائض الحج", "باب أركان الحج", "باب سنن الحج"],
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="flex items-center space-x-2 rtl:space-x-reverse text-sm">
            <Link
              to="/"
              className="text-gray-600 hover:text-islamic-green-600 font-arabic"
            >
              الرئيسية
            </Link>
            <ChevronRight className="w-4 h-4 text-gray-400" />
            <Link
              to="/books"
              className="text-gray-600 hover:text-islamic-green-600 font-arabic"
            >
              الكتب
            </Link>
            <ChevronRight className="w-4 h-4 text-gray-400" />
            <span className="text-gray-900 font-arabic">
              {book.arabicTitle}
            </span>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Book Header */}
            <Card className="mb-8">
              <CardContent className="p-8">
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="flex-shrink-0">
                    <div className="w-32 h-40 bg-islamic-green-100 rounded-lg flex items-center justify-center">
                      <BookOpen className="w-16 h-16 text-islamic-green-600" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex flex-wrap gap-2 mb-4">
                      <Badge variant="secondary" className="font-arabic">
                        {book.category}
                      </Badge>
                      <Badge className={getDifficultyColor(book.difficulty)}>
                        {getDifficultyLabel(book.difficulty)}
                      </Badge>
                      <Badge variant="outline" className="font-arabic">
                        {getMadhabLabel(book.madhhab)}
                      </Badge>
                    </div>

                    <h1 className="text-3xl font-bold text-gray-900 mb-2 font-arabic">
                      {book.arabicTitle}
                    </h1>
                    <h2 className="text-xl text-gray-600 mb-4">{book.title}</h2>

                    <div className="flex items-center gap-4 mb-4">
                      <Link
                        to={`/scholars/${book.authorId}`}
                        className="flex items-center text-islamic-green-600 hover:text-islamic-green-700"
                      >
                        <User className="w-4 h-4 ml-2" />
                        <span className="font-arabic">{book.author}</span>
                      </Link>
                      <div className="flex items-center text-gray-600">
                        <Calendar className="w-4 h-4 ml-2" />
                        <span className="font-arabic">
                          {book.publishInfo.originalDate}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-6 mb-6 text-sm text-gray-600">
                      <div className="flex items-center">
                        <BookOpen className="w-4 h-4 ml-1" />
                        <span className="font-arabic">{book.pages} صفحة</span>
                      </div>
                      <div className="flex items-center">
                        <Eye className="w-4 h-4 ml-1" />
                        <span>{book.views.toLocaleString()}</span>
                      </div>
                      <div className="flex items-center">
                        <Download className="w-4 h-4 ml-1" />
                        <span>{book.downloads.toLocaleString()}</span>
                      </div>
                      <div className="flex items-center">
                        <Star className="w-4 h-4 text-yellow-400 fill-current ml-1" />
                        <span>{book.rating}</span>
                      </div>
                    </div>

                    <p className="text-gray-700 mb-6 font-arabic leading-relaxed">
                      {book.fullDescription}
                    </p>

                    <div className="flex flex-wrap gap-3">
                      <Button className="font-arabic">
                        <BookOpen className="w-4 h-4 ml-2" />
                        قراءة الكتاب
                      </Button>
                      <Button variant="outline" className="font-arabic">
                        <Download className="w-4 h-4 ml-2" />
                        ت��ميل PDF
                      </Button>
                      <Button variant="outline" size="icon">
                        <Heart className="w-4 h-4" />
                      </Button>
                      <Button variant="outline" size="icon">
                        <Bookmark className="w-4 h-4" />
                      </Button>
                      <Button variant="outline" size="icon">
                        <Share2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Book Content Tabs */}
            <Tabs defaultValue="toc" className="mb-8">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="toc" className="font-arabic">
                  فهرس الكتاب
                </TabsTrigger>
                <TabsTrigger value="preview" className="font-arabic">
                  معاينة
                </TabsTrigger>
                <TabsTrigger value="commentary" className="font-arabic">
                  الشروح
                </TabsTrigger>
                <TabsTrigger value="reviews" className="font-arabic">
                  التقييمات
                </TabsTrigger>
              </TabsList>

              <TabsContent value="toc" className="mt-6">
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-lg font-bold mb-4 font-arabic">
                      فهرس المحتويات
                    </h3>
                    <div className="space-y-4">
                      {tableOfContents.map((chapter, index) => (
                        <div
                          key={index}
                          className="border-r-2 border-islamic-green-200 pr-4"
                        >
                          <div className="flex justify-between items-center mb-2">
                            <h4 className="font-semibold text-gray-900 font-arabic">
                              {chapter.title}
                            </h4>
                            <span className="text-sm text-gray-500">
                              ص {chapter.page}
                            </span>
                          </div>
                          <ul className="space-y-1 mr-4">
                            {chapter.subsections.map((subsection, subIndex) => (
                              <li
                                key={subIndex}
                                className="text-sm text-gray-600 font-arabic"
                              >
                                • {subsection}
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="preview" className="mt-6">
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-lg font-bold mb-4 font-arabic">
                      معاينة من الكتاب
                    </h3>
                    <div className="bg-gray-50 p-6 rounded-lg font-arabic leading-loose text-right">
                      <p className="mb-4">بسم الله الرحمن الرحيم</p>
                      <p className="mb-4">
                        الحمد لله رب العالمين، والصلاة والسلام على أشرف
                        المرسلين، سيدنا محمد وعلى آله وصحبه أجمعين...
                      </p>
                      <p className="mb-4">
                        أما بعد، فهذا كتاب في الفقه الإسلامي�� جمعت فيه أصول
                        الأحكام وفروعها، مستنداً إلى كتاب الله وسنة رسوله صلى
                        الله عليه وسلم...
                      </p>
                      <p className="text-sm text-gray-500 mt-6">
                        [هذه معاينة من الكتاب - للحصول على النص كاملاً يرجى
                        تحميل الكتاب]
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="commentary" className="mt-6">
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-lg font-bold mb-4 font-arabic">
                      الشروح والتعليقات
                    </h3>
                    {book.commentaries.length > 0 ? (
                      <div className="space-y-4">
                        {book.commentaries.map((commentary, index) => (
                          <div
                            key={index}
                            className="border border-gray-200 rounded-lg p-4"
                          >
                            <h4 className="font-semibold font-arabic">
                              {commentary}
                            </h4>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-gray-600 font-arabic">
                        لا توجد شروح مسجلة لهذا الكتاب حالياً
                      </p>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="reviews" className="mt-6">
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-lg font-bold mb-4 font-arabic">
                      تقييمات القراء
                    </h3>
                    <div className="flex items-center gap-4 mb-6">
                      <div className="text-3xl font-bold">{book.rating}</div>
                      <div>
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-5 h-5 ${
                                i < Math.floor(book.rating)
                                  ? "text-yellow-400 fill-current"
                                  : "text-gray-300"
                              }`}
                            />
                          ))}
                        </div>
                        <div className="text-sm text-gray-600 font-arabic">
                          بناءً على {Math.floor(book.views / 10)} تقييم
                        </div>
                      </div>
                    </div>
                    <p className="text-gray-600 font-arabic">
                      التقييمات التفصيلية ستكون متاحة قريباً
                    </p>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Author Info */}
            {author && (
              <Card className="mb-6">
                <CardContent className="p-6">
                  <h3 className="text-lg font-bold mb-4 font-arabic">
                    عن المؤلف
                  </h3>
                  <div className="text-center mb-4">
                    <div className="w-16 h-16 bg-islamic-green-100 rounded-full mx-auto mb-3 flex items-center justify-center">
                      <User className="w-8 h-8 text-islamic-green-600" />
                    </div>
                    <h4 className="font-bold font-arabic">
                      {author.arabicName}
                    </h4>
                    <p className="text-sm text-gray-600 font-arabic">
                      {author.title}
                    </p>
                    <p className="text-xs text-gray-500 font-arabic">
                      {author.birthYear} - {author.deathYear}
                    </p>
                  </div>
                  <p className="text-sm text-gray-700 mb-4 font-arabic leading-relaxed">
                    {author.biography}
                  </p>
                  <Link to={`/scholars/${author.id}`}>
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full font-arabic"
                    >
                      عرض السيرة كاملة
                      <ExternalLink className="w-4 h-4 mr-2" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            )}

            {/* Book Details */}
            <Card className="mb-6">
              <CardContent className="p-6">
                <h3 className="text-lg font-bold mb-4 font-arabic">
                  تفاصيل الكتاب
                </h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600 font-arabic">اللغة:</span>
                    <span className="font-arabic">
                      {book.language === "arabic"
                        ? "عربي"
                        : book.language === "english"
                          ? "إنجليزي"
                          : "عربي وإنجليزي"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 font-arabic">التصنيف:</span>
                    <span className="font-arabic">{book.subcategory}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 font-arabic">المذهب:</span>
                    <span className="font-arabic">
                      {getMadhabLabel(book.madhhab)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 font-arabic">
                      تاريخ التأليف:
                    </span>
                    <span className="font-arabic">
                      {book.publishInfo.originalDate}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 font-arabic">الناشر:</span>
                    <span className="font-arabic">
                      {book.publishInfo.publisher}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Tags */}
            <Card className="mb-6">
              <CardContent className="p-6">
                <h3 className="text-lg font-bold mb-4 font-arabic">المواضيع</h3>
                <div className="flex flex-wrap gap-2">
                  {book.tags.map((tag, index) => (
                    <Badge
                      key={index}
                      variant="outline"
                      className="font-arabic"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Related Books */}
            {relatedBooks.length > 0 && (
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-bold mb-4 font-arabic">
                    كتب ذات صلة
                  </h3>
                  <div className="space-y-4">
                    {relatedBooks.map((relatedBook) => (
                      <Link
                        key={relatedBook.id}
                        to={`/books/${relatedBook.id}`}
                      >
                        <div className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                          <div className="w-10 h-12 bg-islamic-green-100 rounded flex items-center justify-center flex-shrink-0">
                            <BookOpen className="w-5 h-5 text-islamic-green-600" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="font-semibold text-sm font-arabic line-clamp-2">
                              {relatedBook.arabicTitle}
                            </h4>
                            <p className="text-xs text-gray-600 font-arabic">
                              {relatedBook.author}
                            </p>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
