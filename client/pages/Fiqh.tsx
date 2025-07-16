import Navigation from "@/components/Navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  MessageSquare,
  Search,
  Filter,
  Clock,
  User,
  ArrowRight,
  ThumbsUp,
  Eye,
  Tag,
} from "lucide-react";

export default function Fiqh() {
  const fiqhIssues = [
    {
      id: 1,
      title: "حكم التعامل بالعملات الرقمية المشفرة",
      category: "المعاملات المالية",
      scholar: "الشيخ محمد العثيمين",
      excerpt:
        "السؤال حول حكم التعامل بالبيتكوين والعملات الرقمية في الشريعة الإسلامية وما يتعلق بها من أحكام الصرف والمضاربة...",
      tags: ["عملات رقمية", "معاملات مالية", "صرف"],
      publishDate: "منذ يومين",
      views: 2340,
      likes: 156,
      difficulty: "متوسط",
      status: "محدث",
    },
    {
      id: 2,
      title: "أحكام الصلاة في الطائرة والسفر الجوي",
      category: "العبادات",
      scholar: "الشيخ ابن باز",
      excerpt:
        "ما حكم الصلاة في الطائرة أثناء السفر؟ وكيف يحدد المسافر القبلة؟ وما حكم الجمع والقصر في هذه الحالة...",
      tags: ["صلاة", "سفر", "طائرة", "قبلة"],
      publishDate: "منذ 3 أيام",
      views: 1890,
      likes: 98,
      difficulty: "سهل",
      status: "معتمد",
    },
    {
      id: 3,
      title: "زكاة الأسهم والاستثمارات المالية الحديثة",
      category: "الزكاة",
      scholar: "الشيخ صالح الفوزان",
      excerpt:
        "كيف تحسب زكاة الأسهم في الشركات المساهمة؟ وما الفرق بين أسهم التجارة وأسهم الاستثمار في أحكام الزكاة...",
      tags: ["زكاة", "أسهم", "استثمار", "تجارة"],
      publishDate: "منذ أسبوع",
      views: 3456,
      likes: 234,
      difficulty: "صعب",
      status: "معتمد",
    },
    {
      id: 4,
      title: "حكم استخدام التطبيقات الذكية في تحديد أوقات الصلاة",
      category: "العبادات",
      scholar: "الشيخ عبدالله المطلق",
      excerpt:
        "ما مدى دقة تطبيقات الهواتف الذكية في تحديد أوقات الصلاة؟ وهل يجوز الاعتماد عليها بدلاً من الطرق التقليدية...",
      tags: ["تطبيقات", "أوقات الصلاة", "تقنية"],
      publishDate: "منذ أسبوعين",
      views: 1567,
      likes: 89,
      difficulty: "سهل",
      status: "معتمد",
    },
    {
      id: 5,
      title: "أحكام التجارة الإلكترونية والبيع عبر الإنترنت",
      category: "المعاملات المالية",
      scholar: "الشيخ محمد المنجد",
      excerpt:
        "ما حكم البيع والشراء عبر المواقع الإلكترونية؟ وما الضوابط الشرعية للتجارة الإلكترونية وحماية حقوق المتعاملين...",
      tags: ["تجارة إلكترونية", "بيع", "إنترنت"],
      publishDate: "منذ شهر",
      views: 4567,
      likes: 312,
      difficulty: "متوسط",
      status: "معتمد",
    },
    {
      id: 6,
      title: "حكم الصوم للمرضى المصابين بالأمراض المزمنة",
      category: "الصيام",
      scholar: "الشيخ عبدالعزيز آل الشيخ",
      excerpt:
        "ما حكم الصوم لمن يعاني من مرض السكري وارتفاع ضغط الدم؟ وما البدائل الشرعية عن الصوم للمرضى...",
      tags: ["صيام", "مرض", "رخصة", "فدية"],
      publishDate: "منذ شهرين",
      views: 2890,
      likes: 178,
      difficulty: "متوسط",
      status: "معتمد",
    },
  ];

  const categories = [
    "جميع الفئات",
    "العبادات",
    "المعاملات المالية",
    "الزكاة",
    "الصيام",
    "الحج والعمرة",
    "الأحوال الشخصية",
    "المسائل المعاصرة",
  ];

  const difficultyLevels = ["جميع المستويات", "سهل", "متوسط", "صعب"];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "سهل":
        return "bg-green-100 text-green-800";
      case "متوسط":
        return "bg-yellow-100 text-yellow-800";
      case "صعب":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "معتمد":
        return "bg-blue-100 text-blue-800";
      case "محدث":
        return "bg-green-100 text-green-800";
      case "قيد المراجعة":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      {/* Header */}
      <section className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4 font-arabic">
              المسائل الفقهية المعاصرة
            </h1>
            <p className="text-lg text-gray-600 font-arabic max-w-2xl mx-auto">
              أحكام شرعية للقضايا المعاصرة وإجابات العلماء على المس��ئل الفقهية
              الحديثة
            </p>
          </div>

          {/* Search */}
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                type="search"
                placeholder="البحث في المسائل الفقهية..."
                className="pl-10 h-12 font-arabic text-right"
                dir="rtl"
              />
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
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-2 font-arabic">
                مستوى الصعوبة
              </h3>
              <div className="flex flex-wrap gap-2">
                {difficultyLevels.map((level, index) => (
                  <Button
                    key={index}
                    variant={index === 0 ? "default" : "outline"}
                    size="sm"
                    className="font-arabic"
                  >
                    {level}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Issues List */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-6 flex justify-between items-center">
            <h2 className="text-2xl font-bold text-gray-900 font-arabic">
              المسائل الفقهية ({fiqhIssues.length})
            </h2>
            <div className="text-sm text-gray-600 font-arabic">
              مرتبة حسب التاريخ
            </div>
          </div>

          <div className="space-y-6">
            {fiqhIssues.map((issue) => (
              <Card
                key={issue.id}
                className="hover:shadow-lg transition-all duration-300 cursor-pointer"
              >
                <CardContent className="p-6">
                  <div className="flex flex-col lg:flex-row lg:items-start lg:space-x-6 rtl:lg:space-x-reverse">
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center space-x-2 rtl:space-x-reverse">
                          <Badge
                            variant="secondary"
                            className="font-arabic text-xs"
                          >
                            {issue.category}
                          </Badge>
                          <Badge
                            className={`text-xs ${getDifficultyColor(
                              issue.difficulty,
                            )}`}
                          >
                            {issue.difficulty}
                          </Badge>
                          <Badge
                            className={`text-xs ${getStatusColor(
                              issue.status,
                            )}`}
                          >
                            {issue.status}
                          </Badge>
                        </div>
                      </div>

                      <h3 className="text-xl font-bold text-gray-900 mb-3 font-arabic leading-relaxed">
                        {issue.title}
                      </h3>

                      <div className="flex items-center space-x-4 rtl:space-x-reverse text-sm text-gray-600 mb-4">
                        <div className="flex items-center">
                          <User className="w-4 h-4 ml-1" />
                          <span className="font-arabic">{issue.scholar}</span>
                        </div>
                        <div className="flex items-center">
                          <Clock className="w-4 h-4 ml-1" />
                          <span className="font-arabic">
                            {issue.publishDate}
                          </span>
                        </div>
                      </div>

                      <p className="text-gray-700 mb-4 font-arabic leading-relaxed">
                        {issue.excerpt}
                      </p>

                      <div className="flex flex-wrap gap-2 mb-4">
                        {issue.tags.map((tag, index) => (
                          <span
                            key={index}
                            className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-islamic-green-100 text-islamic-green-700"
                          >
                            <Tag className="w-3 h-3 ml-1" />
                            <span className="font-arabic">{tag}</span>
                          </span>
                        ))}
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4 rtl:space-x-reverse text-sm text-gray-500">
                          <div className="flex items-center">
                            <Eye className="w-4 h-4 ml-1" />
                            <span>{issue.views.toLocaleString()}</span>
                          </div>
                          <div className="flex items-center">
                            <ThumbsUp className="w-4 h-4 ml-1" />
                            <span>{issue.likes.toLocaleString()}</span>
                          </div>
                        </div>

                        <Button variant="ghost" className="font-arabic">
                          اقرأ المزيد
                          <ArrowRight className="w-4 h-4 mr-2" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Load More */}
          <div className="text-center mt-12">
            <Button variant="outline" size="lg" className="font-arabic">
              تحميل المزيد من المسائل
              <ArrowRight className="w-4 h-4 mr-2" />
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
