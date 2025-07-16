import Navigation from "@/components/Navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  BookOpen,
  Search,
  Filter,
  Star,
  ArrowRight,
  Download,
  Eye,
} from "lucide-react";

export default function Books() {
  const books = [
    {
      id: 1,
      title: "صحيح البخاري",
      author: "الإمام البخاري",
      category: "الحديث الشريف",
      rating: 4.9,
      chapters: 97,
      pages: 2847,
      downloads: 15420,
      views: 89340,
    },
    {
      id: 2,
      title: "تفسير القرآن العظيم",
      author: "ابن كثير",
      category: "التفسير",
      rating: 4.8,
      chapters: 114,
      pages: 4521,
      downloads: 12340,
      views: 67890,
    },
    {
      id: 3,
      title: "الموطأ",
      author: "الإمام مالك",
      category: "الحديث الشريف",
      rating: 4.7,
      chapters: 61,
      pages: 1890,
      downloads: 9870,
      views: 45670,
    },
    {
      id: 4,
      title: "فتح الباري شرح صحيح البخاري",
      author: "ابن حجر العسقلاني",
      category: "شروح الحديث",
      rating: 4.9,
      chapters: 150,
      pages: 6789,
      downloads: 8760,
      views: 34560,
    },
    {
      id: 5,
      title: "الأم",
      author: "الإمام الشافعي",
      category: "الفقه",
      rating: 4.6,
      chapters: 45,
      pages: 3456,
      downloads: 7890,
      views: 23450,
    },
    {
      id: 6,
      title: "المدونة",
      author: "الإمام سحنون",
      category: "الفقه المالكي",
      rating: 4.5,
      chapters: 78,
      pages: 4567,
      downloads: 5670,
      views: 18900,
    },
  ];

  const categories = [
    "جميع الفئات",
    "الحديث الشريف",
    "التفس��ر",
    "الفقه",
    "العقيدة",
    "السيرة النبوية",
    "التاريخ الإسلامي",
  ];

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
              اكتشف كنوز التراث الإسلامي من كتب الحديث والتفسير والفقه والعقيدة
            </p>
          </div>

          {/* Search and Filter */}
          <div className="flex flex-col md:flex-row gap-4 max-w-4xl mx-auto">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                type="search"
                placeholder="البحث في عناوين الكتب أو أسماء المؤلفين..."
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

      {/* Categories */}
      <section className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map((category, index) => (
              <Button
                key={index}
                variant={index === 0 ? "default" : "outline"}
                size="sm"
                className="font-arabic"
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Books Grid */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-6 flex justify-between items-center">
            <h2 className="text-2xl font-bold text-gray-900 font-arabic">
              الكتب المتاحة ({books.length})
            </h2>
            <div className="text-sm text-gray-600 font-arabic">
              مرتبة حسب الشعبية
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {books.map((book) => (
              <Card
                key={book.id}
                className="hover:shadow-lg transition-all duration-300 cursor-pointer group"
              >
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <Badge variant="secondary" className="font-arabic text-xs">
                      {book.category}
                    </Badge>
                    <div className="flex items-center">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="text-sm text-gray-600 mr-1">
                        {book.rating}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4 rtl:space-x-reverse mb-4">
                    <div className="w-16 h-20 bg-islamic-green-100 rounded-md flex items-center justify-center flex-shrink-0">
                      <BookOpen className="w-8 h-8 text-islamic-green-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg font-bold text-gray-900 mb-2 font-arabic line-clamp-2">
                        {book.title}
                      </h3>
                      <p className="text-gray-600 font-arabic text-sm mb-2">
                        {book.author}
                      </p>
                      <div className="text-xs text-gray-500 space-y-1">
                        <div className="font-arabic">
                          {book.chapters} فصل • {book.pages} صفحة
                        </div>
                      </div>
                    </div>
                  </div>

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
                    <Button className="flex-1 font-arabic text-sm" size="sm">
                      <BookOpen className="w-4 h-4 ml-1" />
                      قراءة
                    </Button>
                    <Button
                      variant="outline"
                      className="flex-1 font-arabic text-sm"
                      size="sm"
                    >
                      <Download className="w-4 h-4 ml-1" />
                      تحميل
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Load More */}
          <div className="text-center mt-12">
            <Button variant="outline" size="lg" className="font-arabic">
              تحميل المزيد من الكتب
              <ArrowRight className="w-4 h-4 mr-2" />
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
