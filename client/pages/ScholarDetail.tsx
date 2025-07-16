import { useParams, Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  User,
  MapPin,
  Calendar,
  BookOpen,
  Users,
  GraduationCap,
  Quote,
  ChevronRight,
  ExternalLink,
  Heart,
  Share2,
} from "lucide-react";
import { GREAT_IMAMS, CLASSICAL_BOOKS, MADHABS } from "@/data/library";

export default function ScholarDetail() {
  const { id } = useParams<{ id: string }>();

  // Find the scholar by ID
  const scholar = GREAT_IMAMS.find((s) => s.id === id);

  if (!scholar) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4 font-arabic">
              العالم غير موجود
            </h1>
            <Link to="/scholars">
              <Button className="font-arabic">العودة إلى العلماء</Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Find books by this scholar
  const scholarBooks = CLASSICAL_BOOKS.filter(
    (book) => book.authorId === scholar.id,
  );

  // Find the madhhab information
  const madhhab = MADHABS.find((m) => m.id === scholar.madhhab);

  // Find related scholars (teachers and students)
  const teachers = GREAT_IMAMS.filter((s) =>
    scholar.teachers.some((teacher) => s.name.includes(teacher)),
  );
  const students = GREAT_IMAMS.filter((s) =>
    scholar.students.some((student) => s.name.includes(student)),
  );

  const getMadhabLabel = (madhhab: string) => {
    switch (madhhab) {
      case "hanafi":
        return "الحنفي";
      case "maliki":
        return "المالكي";
      case "shafii":
        return "الشافعي";
      case "hanbali":
        return "الحنبلي";
      default:
        return madhhab;
    }
  };

  const getMadhabColor = (madhhab: string) => {
    switch (madhhab) {
      case "hanafi":
        return "bg-blue-100 text-blue-800";
      case "maliki":
        return "bg-green-100 text-green-800";
      case "shafii":
        return "bg-purple-100 text-purple-800";
      case "hanbali":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

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
              to="/scholars"
              className="text-gray-600 hover:text-islamic-green-600 font-arabic"
            >
              العلماء
            </Link>
            <ChevronRight className="w-4 h-4 text-gray-400" />
            <span className="text-gray-900 font-arabic">
              {scholar.arabicName}
            </span>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Scholar Header */}
            <Card className="mb-8">
              <CardContent className="p-8">
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="flex-shrink-0">
                    <div className="w-32 h-32 bg-islamic-green-100 rounded-full flex items-center justify-center">
                      <User className="w-16 h-16 text-islamic-green-600" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex flex-wrap gap-2 mb-4">
                      <Badge className={getMadhabColor(scholar.madhhab)}>
                        {getMadhabLabel(scholar.madhhab)}
                      </Badge>
                      {scholar.specializations.map((spec, index) => (
                        <Badge
                          key={index}
                          variant="secondary"
                          className="font-arabic"
                        >
                          {spec}
                        </Badge>
                      ))}
                    </div>

                    <h1 className="text-3xl font-bold text-gray-900 mb-2 font-arabic">
                      {scholar.arabicName}
                    </h1>
                    <h2 className="text-xl text-gray-600 mb-2">
                      {scholar.name}
                    </h2>
                    <p className="text-lg text-islamic-green-600 mb-4 font-arabic">
                      {scholar.title}
                    </p>

                    <div className="grid md:grid-cols-2 gap-4 mb-6">
                      <div className="flex items-center text-gray-600">
                        <Calendar className="w-4 h-4 ml-2" />
                        <span className="font-arabic">
                          {scholar.birthYear} - {scholar.deathYear}
                        </span>
                      </div>
                      <div className="flex items-center text-gray-600">
                        <MapPin className="w-4 h-4 ml-2" />
                        <span className="font-arabic">
                          {scholar.birthPlace}
                        </span>
                      </div>
                    </div>

                    <p className="text-gray-700 mb-6 font-arabic leading-relaxed">
                      {scholar.biography}
                    </p>

                    <div className="flex flex-wrap gap-3">
                      <Button className="font-arabic">
                        <BookOpen className="w-4 h-4 ml-2" />
                        عرض المؤلفات
                      </Button>
                      <Button variant="outline" size="icon">
                        <Heart className="w-4 h-4" />
                      </Button>
                      <Button variant="outline" size="icon">
                        <Share2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Scholar Content Tabs */}
            <Tabs defaultValue="biography" className="mb-8">
              <TabsList className="grid w-full grid-cols-5">
                <TabsTrigger value="biography" className="font-arabic">
                  السيرة
                </TabsTrigger>
                <TabsTrigger value="works" className="font-arabic">
                  المؤلفات
                </TabsTrigger>
                <TabsTrigger value="contributions" className="font-arabic">
                  المساهمات
                </TabsTrigger>
                <TabsTrigger value="relationships" className="font-arabic">
                  العلاقات
                </TabsTrigger>
                <TabsTrigger value="quotes" className="font-arabic">
                  الأقوال
                </TabsTrigger>
              </TabsList>

              <TabsContent value="biography" className="mt-6">
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-lg font-bold mb-4 font-arabic">
                      السيرة الكاملة
                    </h3>
                    <div className="prose prose-lg max-w-none font-arabic leading-relaxed text-right">
                      <div
                        dangerouslySetInnerHTML={{
                          __html: scholar.fullBiography.replace(
                            /\n/g,
                            "</p><p>",
                          ),
                        }}
                        className="[&>p]:mb-4"
                      />
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="works" className="mt-6">
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-lg font-bold mb-4 font-arabic">
                      المؤلفات والكتب
                    </h3>
                    {scholarBooks.length > 0 ? (
                      <div className="space-y-4 mb-6">
                        {scholarBooks.map((book) => (
                          <Link key={book.id} to={`/books/${book.id}`}>
                            <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                              <div className="flex items-start gap-4">
                                <div className="w-12 h-16 bg-islamic-green-100 rounded flex items-center justify-center flex-shrink-0">
                                  <BookOpen className="w-6 h-6 text-islamic-green-600" />
                                </div>
                                <div className="flex-1">
                                  <h4 className="font-bold font-arabic mb-1">
                                    {book.arabicTitle}
                                  </h4>
                                  <p className="text-sm text-gray-600 mb-2">
                                    {book.title}
                                  </p>
                                  <p className="text-sm text-gray-700 font-arabic mb-2">
                                    {book.description}
                                  </p>
                                  <div className="flex items-center gap-4 text-xs text-gray-500">
                                    <span>{book.pages} صفحة</span>
                                    <span>
                                      {book.views.toLocaleString()} مشاهدة
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </Link>
                        ))}
                      </div>
                    ) : null}

                    <h4 className="font-semibold mb-3 font-arabic">
                      الأعمال المشهورة
                    </h4>
                    <ul className="space-y-2">
                      {scholar.majorWorks.map((work, index) => (
                        <li key={index} className="flex items-center">
                          <BookOpen className="w-4 h-4 text-islamic-green-600 ml-2" />
                          <span className="font-arabic">{work}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="contributions" className="mt-6">
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-lg font-bold mb-4 font-arabic">
                      المساهمات والإنجازات
                    </h3>
                    <div className="space-y-4">
                      {scholar.contributions.map((contribution, index) => (
                        <div
                          key={index}
                          className="flex items-start gap-3 p-4 bg-islamic-green-50 rounded-lg"
                        >
                          <div className="w-2 h-2 bg-islamic-green-500 rounded-full mt-2 flex-shrink-0"></div>
                          <p className="font-arabic leading-relaxed">
                            {contribution}
                          </p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="relationships" className="mt-6">
                <div className="space-y-6">
                  {/* Teachers */}
                  <Card>
                    <CardContent className="p-6">
                      <h3 className="text-lg font-bold mb-4 font-arabic flex items-center">
                        <GraduationCap className="w-5 h-5 ml-2" />
                        الشيوخ والأساتذة
                      </h3>
                      {teachers.length > 0 ? (
                        <div className="grid md:grid-cols-2 gap-4">
                          {teachers.map((teacher) => (
                            <Link
                              key={teacher.id}
                              to={`/scholars/${teacher.id}`}
                            >
                              <div className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
                                <div className="w-10 h-10 bg-islamic-green-100 rounded-full flex items-center justify-center">
                                  <User className="w-5 h-5 text-islamic-green-600" />
                                </div>
                                <div>
                                  <h4 className="font-semibold font-arabic text-sm">
                                    {teacher.arabicName}
                                  </h4>
                                  <p className="text-xs text-gray-600 font-arabic">
                                    {teacher.title}
                                  </p>
                                </div>
                              </div>
                            </Link>
                          ))}
                        </div>
                      ) : (
                        <ul className="space-y-2">
                          {scholar.teachers.map((teacher, index) => (
                            <li key={index} className="flex items-center">
                              <User className="w-4 h-4 text-islamic-green-600 ml-2" />
                              <span className="font-arabic">{teacher}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </CardContent>
                  </Card>

                  {/* Students */}
                  <Card>
                    <CardContent className="p-6">
                      <h3 className="text-lg font-bold mb-4 font-arabic flex items-center">
                        <Users className="w-5 h-5 ml-2" />
                        التلاميذ والطلاب
                      </h3>
                      {students.length > 0 ? (
                        <div className="grid md:grid-cols-2 gap-4">
                          {students.map((student) => (
                            <Link
                              key={student.id}
                              to={`/scholars/${student.id}`}
                            >
                              <div className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
                                <div className="w-10 h-10 bg-islamic-green-100 rounded-full flex items-center justify-center">
                                  <User className="w-5 h-5 text-islamic-green-600" />
                                </div>
                                <div>
                                  <h4 className="font-semibold font-arabic text-sm">
                                    {student.arabicName}
                                  </h4>
                                  <p className="text-xs text-gray-600 font-arabic">
                                    {student.title}
                                  </p>
                                </div>
                              </div>
                            </Link>
                          ))}
                        </div>
                      ) : (
                        <ul className="space-y-2">
                          {scholar.students.map((student, index) => (
                            <li key={index} className="flex items-center">
                              <User className="w-4 h-4 text-islamic-green-600 ml-2" />
                              <span className="font-arabic">{student}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="quotes" className="mt-6">
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-lg font-bold mb-4 font-arabic">
                      أقوال مأثورة
                    </h3>
                    <div className="space-y-6">
                      {scholar.quotes.map((quote, index) => (
                        <div
                          key={index}
                          className="relative p-6 bg-gradient-to-r from-islamic-green-50 to-islamic-gold-50 rounded-lg border-r-4 border-islamic-green-500"
                        >
                          <Quote className="absolute top-4 right-4 w-6 h-6 text-islamic-green-300" />
                          <p className="font-arabic text-lg leading-relaxed text-right pr-8">
                            "{quote}"
                          </p>
                          <div className="mt-4 text-sm text-gray-600 font-arabic text-right">
                            — {scholar.arabicName}
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Scholar Info Summary */}
            <Card className="mb-6">
              <CardContent className="p-6">
                <h3 className="text-lg font-bold mb-4 font-arabic">
                  معلومات سريعة
                </h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600 font-arabic">
                      الاسم الكامل:
                    </span>
                    <span className="font-arabic text-right">
                      {scholar.arabicName}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 font-arabic">اللقب:</span>
                    <span className="font-arabic text-right">
                      {scholar.title}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 font-arabic">الولادة:</span>
                    <span className="font-arabic text-right">
                      {scholar.birthYear}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 font-arabic">الوفاة:</span>
                    <span className="font-arabic text-right">
                      {scholar.deathYear}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 font-arabic">
                      مكان الولادة:
                    </span>
                    <span className="font-arabic text-right">
                      {scholar.birthPlace}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 font-arabic">المذهب:</span>
                    <span className="font-arabic text-right">
                      {getMadhabLabel(scholar.madhhab)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 font-arabic">العصر:</span>
                    <span className="font-arabic text-right">
                      {scholar.period}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Madhhab Info */}
            {madhhab && (
              <Card className="mb-6">
                <CardContent className="p-6">
                  <h3 className="text-lg font-bold mb-4 font-arabic">
                    عن المذهب {madhhab.arabicName}
                  </h3>
                  <p className="text-sm text-gray-700 mb-4 font-arabic leading-relaxed">
                    {madhhab.description}
                  </p>
                  <div className="mb-4">
                    <h4 className="font-semibold mb-2 font-arabic text-sm">
                      المناطق المنتشر بها:
                    </h4>
                    <div className="flex flex-wrap gap-1">
                      {madhhab.regions.map((region, index) => (
                        <Badge
                          key={index}
                          variant="outline"
                          className="text-xs font-arabic"
                        >
                          {region}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <Link to={`/madhhab/${madhhab.id}`}>
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full font-arabic"
                    >
                      المزيد عن المذهب
                      <ExternalLink className="w-4 h-4 mr-2" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            )}

            {/* Specializations */}
            <Card className="mb-6">
              <CardContent className="p-6">
                <h3 className="text-lg font-bold mb-4 font-arabic">التخصصات</h3>
                <div className="flex flex-wrap gap-2">
                  {scholar.specializations.map((spec, index) => (
                    <Badge
                      key={index}
                      className={getMadhabColor(scholar.madhhab)}
                    >
                      {spec}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Timeline */}
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-bold mb-4 font-arabic">
                  الخط الزمني
                </h3>
                <div className="space-y-4 text-sm">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-islamic-green-500 rounded-full mt-2"></div>
                    <div>
                      <div className="font-semibold font-arabic">الولادة</div>
                      <div className="text-gray-600 font-arabic">
                        {scholar.birthYear} في {scholar.birthPlace}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-islamic-green-500 rounded-full mt-2"></div>
                    <div>
                      <div className="font-semibold font-arabic">طلب العلم</div>
                      <div className="text-gray-600 font-arabic">
                        تتلمذ على يد كبار العلماء
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-islamic-green-500 rounded-full mt-2"></div>
                    <div>
                      <div className="font-semibold font-arabic">التدريس</div>
                      <div className="text-gray-600 font-arabic">
                        أسس مدرسته الفقهية
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-gray-400 rounded-full mt-2"></div>
                    <div>
                      <div className="font-semibold font-arabic">الوفاة</div>
                      <div className="text-gray-600 font-arabic">
                        {scholar.deathYear} في {scholar.deathPlace}
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
