import Navigation from "@/components/Navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Users,
  Search,
  Filter,
  MapPin,
  Calendar,
  BookOpen,
  ArrowRight,
} from "lucide-react";

export default function Scholars() {
  const scholars = [
    {
      id: 1,
      name: "الإمام أبو حنيفة النعمان",
      title: "إمام أهل الرأي",
      specialization: ["الفقه", "الأصول"],
      birthYear: "80 هـ",
      deathYear: "150 هـ",
      location: "الكوفة، العراق",
      works: 15,
      biography:
        "أبو حنيفة النعمان بن ثابت، إمام الفقه والأصول، مؤسس المذهب الحنفي",
      period: "العصر الأموي والعباسي",
    },
    {
      id: 2,
      name: "الإمام مالك بن أنس",
      title: "إمام دار الهجرة",
      specialization: ["الحديث", "الفقه"],
      birthYear: "93 هـ",
      deathYear: "179 هـ",
      location: "المدينة المنورة",
      works: 23,
      biography:
        "مالك بن أنس الأصبحي، إمام دار الهجرة وصاحب الموطأ ومؤسس المذهب المالكي",
      period: "العصر الأموي والعباسي",
    },
    {
      id: 3,
      name: "الإمام الشافعي",
      title: "ناصر السنة",
      specialization: ["أصول الفقه", "الفقه"],
      birthYear: "150 هـ",
      deathYear: "204 هـ",
      location: "مكة المكرمة",
      works: 34,
      biography:
        "محمد بن إدريس الشافعي، واضع علم أصول الفقه ومؤسس المذهب الشافعي",
      period: "العصر العباسي",
    },
    {
      id: 4,
      name: "الإمام أحمد بن حنبل",
      title: "إمام أهل السنة",
      specialization: ["الحديث", "الفقه"],
      birthYear: "164 هـ",
      deathYear: "241 هـ",
      location: "بغداد، العراق",
      works: 45,
      biography: "أحمد بن محمد بن حنبل، إمام المحدثين ومؤسس المذهب الحنبلي",
      period: "العصر العباسي",
    },
    {
      id: 5,
      name: "الإمام البخاري",
      title: "أمير المؤمنين في الحديث",
      specialization: ["الحديث", "الرجال"],
      birthYear: "194 هـ",
      deathYear: "256 هـ",
      location: "بخارى، أوزبكستان",
      works: 67,
      biography: "محمد بن إسماعيل البخاري، صاحب الصحيح وأشهر المحدثين",
      period: "العصر العباسي",
    },
    {
      id: 6,
      name: "الإمام مسلم",
      title: "إمام المحدثين",
      specialization: ["الحديث", "الرجال"],
      birthYear: "206 هـ",
      deathYear: "261 هـ",
      location: "نيسابور، إيران",
      works: 28,
      biography: "مسلم بن الحجاج النيسابوري، صاحب صحيح مسلم وأحد أئمة الحديث",
      period: "العصر العباسي",
    },
  ];

  const specializations = [
    "جميع التخصصات",
    "الفقه",
    "الحديث",
    "التفسير",
    "العقيدة",
    "الأصول",
    "التاريخ",
    "اللغة العربية",
  ];

  const periods = [
    "جميع العصور",
    "عصر الصحابة",
    "عصر التابعين",
    "العصر الأموي",
    "العصر العباسي",
    "العصر الحديث",
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      {/* Header */}
      <section className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4 font-arabic">
              علماء الأمة الإسلامية
            </h1>
            <p className="text-lg text-gray-600 font-arabic max-w-2xl mx-auto">
              تعرف على سير وتراجم علماء الإسلام عبر التاريخ ومؤلفاتهم وإنجازاتهم
            </p>
          </div>

          {/* Search */}
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                type="search"
                placeholder="البحث عن العلماء بالاسم أو التخصص..."
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
                التخصص
              </h3>
              <div className="flex flex-wrap gap-2">
                {specializations.map((spec, index) => (
                  <Button
                    key={index}
                    variant={index === 0 ? "default" : "outline"}
                    size="sm"
                    className="font-arabic"
                  >
                    {spec}
                  </Button>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-2 font-arabic">
                العصر
              </h3>
              <div className="flex flex-wrap gap-2">
                {periods.map((period, index) => (
                  <Button
                    key={index}
                    variant={index === 0 ? "default" : "outline"}
                    size="sm"
                    className="font-arabic"
                  >
                    {period}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Scholars Grid */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-6 flex justify-between items-center">
            <h2 className="text-2xl font-bold text-gray-900 font-arabic">
              العلماء ({scholars.length})
            </h2>
            <div className="text-sm text-gray-600 font-arabic">
              مرتبة حسب الأهمية التاريخية
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {scholars.map((scholar) => (
              <Card
                key={scholar.id}
                className="hover:shadow-lg transition-all duration-300 cursor-pointer group"
              >
                <CardContent className="p-6">
                  <div className="text-center mb-6">
                    <div className="w-20 h-20 bg-islamic-green-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                      <Users className="w-10 h-10 text-islamic-green-600" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2 font-arabic">
                      {scholar.name}
                    </h3>
                    <p className="text-islamic-green-600 font-arabic text-sm mb-3">
                      {scholar.title}
                    </p>
                  </div>

                  <div className="space-y-3 mb-6">
                    <div className="flex items-center text-sm text-gray-600">
                      <Calendar className="w-4 h-4 ml-2 flex-shrink-0" />
                      <span className="font-arabic">
                        {scholar.birthYear} - {scholar.deathYear}
                      </span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <MapPin className="w-4 h-4 ml-2 flex-shrink-0" />
                      <span className="font-arabic">{scholar.location}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <BookOpen className="w-4 h-4 ml-2 flex-shrink-0" />
                      <span className="font-arabic">{scholar.works} مؤلف</span>
                    </div>
                  </div>

                  <div className="mb-4">
                    <div className="flex flex-wrap gap-1">
                      {scholar.specialization.map((spec, index) => (
                        <Badge
                          key={index}
                          variant="secondary"
                          className="text-xs font-arabic"
                        >
                          {spec}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <p className="text-sm text-gray-600 mb-4 font-arabic line-clamp-3">
                    {scholar.biography}
                  </p>

                  <Button className="w-full font-arabic" size="sm">
                    اقرأ السيرة كاملة
                    <ArrowRight className="w-4 h-4 mr-2" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Load More */}
          <div className="text-center mt-12">
            <Button variant="outline" size="lg" className="font-arabic">
              تحميل المزيد من العلماء
              <ArrowRight className="w-4 h-4 mr-2" />
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
