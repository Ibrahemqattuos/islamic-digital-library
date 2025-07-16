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
  Users,
} from "lucide-react";
import { Link } from "react-router-dom";
import { CLASSICAL_BOOKS, GREAT_IMAMS, MADHABS } from "@/data/library";
import { useState } from "react";

export default function BooksNew() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  // Group books by madhhab
  const booksByMadhhab = {
    hanafi: CLASSICAL_BOOKS.filter((book) => book.madhhab === "hanafi"),
    maliki: CLASSICAL_BOOKS.filter((book) => book.madhhab === "maliki"),
    shafii: CLASSICAL_BOOKS.filter((book) => book.madhhab === "shafii"),
    hanbali: CLASSICAL_BOOKS.filter((book) => book.madhhab === "hanbali"),
    general: CLASSICAL_BOOKS.filter((book) => book.madhhab === "general"),
    comparative: CLASSICAL_BOOKS.filter(
      (book) => book.madhhab === "comparative",
    ),
  };

  const categories = [
    "جميع الفئات",
    "الفقه",
    "الحديث",
    "التفسير",
    "العقيدة",
    "أصول الفقه",
    "السيرة النبوية",
  ];

  const BookCard = ({ book }: { book: any }) => {
    const author = GREAT_IMAMS.find((s) => s.id === book.authorId);

    return (
      <Card className="hover:shadow-lg transition-all duration-300 cursor-pointer group">
        <CardContent className="p-6">
          <div className="flex items-start justify-between mb-4">
            <Badge variant="secondary" className="font-arabic text-xs">
              {book.subcategory}
            </Badge>
            <div className="flex items-center">
              <Star className="w-4 h-4 text-yellow-400 fill-current" />
              <span className="text-sm text-gray-600 mr-1">{book.rating}</span>
            </div>
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
                {book.author}
              </p>
              <div className="text-xs text-gray-500 space-y-1">
                <div className="font-arabic">{book.pages} صفحة</div>
                <div className="font-arabic">
                  {book.publishInfo.originalDate}
                </div>
              </div>
            </div>
          </div>

          <p className="text-sm text-gray-700 mb-4 font-arabic line-clamp-2 leading-relaxed">
            {book.description}
          </p>

          <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
            <div className="flex items-center">
              <Eye className="w-4 h-4 ml-1" />
              <span>{book.views.toLocaleString()}</span>
            </div>
            <div className="flex items-center">
              <Download className="w-4 h-4 ml-1" />
              <span>{book.downloads.toLocaleString()}</span>
            </div>
          </div>

          <div className="flex gap-2">
            <Button className="flex-1 font-arabic text-sm" size="sm" asChild>
              <Link to={`/books/${book.id}`}>
                <BookOpen className="w-4 h-4 ml-1" />
                قراءة
              </Link>
            </Button>
            {author && (
              <Button
                variant="outline"
                className="flex-1 font-arabic text-sm"
                size="sm"
                asChild
              >
                <Link to={`/scholars/${author.id}`}>
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

  const MadhabSection = ({
    madhhab,
    books,
  }: {
    madhhab: any;
    books: any[];
  }) => {
    const founder = GREAT_IMAMS.find((s) => s.id === madhhab.founderId);

    return (
      <div className="space-y-6">
        {/* Madhhab Header */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-start gap-6">
              <div className="w-16 h-16 bg-islamic-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                <Users className="w-8 h-8 text-islamic-green-600" />
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-gray-900 mb-2 font-arabic">
                  المذهب {madhhab.arabicName}
                </h2>
                <p className="text-gray-600 mb-4 font-arabic leading-relaxed">
                  {madhhab.description}
                </p>
                <div className="grid md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <h4 className="font-semibold mb-2 font-arabic">المؤسس:</h4>
                    {founder ? (
                      <Link
                        to={`/scholars/${founder.id}`}
                        className="text-islamic-green-600 hover:text-islamic-green-700 font-arabic"
                      >
                        {founder.arabicName}
                      </Link>
                    ) : (
                      <span className="font-arabic">{madhhab.founder}</span>
                    )}
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2 font-arabic">
                      المناطق المنتشر بها:
                    </h4>
                    <div className="flex flex-wrap gap-1">
                      {madhhab.regions.slice(0, 3).map((region, index) => (
                        <Badge
                          key={index}
                          variant="outline"
                          className="text-xs font-arabic"
                        >
                          {region}
                        </Badge>
                      ))}
                      {madhhab.regions.length > 3 && (
                        <Badge
                          variant="outline"
                          className="text-xs font-arabic"
                        >
                          +{madhhab.regions.length - 3}
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold mb-2 font-arabic">
                    الخصائص المميزة:
                  </h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    {madhhab.characteristics.map((char, index) => (
                      <li key={index} className="font-arabic">
                        • {char}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Books Grid */}
        <div>
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-bold text-gray-900 font-arabic">
              كتب المذهب ({books.length})
            </h3>
          </div>
          {books.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {books.map((book) => (
                <BookCard key={book.id} book={book} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 text-gray-500">
              <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="font-arabic">لا توجد كتب متاحة حالياً</p>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      {/* Header */}
      <section className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4 font-arabic">
              مكتبة الكتب الإسلامية
            </h1>
            <p className="text-lg text-gray-600 font-arabic max-w-2xl mx-auto">
              مكتبة شاملة مصنفة حسب المذاهب الفقهية الأربعة والكتب العامة
            </p>
          </div>

          {/* Search and Filter */}
          <div className="flex flex-col md:flex-row gap-4 max-w-4xl mx-auto">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                type="search"
                placeholder="البحث في عناوين الكتب أو أسماء المؤلفين..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-12 font-arabic text-right"
                dir="rtl"
              />
            </div>
            <Button
              variant="outline"
              className="h-12 px-6 font-arabic"
              size="lg"
            >
              <Filter className="w-5 h-5 ml-2" />
              تصفية النتائج
            </Button>
          </div>
        </div>
      </section>

      {/* Categories Filter */}
      <section className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map((category, index) => (
              <Button
                key={index}
                variant={
                  (index === 0 && selectedCategory === "all") ||
                  category === selectedCategory
                    ? "default"
                    : "outline"
                }
                size="sm"
                className="font-arabic"
                onClick={() =>
                  setSelectedCategory(index === 0 ? "all" : category)
                }
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Tabs defaultValue="hanafi" className="w-full">
            <TabsList className="grid w-full grid-cols-6 mb-8">
              <TabsTrigger value="hanafi" className="font-arabic">
                الحنفي
              </TabsTrigger>
              <TabsTrigger value="maliki" className="font-arabic">
                المالكي
              </TabsTrigger>
              <TabsTrigger value="shafii" className="font-arabic">
                الشافعي
              </TabsTrigger>
              <TabsTrigger value="hanbali" className="font-arabic">
                الحنبلي
              </TabsTrigger>
              <TabsTrigger value="general" className="font-arabic">
                عام
              </TabsTrigger>
              <TabsTrigger value="comparative" className="font-arabic">
                مقارن
              </TabsTrigger>
            </TabsList>

            <TabsContent value="hanafi">
              <MadhabSection
                madhhab={MADHABS.find((m) => m.id === "hanafi")}
                books={booksByMadhhab.hanafi}
              />
            </TabsContent>

            <TabsContent value="maliki">
              <MadhabSection
                madhhab={MADHABS.find((m) => m.id === "maliki")}
                books={booksByMadhhab.maliki}
              />
            </TabsContent>

            <TabsContent value="shafii">
              <MadhabSection
                madhhab={MADHABS.find((m) => m.id === "shafii")}
                books={booksByMadhhab.shafii}
              />
            </TabsContent>

            <TabsContent value="hanbali">
              <MadhabSection
                madhhab={MADHABS.find((m) => m.id === "hanbali")}
                books={booksByMadhhab.hanbali}
              />
            </TabsContent>

            <TabsContent value="general">
              <div className="space-y-6">
                <Card>
                  <CardContent className="p-6">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4 font-arabic">
                      الكتب العامة
                    </h2>
                    <p className="text-gray-600 mb-4 font-arabic leading-relaxed">
                      كتب غير مقيدة بمذهب معين، تشمل كتب الحديث وأصول الفقه
                      والعلوم الشرعية العامة
                    </p>
                  </CardContent>
                </Card>
                <div>
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-xl font-bold text-gray-900 font-arabic">
                      الكتب ({booksByMadhhab.general.length})
                    </h3>
                  </div>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {booksByMadhhab.general.map((book) => (
                      <BookCard key={book.id} book={book} />
                    ))}
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="comparative">
              <div className="space-y-6">
                <Card>
                  <CardContent className="p-6">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4 font-arabic">
                      الفقه المقارن
                    </h2>
                    <p className="text-gray-600 mb-4 font-arabic leading-relaxed">
                      كتب تقارن بين المذاهب الفقهية المختلفة وتعرض الآراء
                      المتنوعة في المسائل الفقهية
                    </p>
                  </CardContent>
                </Card>
                <div>
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-xl font-bold text-gray-900 font-arabic">
                      الكتب ({booksByMadhhab.comparative.length})
                    </h3>
                  </div>
                  {booksByMadhhab.comparative.length > 0 ? (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {booksByMadhhab.comparative.map((book) => (
                        <BookCard key={book.id} book={book} />
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12 text-gray-500">
                      <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                      <p className="font-arabic">
                        كتب الفقه المقارن ستكون متاحة قريباً
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </div>
  );
}
