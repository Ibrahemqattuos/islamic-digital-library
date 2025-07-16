import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
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
  FileText,
  Award,
  Link as LinkIcon,
} from "lucide-react";
import {
  ShafiDataLoader,
  type ShafiBook,
  type ShafiDataset,
} from "@/data/shafii-data";

export default function ShafiBookDetail() {
  const { id } = useParams<{ id: string }>();
  const [data, setData] = useState<ShafiDataset | null>(null);
  const [loading, setLoading] = useState(true);

  const dataLoader = ShafiDataLoader.getInstance();

  useEffect(() => {
    const loadData = async () => {
      try {
        const shafiData = await dataLoader.loadData();
        setData(shafiData);
      } catch (error) {
        console.error("Error loading Shafi data:", error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-islamic-green-600 mx-auto mb-4"></div>
            <p className="text-gray-600 font-arabic">جاري تحميل البيانات...</p>
          </div>
        </div>
      </div>
    );
  }

  // Find the book by ID
  const book = dataLoader.getBookById(id || "");

  if (!book) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4 font-arabic">
              الك��اب غير موجود
            </h1>
            <Link to="/shafi-books">
              <Button className="font-arabic">العودة إلى كتب الشافعية</Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Find related data
  const author = dataLoader.getScholarById(book.authorId);
  const relatedBooks = dataLoader.getRelatedBooks(book.id);
  const bookConnections =
    data?.bookConnections.filter(
      (c) => c.sourceBookId === book.id || c.targetBookId === book.id,
    ) || [];

  const getBookTypeLabel = (type: string) => {
    switch (type) {
      case "original":
        return "أصلي";
      case "commentary":
        return "شرح";
      case "summary":
        return "مختصر";
      case "critique":
        return "نقد";
      case "study":
        return "دراسة";
      default:
        return type;
    }
  };

  const getImportanceLabel = (importance: string) => {
    switch (importance) {
      case "fundamental":
        return "أساسي";
      case "important":
        return "مهم";
      case "supplementary":
        return "مكمل";
      default:
        return importance;
    }
  };

  const getImportanceColor = (importance: string) => {
    switch (importance) {
      case "fundamental":
        return "bg-red-100 text-red-800";
      case "important":
        return "bg-orange-100 text-orange-800";
      case "supplementary":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "complete":
        return "bg-green-100 text-green-800";
      case "incomplete":
        return "bg-yellow-100 text-yellow-800";
      case "lost":
        return "bg-red-100 text-red-800";
      case "attributed":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "complete":
        return "كامل";
      case "incomplete":
        return "ناقص";
      case "lost":
        return "مفقود";
      case "attributed":
        return "منسوب";
      default:
        return status;
    }
  };

  const getConnectionTypeLabel = (type: string) => {
    switch (type) {
      case "commentary":
        return "شرح";
      case "summary":
        return "اختصار";
      case "critique":
        return "نقد";
      case "response":
        return "رد";
      case "influence":
        return "تأثير";
      case "plagiarism":
        return "اقتباس";
      default:
        return type;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      <Navigation />

      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="flex items-center space-x-2 text-sm">
            <Link
              to="/"
              className="text-gray-600 hover:text-islamic-green-600 font-arabic"
            >
              الرئيسية
            </Link>
            <ChevronLeft className="w-4 h-4 text-gray-400" />
            <Link
              to="/shafi-books"
              className="text-gray-600 hover:text-islamic-green-600 font-arabic"
            >
              كتب الشافعية
            </Link>
            <ChevronLeft className="w-4 h-4 text-gray-400" />
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
                      <Badge
                        className={`${getImportanceColor(book.importance)}`}
                      >
                        {getImportanceLabel(book.importance)}
                      </Badge>
                      <Badge className={`${getStatusColor(book.status)}`}>
                        {getStatusLabel(book.status)}
                      </Badge>
                      <Badge variant="outline" className="font-arabic">
                        {getBookTypeLabel(book.bookType)}
                      </Badge>
                      {book.verified && (
                        <Badge variant="outline" className="font-arabic">
                          <Star className="w-3 h-3 ml-1" />
                          محقق
                        </Badge>
                      )}
                    </div>

                    <h1 className="text-3xl font-bold text-gray-900 mb-2 font-arabic">
                      {book.arabicTitle}
                    </h1>
                    <h2 className="text-xl text-gray-600 mb-4">{book.title}</h2>

                    {book.subtitle && (
                      <p className="text-lg text-gray-500 mb-4 font-arabic">
                        {book.subtitle}
                      </p>
                    )}

                    <div className="flex items-center gap-4 mb-4">
                      {author ? (
                        <Link
                          to={`/shafi-scholars/${author.id}`}
                          className="flex items-center text-islamic-green-600 hover:text-islamic-green-700"
                        >
                          <User className="w-4 h-4 ml-2" />
                          <span className="font-arabic">{book.authorName}</span>
                        </Link>
                      ) : (
                        <div className="flex items-center text-gray-600">
                          <User className="w-4 h-4 ml-2" />
                          <span className="font-arabic">{book.authorName}</span>
                        </div>
                      )}
                      <div className="flex items-center text-gray-600">
                        <Calendar className="w-4 h-4 ml-2" />
                        <span className="font-arabic">
                          {book.publishInfo.originalDate || "غير محدد"}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-6 mb-6 text-sm text-gray-600">
                      {book.pages && (
                        <div className="flex items-center">
                          <FileText className="w-4 h-4 ml-1" />
                          <span className="font-arabic">{book.pages} صفحة</span>
                        </div>
                      )}
                      {book.volumes && book.volumes > 1 && (
                        <div className="flex items-center">
                          <Award className="w-4 h-4 ml-1" />
                          <span className="font-arabic">
                            {book.volumes} مجلد
                          </span>
                        </div>
                      )}
                      <div className="flex items-center">
                        <Eye className="w-4 h-4 ml-1" />
                        <span className="font-arabic">{book.language}</span>
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
                        تحميل PDF
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
            <Tabs defaultValue="overview" className="mb-8">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="overview" className="font-arabic">
                  نظرة عامة
                </TabsTrigger>
                <TabsTrigger value="manuscripts" className="font-arabic">
                  المخطوطات
                </TabsTrigger>
                <TabsTrigger value="connections" className="font-arabic">
                  الروابط
                </TabsTrigger>
                <TabsTrigger value="sources" className="font-arabic">
                  المصادر
                </TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="mt-6">
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-lg font-bold mb-4 font-arabic">
                      نظرة عامة على الكتاب
                    </h3>
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-semibold mb-2 font-arabic">
                          الموضوع:
                        </h4>
                        <p className="text-gray-700 font-arabic">
                          {book.subject}
                        </p>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-2 font-arabic">
                          الوصف التفصيلي:
                        </h4>
                        <p className="text-gray-700 font-arabic leading-relaxed">
                          {book.fullDescription}
                        </p>
                      </div>
                      {book.notes && (
                        <div className="p-4 bg-islamic-green-50 rounded-lg">
                          <h4 className="font-semibold mb-2 font-arabic">
                            ملاحظات:
                          </h4>
                          <p className="text-gray-700 font-arabic">
                            {book.notes}
                          </p>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="manuscripts" className="mt-6">
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-lg font-bold mb-4 font-arabic">
                      معلومات المخطوطات والطبعات
                    </h3>
                    {book.manuscriptInfo ? (
                      <div className="space-y-6">
                        {book.manuscriptInfo.manuscripts.length > 0 && (
                          <div>
                            <h4 className="font-semibold mb-3 font-arabic">
                              المخطوطات:
                            </h4>
                            <ul className="space-y-2">
                              {book.manuscriptInfo.manuscripts.map(
                                (manuscript, index) => (
                                  <li
                                    key={index}
                                    className="flex items-center font-arabic"
                                  >
                                    <div className="w-2 h-2 bg-islamic-green-500 rounded-full ml-2"></div>
                                    {manuscript}
                                  </li>
                                ),
                              )}
                            </ul>
                          </div>
                        )}

                        {book.manuscriptInfo.publishedEditions.length > 0 && (
                          <div>
                            <h4 className="font-semibold mb-3 font-arabic">
                              الطبعات المنشورة:
                            </h4>
                            <ul className="space-y-2">
                              {book.manuscriptInfo.publishedEditions.map(
                                (edition, index) => (
                                  <li
                                    key={index}
                                    className="flex items-center font-arabic"
                                  >
                                    <div className="w-2 h-2 bg-islamic-green-500 rounded-full ml-2"></div>
                                    {edition}
                                  </li>
                                ),
                              )}
                            </ul>
                          </div>
                        )}
                      </div>
                    ) : (
                      <p className="text-gray-600 font-arabic">
                        لا توجد معلومات مخطوطات متاحة حالياً
                      </p>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="connections" className="mt-6">
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-lg font-bold mb-4 font-arabic">
                      الكتب المرتبطة
                    </h3>
                    {bookConnections.length > 0 ? (
                      <div className="space-y-4">
                        {bookConnections.map((connection, index) => {
                          const connectedBookId =
                            connection.sourceBookId === book.id
                              ? connection.targetBookId
                              : connection.sourceBookId;
                          const connectedBook =
                            dataLoader.getBookById(connectedBookId);

                          if (!connectedBook) return null;

                          return (
                            <div
                              key={index}
                              className="border border-gray-200 rounded-lg p-4"
                            >
                              <div className="flex items-start gap-4">
                                <div className="w-10 h-12 bg-islamic-green-100 rounded flex items-center justify-center flex-shrink-0">
                                  <LinkIcon className="w-5 h-5 text-islamic-green-600" />
                                </div>
                                <div className="flex-1">
                                  <div className="flex items-center gap-2 mb-2">
                                    <Badge
                                      variant="outline"
                                      className="text-xs font-arabic"
                                    >
                                      {getConnectionTypeLabel(
                                        connection.connectionType,
                                      )}
                                    </Badge>
                                    {connection.verified && (
                                      <Badge
                                        variant="outline"
                                        className="text-xs"
                                      >
                                        <Star className="w-3 h-3 ml-1" />
                                        محقق
                                      </Badge>
                                    )}
                                  </div>
                                  <Link to={`/shafi-books/${connectedBook.id}`}>
                                    <h4 className="font-bold font-arabic text-islamic-green-600 hover:text-islamic-green-700">
                                      {connectedBook.arabicTitle}
                                    </h4>
                                  </Link>
                                  <p className="text-sm text-gray-600 font-arabic mb-2">
                                    {connectedBook.authorName}
                                  </p>
                                  <p className="text-sm text-gray-700 font-arabic">
                                    {connection.description}
                                  </p>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    ) : (
                      <p className="text-gray-600 font-arabic">
                        لا توجد روابط مسجلة لهذا الكتاب حالياً
                      </p>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="sources" className="mt-6">
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-lg font-bold mb-4 font-arabic">
                      المصادر والمراجع
                    </h3>
                    {book.sources.length > 0 ? (
                      <ul className="space-y-2">
                        {book.sources.map((source, index) => (
                          <li key={index} className="flex items-center">
                            <div className="w-2 h-2 bg-islamic-green-500 rounded-full ml-2"></div>
                            <span className="font-arabic">{source}</span>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-gray-600 font-arabic">
                        لا توجد مصادر مسجلة حالياً
                      </p>
                    )}
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
                  <Link to={`/shafi-scholars/${author.id}`}>
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
                    <span className="text-gray-600 font-arabic">التصنيف:</span>
                    <span className="font-arabic">{book.subcategory}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 font-arabic">النوع:</span>
                    <span className="font-arabic">
                      {getBookTypeLabel(book.bookType)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 font-arabic">الحالة:</span>
                    <span className="font-arabic">
                      {getStatusLabel(book.status)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 font-arabic">الأهمية:</span>
                    <span className="font-arabic">
                      {getImportanceLabel(book.importance)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 font-arabic">اللغة:</span>
                    <span className="font-arabic">{book.language}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 font-arabic">الناشر:</span>
                    <span className="font-arabic">
                      {book.publishInfo.publisher}
                    </span>
                  </div>
                  {book.publishInfo.editor && (
                    <div className="flex justify-between">
                      <span className="text-gray-600 font-arabic">المحقق:</span>
                      <span className="font-arabic">
                        {book.publishInfo.editor}
                      </span>
                    </div>
                  )}
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
                    {relatedBooks.slice(0, 3).map((relatedBook) => (
                      <Link
                        key={relatedBook.id}
                        to={`/shafi-books/${relatedBook.id}`}
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
                              {relatedBook.authorName}
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

function ChevronLeft({ className }: { className: string }) {
  return (
    <svg
      className={className}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M15 19l-7-7 7-7"
      />
    </svg>
  );
}
