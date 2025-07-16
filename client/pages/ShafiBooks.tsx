import { useState, useEffect } from "react";
import Navigation from "@/components/Navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  BookOpen,
  Search,
  Filter,
  Star,
  ArrowRight,
  Download,
  Eye,
  User,
  Calendar,
  FileText,
  Link as LinkIcon,
  Award,
} from "lucide-react";
import { Link, useSearchParams } from "react-router-dom";
import {
  ShafiDataLoader,
  type ShafiBook,
  type ShafiDataset,
} from "@/data/shafii-data";

export default function ShafiBooks() {
  const [data, setData] = useState<ShafiDataset | null>(null);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedBookType, setSelectedBookType] = useState<string | null>(null);
  const [selectedImportance, setSelectedImportance] = useState<string | null>(
    null,
  );
  const [searchParams] = useSearchParams();

  const dataLoader = ShafiDataLoader.getInstance();

  useEffect(() => {
    const loadData = async () => {
      try {
        const shafiData = await dataLoader.loadData();
        setData(shafiData);

        // Handle author filter from URL params
        const authorId = searchParams.get("author");
        if (authorId) {
          // This would filter by author - for now just load normally
        }
      } catch (error) {
        console.error("Error loading Shafi data:", error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [searchParams]);

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

  const books = data?.books || [];
  const categories = [...new Set(books.map((b) => b.category))];
  const bookTypes = [...new Set(books.map((b) => b.bookType))];
  const importanceLevels = [...new Set(books.map((b) => b.importance))];

  // Filter books based on search and filters
  const filteredBooks = books.filter((book) => {
    const matchesSearch =
      !searchQuery ||
      book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.arabicTitle.includes(searchQuery) ||
      book.authorName.includes(searchQuery) ||
      book.description.includes(searchQuery) ||
      book.tags.some((tag) => tag.includes(searchQuery));

    const matchesCategory =
      !selectedCategory || book.category === selectedCategory;

    const matchesBookType =
      !selectedBookType || book.bookType === selectedBookType;

    const matchesImportance =
      !selectedImportance || book.importance === selectedImportance;

    return (
      matchesSearch && matchesCategory && matchesBookType && matchesImportance
    );
  });

  const getBookTypeLabel = (type: string) => {
    switch (type) {
      case "original":
        return "أصل��";
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

  const BookCard = ({ book }: { book: ShafiBook }) => {
    const author = dataLoader.getScholarById(book.authorId);
    const relatedBooks = dataLoader.getRelatedBooks(book.id);

    return (
      <Card className="hover:shadow-lg transition-all duration-300 cursor-pointer group">
        <CardContent className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="flex gap-2 flex-wrap">
              <Badge variant="secondary" className="font-arabic text-xs">
                {book.category}
              </Badge>
              <Badge
                className={`text-xs ${getImportanceColor(book.importance)}`}
              >
                {getImportanceLabel(book.importance)}
              </Badge>
              <Badge className={`text-xs ${getStatusColor(book.status)}`}>
                {getStatusLabel(book.status)}
              </Badge>
            </div>
            {book.verified && (
              <Badge variant="outline" className="text-xs font-arabic">
                <Star className="w-3 h-3 ml-1" />
                محقق
              </Badge>
            )}
          </div>

          <div className="flex items-start space-x-4 rtl:space-x-reverse mb-4">
            <div className="w-16 h-20 bg-islamic-green-100 rounded-md flex items-center justify-center flex-shrink-0">
              <BookOpen className="w-8 h-8 text-islamic-green-600" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-lg font-bold text-gray-900 mb-2 font-arabic line-clamp-2">
                {book.arabicTitle}
              </h3>
              <p className="text-gray-600 font-arabic text-sm mb-2">
                {book.title}
              </p>
              {author ? (
                <Link
                  to={`/shafi-scholars/${author.id}`}
                  className="text-islamic-green-600 hover:text-islamic-green-700 text-sm font-arabic"
                >
                  {book.authorName}
                </Link>
              ) : (
                <p className="text-gray-600 text-sm font-arabic">
                  {book.authorName}
                </p>
              )}
            </div>
          </div>

          <p className="text-sm text-gray-700 mb-4 font-arabic line-clamp-2 leading-relaxed">
            {book.description}
          </p>

          {/* Book Details */}
          <div className="grid grid-cols-2 gap-4 mb-4 text-xs text-gray-600">
            <div className="flex items-center">
              <FileText className="w-3 h-3 ml-1" />
              <span className="font-arabic">
                {getBookTypeLabel(book.bookType)}
              </span>
            </div>
            <div className="flex items-center">
              <Calendar className="w-3 h-3 ml-1" />
              <span className="font-arabic">
                {book.publishInfo.originalDate || "غير محدد"}
              </span>
            </div>
            {book.pages && (
              <div className="flex items-center">
                <Eye className="w-3 h-3 ml-1" />
                <span className="font-arabic">{book.pages} صفحة</span>
              </div>
            )}
            {book.volumes && book.volumes > 1 && (
              <div className="flex items-center">
                <Award className="w-3 h-3 ml-1" />
                <span className="font-arabic">{book.volumes} مجلد</span>
              </div>
            )}
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-1 mb-4">
            {book.tags.slice(0, 3).map((tag, index) => (
              <span
                key={index}
                className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-islamic-green-100 text-islamic-green-700 font-arabic"
              >
                {tag}
              </span>
            ))}
            {book.tags.length > 3 && (
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-gray-100 text-gray-700 font-arabic">
                +{book.tags.length - 3}
              </span>
            )}
          </div>

          {/* Related Books Indicator */}
          {relatedBooks.length > 0 && (
            <div className="flex items-center text-xs text-gray-500 mb-4">
              <LinkIcon className="w-3 h-3 ml-1" />
              <span className="font-arabic">
                {relatedBooks.length} كتاب مرتبط
              </span>
            </div>
          )}

          <div className="flex gap-2">
            <Button className="flex-1 font-arabic text-sm" size="sm" asChild>
              <Link to={`/shafi-books/${book.id}`}>
                <BookOpen className="w-4 h-4 ml-1" />
                تفاصيل الكتاب
              </Link>
            </Button>
            {author && (
              <Button
                variant="outline"
                className="flex-1 font-arabic text-sm"
                size="sm"
                asChild
              >
                <Link to={`/shafi-scholars/${author.id}`}>
                  <User className="w-4 h-4 ml-1" />
                  المؤلف
                </Link>
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    );
  };

  const CategorySection = ({ category }: { category: string }) => {
    const categoryBooks = books.filter((book) => book.category === category);

    return (
      <div className="space-y-6">
        <Card>
          <CardContent className="p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4 font-arabic">
              {category}
            </h3>
            <p className="text-gray-600 font-arabic mb-4">
              مجموعة الكتب المختصة في {category} من المذهب الشافعي
            </p>
            <div className="text-sm text-gray-500">
              <span className="font-arabic">
                عدد الكتب: {categoryBooks.length}
              </span>
            </div>
          </CardContent>
        </Card>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categoryBooks.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      <Navigation />

      {/* Header */}
      <section className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4 font-arabic">
              كتب المذهب الشافعي
            </h1>
            <p className="text-lg text-gray-600 font-arabic max-w-2xl mx-auto">
              مكتبة شاملة لكتب المذهب الشافعي من التأسيس حتى العصر الحديث
            </p>
          </div>

          {/* Search */}
          <div className="max-w-2xl mx-auto mb-6">
            <div className="relative">
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                type="search"
                placeholder="البحث في عناوين الكتب أو أسماء المؤلفين..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pr-10 h-12 font-arabic text-right"
                dir="rtl"
              />
            </div>
          </div>

          {/* Statistics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-islamic-green-600">
                {books.length}
              </div>
              <div className="text-sm text-gray-600 font-arabic">
                إجمالي الكتب
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-islamic-green-600">
                {categories.length}
              </div>
              <div className="text-sm text-gray-600 font-arabic">التصنيفات</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-islamic-green-600">
                {books.filter((b) => b.importance === "fundamental").length}
              </div>
              <div className="text-sm text-gray-600 font-arabic">
                كتب ��ساسية
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-islamic-green-600">
                {data?.bookConnections.length || 0}
              </div>
              <div className="text-sm text-gray-600 font-arabic">الروابط</div>
            </div>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-2 font-arabic">
                التصنيف
              </h3>
              <div className="flex flex-wrap gap-2">
                <Button
                  variant={selectedCategory === null ? "default" : "outline"}
                  size="sm"
                  className="font-arabic"
                  onClick={() => setSelectedCategory(null)}
                >
                  جميع التصنيفات
                </Button>
                {categories.map((category) => (
                  <Button
                    key={category}
                    variant={
                      selectedCategory === category ? "default" : "outline"
                    }
                    size="sm"
                    className="font-arabic"
                    onClick={() => setSelectedCategory(category)}
                  >
                    {category}
                  </Button>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-2 font-arabic">
                نوع الكتاب
              </h3>
              <div className="flex flex-wrap gap-2">
                <Button
                  variant={selectedBookType === null ? "default" : "outline"}
                  size="sm"
                  className="font-arabic"
                  onClick={() => setSelectedBookType(null)}
                >
                  جميع الأنواع
                </Button>
                {bookTypes.map((type) => (
                  <Button
                    key={type}
                    variant={selectedBookType === type ? "default" : "outline"}
                    size="sm"
                    className="font-arabic"
                    onClick={() => setSelectedBookType(type)}
                  >
                    {getBookTypeLabel(type)}
                  </Button>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-2 font-arabic">
                الأهمية
              </h3>
              <div className="flex flex-wrap gap-2">
                <Button
                  variant={selectedImportance === null ? "default" : "outline"}
                  size="sm"
                  className="font-arabic"
                  onClick={() => setSelectedImportance(null)}
                >
                  جميع المستويات
                </Button>
                {importanceLevels.map((importance) => (
                  <Button
                    key={importance}
                    variant={
                      selectedImportance === importance ? "default" : "outline"
                    }
                    size="sm"
                    className="font-arabic"
                    onClick={() => setSelectedImportance(importance)}
                  >
                    {getImportanceLabel(importance)}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Tabs defaultValue="all" className="w-full">
            <TabsList className="grid w-full grid-cols-5 mb-8">
              <TabsTrigger value="all" className="font-arabic">
                جميع الكتب
              </TabsTrigger>
              <TabsTrigger value="fiqh" className="font-arabic">
                الفقه
              </TabsTrigger>
              <TabsTrigger value="usul" className="font-arabic">
                أصول الفقه
              </TabsTrigger>
              <TabsTrigger value="hadith" className="font-arabic">
                الحديث
              </TabsTrigger>
              <TabsTrigger value="connections" className="font-arabic">
                شبكة الكتب
              </TabsTrigger>
            </TabsList>

            <TabsContent value="all">
              <div className="mb-6 flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-900 font-arabic">
                  الكتب ({filteredBooks.length})
                </h2>
                <div className="text-sm text-gray-600 font-arabic">
                  مرتبة حسب الأهمية والتاريخ
                </div>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredBooks.map((book) => (
                  <BookCard key={book.id} book={book} />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="fiqh">
              <CategorySection category="الفقه" />
            </TabsContent>

            <TabsContent value="usul">
              <CategorySection category="أصول الفقه" />
            </TabsContent>

            <TabsContent value="hadith">
              <CategorySection category="الحديث" />
            </TabsContent>

            <TabsContent value="connections">
              <div className="space-y-6">
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-lg font-bold mb-4 font-arabic">
                      شبكة الكتب والروابط
                    </h3>
                    <p className="text-gray-600 font-arabic mb-4">
                      تصور تفاعلي للعلاقات بين الكتب (شرح، اختصار، نقد، تأثير)
                    </p>
                    <div className="text-center py-8">
                      <div className="text-gray-500 font-arabic">
                        شبكة الكتب التفاعلية ستكون متاحة قريباً
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </div>
  );
}
