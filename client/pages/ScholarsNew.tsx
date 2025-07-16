import Navigation from "@/components/Navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Users,
  Search,
  Filter,
  MapPin,
  Calendar,
  BookOpen,
  ArrowRight,
  Crown,
  Star,
  GraduationCap,
} from "lucide-react";
import { Link } from "react-router-dom";
import { GREAT_IMAMS, CLASSICAL_BOOKS, MADHABS } from "@/data/library";
import ScholarTree from "@/components/ScholarTree";
import { useState } from "react";

export default function ScholarsNew() {
  const [searchQuery, setSearchQuery] = useState("");

  // Group scholars by madhhab
  const scholarsByMadhhab = {
    hanafi: GREAT_IMAMS.filter((scholar) => scholar.madhhab === "hanafi"),
    maliki: GREAT_IMAMS.filter((scholar) => scholar.madhhab === "maliki"),
    shafii: GREAT_IMAMS.filter((scholar) => scholar.madhhab === "shafii"),
    hanbali: GREAT_IMAMS.filter((scholar) => scholar.madhhab === "hanbali"),
    all: GREAT_IMAMS,
  };

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

  const ScholarCard = ({ scholar, isFounder = false }: any) => {
    const scholarBooks = CLASSICAL_BOOKS.filter(
      (book) => book.authorId === scholar.id,
    );

    return (
      <Card
        className={`hover:shadow-lg transition-all duration-300 cursor-pointer group ${
          isFounder ? "ring-2 ring-islamic-gold-300 bg-islamic-gold-50" : ""
        }`}
      >
        <CardContent className="p-6">
          {isFounder && (
            <div className="flex items-center justify-center mb-4">
              <Badge className="bg-islamic-gold-500 text-islamic-gold-900 font-arabic">
                <Crown className="w-3 h-3 ml-1" />
                الإمام المؤسس
              </Badge>
            </div>
          )}

          <div className="text-center mb-6">
            <div
              className={`w-20 h-20 ${
                isFounder ? "bg-islamic-gold-100" : "bg-islamic-green-100"
              } rounded-full mx-auto mb-4 flex items-center justify-center`}
            >
              <Users
                className={`w-10 h-10 ${
                  isFounder ? "text-islamic-gold-600" : "text-islamic-green-600"
                }`}
              />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2 font-arabic">
              {scholar.arabicName}
            </h3>
            <p
              className={`${
                isFounder ? "text-islamic-gold-600" : "text-islamic-green-600"
              } font-arabic text-sm mb-3`}
            >
              {scholar.title}
            </p>
          </div>

          <div className="space-y-3 mb-6">
            <div className="flex items-center justify-center text-sm text-gray-600">
              <Calendar className="w-4 h-4 ml-2 flex-shrink-0" />
              <span className="font-arabic">
                {scholar.birthYear} - {scholar.deathYear}
              </span>
            </div>
            <div className="flex items-center justify-center text-sm text-gray-600">
              <MapPin className="w-4 h-4 ml-2 flex-shrink-0" />
              <span className="font-arabic">{scholar.birthPlace}</span>
            </div>
            <div className="flex items-center justify-center text-sm text-gray-600">
              <BookOpen className="w-4 h-4 ml-2 flex-shrink-0" />
              <span className="font-arabic">
                {scholarBooks.length} مؤلف متاح
              </span>
            </div>
          </div>

          <div className="mb-4">
            <div className="flex flex-wrap gap-1 justify-center">
              {scholar.specializations.slice(0, 3).map((spec, index) => (
                <Badge
                  key={index}
                  variant="secondary"
                  className="text-xs font-arabic"
                >
                  {spec}
                </Badge>
              ))}
              {scholar.specializations.length > 3 && (
                <Badge variant="secondary" className="text-xs font-arabic">
                  +{scholar.specializations.length - 3}
                </Badge>
              )}
            </div>
          </div>

          <p className="text-sm text-gray-600 mb-4 font-arabic line-clamp-3 text-center leading-relaxed">
            {scholar.biography}
          </p>

          <div className="flex gap-2">
            <Button
              className="flex-1 font-arabic text-sm"
              size="sm"
              asChild
              variant={isFounder ? "default" : "default"}
            >
              <Link to={`/scholars/${scholar.id}`}>
                <Users className="w-4 h-4 ml-1" />
                السيرة الكاملة
              </Link>
            </Button>
            {scholarBooks.length > 0 && (
              <Button
                variant="outline"
                className="flex-1 font-arabic text-sm"
                size="sm"
                asChild
              >
                <Link to={`/books?author=${scholar.id}`}>
                  <BookOpen className="w-4 h-4 ml-1" />
                  المؤلفات
                </Link>
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    );
  };

  const MadhabScholarsSection = ({
    madhhab,
    scholars,
  }: {
    madhhab: any;
    scholars: any[];
  }) => {
    const founder = scholars.find((s) => s.id === madhhab.founderId);
    const otherScholars = scholars.filter((s) => s.id !== madhhab.founderId);

    return (
      <div className="space-y-8">
        {/* Madhhab Header */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-start gap-6">
              <div className="w-16 h-16 bg-islamic-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                <GraduationCap className="w-8 h-8 text-islamic-green-600" />
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-gray-900 mb-2 font-arabic">
                  علماء المذهب {madhhab.arabicName}
                </h2>
                <p className="text-gray-600 mb-4 font-arabic leading-relaxed">
                  {madhhab.description}
                </p>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold mb-2 font-arabic">
                      علماء المذهب البارزون:
                    </h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      {madhhab.keyScholars.slice(0, 3).map((scholar, index) => (
                        <li key={index} className="font-arabic">
                          • {scholar}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2 font-arabic">
                      الكتب الأساسية:
                    </h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      {madhhab.majorWorks.slice(0, 3).map((work, index) => (
                        <li key={index} className="font-arabic">
                          • {work}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Founder Section */}
        {founder && (
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-6 font-arabic flex items-center">
              <Crown className="w-5 h-5 ml-2 text-islamic-gold-500" />
              الإمام المؤسس
            </h3>
            <div className="grid lg:grid-cols-1 max-w-md mx-auto">
              <ScholarCard scholar={founder} isFounder={true} />
            </div>
          </div>
        )}

        {/* Other Scholars */}
        {otherScholars.length > 0 && (
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-6 font-arabic">
              علماء آخرون من المذهب ({otherScholars.length})
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {otherScholars.map((scholar) => (
                <ScholarCard key={scholar.id} scholar={scholar} />
              ))}
            </div>
          </div>
        )}

        {/* Timeline */}
        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-bold mb-4 font-arabic">
              تطور المذهب عبر التاريخ
            </h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-islamic-green-500 rounded-full mt-2"></div>
                <div>
                  <div className="font-semibold font-arabic">تأسيس المذهب</div>
                  <div className="text-gray-600 font-arabic text-sm">
                    على يد {madhhab.founder}
                  </div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-islamic-green-500 rounded-full mt-2"></div>
                <div>
                  <div className="font-semibold font-arabic">نشر المذهب</div>
                  <div className="text-gray-600 font-arabic text-sm">
                    من خلال التلاميذ والأتباع
                  </div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-islamic-green-500 rounded-full mt-2"></div>
                <div>
                  <div className="font-semibold font-arabic">التطوير</div>
                  <div className="text-gray-600 font-arabic text-sm">
                    تطوير المذهب وإثراؤه بالعلماء اللاحقين
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
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
              علماء الأمة الإسلامية
            </h1>
            <p className="text-lg text-gray-600 font-arabic max-w-2xl mx-auto">
              تعرف على الأئمة الأربعة وعلماء المذاهب الفقهية عبر التاريخ
            </p>
          </div>

          {/* Search */}
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                type="search"
                placeholder="البحث عن العلماء بالاسم أو التخصص..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-12 font-arabic text-right"
                dir="rtl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Specializations Filter */}
      <section className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-wrap gap-2 justify-center">
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
      </section>

      {/* Four Great Imams Showcase */}
      <section className="bg-gradient-to-r from-islamic-green-50 to-islamic-gold-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4 font-arabic">
              الأئمة الأربعة المجتهدون
            </h2>
            <p className="text-lg text-gray-600 font-arabic">
              مؤسسو المذاهب الفقهية الأربعة الذين أثروا في الفقه الإسلامي
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {GREAT_IMAMS.map((imam) => (
              <ScholarCard key={imam.id} scholar={imam} isFounder={true} />
            ))}
          </div>
        </div>
      </section>

      {/* Main Content - Scholars by Madhhab */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid w-full grid-cols-6 mb-8">
              <TabsTrigger value="overview" className="font-arabic">
                نظرة عامة
              </TabsTrigger>
              <TabsTrigger value="tree" className="font-arabic">
                شجرة العلماء
              </TabsTrigger>
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
            </TabsList>

            <TabsContent value="overview">
              <div className="space-y-8">
                {/* Overview Cards */}
                <div className="grid md:grid-cols-4 gap-6 mb-8">
                  {MADHABS.map((madhhab) => {
                    const founder = GREAT_IMAMS.find(
                      (s) => s.id === madhhab.founderId,
                    );
                    const scholarCount = scholarsByMadhhab[madhhab.id]?.length;

                    return (
                      <Card
                        key={madhhab.id}
                        className="hover:shadow-lg transition-shadow cursor-pointer"
                      >
                        <CardContent className="p-6 text-center">
                          <div className="w-16 h-16 bg-islamic-green-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                            <GraduationCap className="w-8 h-8 text-islamic-green-600" />
                          </div>
                          <h3 className="text-lg font-bold text-gray-900 mb-2 font-arabic">
                            المذهب {madhhab.arabicName}
                          </h3>
                          {founder && (
                            <p className="text-sm text-gray-600 mb-3 font-arabic">
                              المؤسس: {founder.arabicName}
                            </p>
                          )}
                          <div className="text-xs text-gray-500 mb-4">
                            <div className="font-arabic">
                              {scholarCount} عالم متاح
                            </div>
                            <div className="font-arabic">
                              {madhhab.regions.length} منطقة
                            </div>
                          </div>
                          <Button
                            variant="outline"
                            size="sm"
                            className="w-full font-arabic"
                          >
                            عرض العلماء
                          </Button>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>

                {/* Scholar Statistics */}
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-lg font-bold mb-4 font-arabic">
                      إحصائيات العلماء
                    </h3>
                    <div className="grid md:grid-cols-4 gap-6 text-center">
                      <div>
                        <div className="text-2xl font-bold text-islamic-green-600">
                          {GREAT_IMAMS.length}
                        </div>
                        <div className="text-sm text-gray-600 font-arabic">
                          إجمالي العلماء
                        </div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-islamic-green-600">
                          4
                        </div>
                        <div className="text-sm text-gray-600 font-arabic">
                          الأئمة الأربعة
                        </div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-islamic-green-600">
                          {CLASSICAL_BOOKS.length}
                        </div>
                        <div className="text-sm text-gray-600 font-arabic">
                          الكتب المؤلفة
                        </div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-islamic-green-600">
                          4
                        </div>
                        <div className="text-sm text-gray-600 font-arabic">
                          المذاهب الفقهية
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="hanafi">
              <MadhabScholarsSection
                madhhab={MADHABS.find((m) => m.id === "hanafi")}
                scholars={scholarsByMadhhab.hanafi}
              />
            </TabsContent>

            <TabsContent value="maliki">
              <MadhabScholarsSection
                madhhab={MADHABS.find((m) => m.id === "maliki")}
                scholars={scholarsByMadhhab.maliki}
              />
            </TabsContent>

            <TabsContent value="shafii">
              <MadhabScholarsSection
                madhhab={MADHABS.find((m) => m.id === "shafii")}
                scholars={scholarsByMadhhab.shafii}
              />
            </TabsContent>

            <TabsContent value="hanbali">
              <MadhabScholarsSection
                madhhab={MADHABS.find((m) => m.id === "hanbali")}
                scholars={scholarsByMadhhab.hanbali}
              />
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </div>
  );
}
