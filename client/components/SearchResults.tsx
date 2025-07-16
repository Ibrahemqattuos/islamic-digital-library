import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  BookOpen,
  Users,
  MessageSquare,
  Calendar,
  Star,
  ArrowRight,
  Search,
} from "lucide-react";
import { Link } from "react-router-dom";

interface SearchResult {
  id: string;
  title: string;
  type: "book" | "scholar" | "fiqh" | "event";
  excerpt: string;
  category: string;
  rating?: number;
  author?: string;
  date?: string;
  url: string;
}

const mockSearchResults: SearchResult[] = [
  {
    id: "1",
    title: "صحيح البخاري",
    type: "book",
    excerpt:
      "أصح كتاب بعد كتاب ا��له، جمع فيه الإمام البخاري أصح الأحاديث النبوية",
    category: "الحديث الشريف",
    rating: 4.9,
    author: "الإمام البخاري",
    url: "/books/1",
  },
  {
    id: "2",
    title: "الإمام أبو حنيفة النعمان",
    type: "scholar",
    excerpt: "إمام أهل الرأي ومؤسس المذهب الحنفي، من أعظم فقهاء الإسلام",
    category: "الفقه والأصول",
    author: "إمام أهل الرأي",
    url: "/scholars/1",
  },
  {
    id: "3",
    title: "حكم التعامل بالعملات الرقمية المشفرة",
    type: "fiqh",
    excerpt: "بحث في الأحكام الشرعية للتعامل بالعملات الرقمية والبيتكوين",
    category: "المعاملات المالية",
    date: "منذ يومين",
    url: "/fiqh/1",
  },
  {
    id: "4",
    title: "محاضرة: علوم القرآن في العصر الحديث",
    type: "event",
    excerpt: "محاضرة شاملة حول علوم القرآن وتطبيقاتها في العصر الحديث",
    category: "العلوم الشرعية",
    date: "2024-01-25",
    url: "/events/1",
  },
];

export default function SearchResults({ query }: { query: string }) {
  const [results] = useState<SearchResult[]>(mockSearchResults);

  const getIcon = (type: string) => {
    switch (type) {
      case "book":
        return BookOpen;
      case "scholar":
        return Users;
      case "fiqh":
        return MessageSquare;
      case "event":
        return Calendar;
      default:
        return Search;
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case "book":
        return "كتاب";
      case "scholar":
        return "عالم";
      case "fiqh":
        return "مسألة فقهية";
      case "event":
        return "فعالية";
      default:
        return "نتيجة";
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "book":
        return "bg-blue-100 text-blue-800";
      case "scholar":
        return "bg-green-100 text-green-800";
      case "fiqh":
        return "bg-purple-100 text-purple-800";
      case "event":
        return "bg-orange-100 text-orange-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  if (!query) {
    return (
      <div className="text-center py-12 text-gray-500 font-arabic">
        أدخل كلمة للبحث في المكتبة الإسلامية
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900 font-arabic">
          نتائج البحث عن "{query}"
        </h2>
        <span className="text-gray-600 font-arabic">
          {results.length} نتيجة
        </span>
      </div>

      {results.length === 0 ? (
        <div className="text-center py-12">
          <Search className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2 font-arabic">
            لا توجد نتائج
          </h3>
          <p className="text-gray-600 font-arabic">
            حاول استخدام كلمات مختلفة أو أقل تحديداً
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {results.map((result) => {
            const Icon = getIcon(result.type);
            return (
              <Card
                key={result.id}
                className="hover:shadow-lg transition-shadow cursor-pointer"
              >
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4 rtl:space-x-reverse">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-islamic-green-100 rounded-lg flex items-center justify-center">
                        <Icon className="w-6 h-6 text-islamic-green-600" />
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between mb-2">
                        <Badge
                          className={`text-xs ${getTypeColor(result.type)}`}
                        >
                          {getTypeLabel(result.type)}
                        </Badge>
                        {result.rating && (
                          <div className="flex items-center">
                            <Star className="w-4 h-4 text-yellow-400 fill-current" />
                            <span className="text-sm text-gray-600 mr-1">
                              {result.rating}
                            </span>
                          </div>
                        )}
                      </div>
                      <h3 className="text-lg font-bold text-gray-900 mb-2 font-arabic">
                        <Link
                          to={result.url}
                          className="hover:text-islamic-green-600"
                        >
                          {result.title}
                        </Link>
                      </h3>
                      <p className="text-gray-700 mb-3 font-arabic leading-relaxed">
                        {result.excerpt}
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4 rtl:space-x-reverse text-sm text-gray-500">
                          <Badge variant="outline" className="font-arabic">
                            {result.category}
                          </Badge>
                          {result.author && (
                            <span className="font-arabic">{result.author}</span>
                          )}
                          {result.date && (
                            <span className="font-arabic">{result.date}</span>
                          )}
                        </div>
                        <Button variant="ghost" size="sm" asChild>
                          <Link to={result.url} className="font-arabic">
                            عرض التفاصيل
                            <ArrowRight className="w-4 h-4 mr-2" />
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
