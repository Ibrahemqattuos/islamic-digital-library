import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
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
  Star,
  Crown,
} from "lucide-react";
import {
  ShafiDataLoader,
  type ShafiScholar,
  type ShafiBook,
  type ShafiDataset,
} from "@/data/shafii-data";

export default function ShafiScholarDetail() {
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

  // Find the scholar by ID
  const scholar = dataLoader.getScholarById(id || "");

  if (!scholar) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4 font-arabic">
              العالم غير موجود
            </h1>
            <Link to="/shafi-scholars">
              <Button className="font-arabic">العودة إلى علماء الشافعية</Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Find related data
  const scholarBooks = dataLoader.getBooksByAuthor(scholar.id);
  const teachers = dataLoader.getTeachersOfScholar(scholar.id);
  const students = dataLoader.getStudentsOfScholar(scholar.id);

  const isFounder = scholar.id === "imam-shafii";

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
              to="/shafi-scholars"
              className="text-gray-600 hover:text-islamic-green-600 font-arabic"
            >
              علماء ال��افعية
            </Link>
            <ChevronLeft className="w-4 h-4 text-gray-400" />
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
            <Card
              className={`mb-8 ${
                isFounder
                  ? "ring-2 ring-islamic-gold-300 bg-islamic-gold-50"
                  : ""
              }`}
            >
              <CardContent className="p-8">
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="flex-shrink-0">
                    <div
                      className={`w-32 h-32 ${
                        isFounder
                          ? "bg-islamic-gold-100"
                          : "bg-islamic-green-100"
                      } rounded-full flex items-center justify-center relative`}
                    >
                      <User
                        className={`w-16 h-16 ${
                          isFounder
                            ? "text-islamic-gold-600"
                            : "text-islamic-green-600"
                        }`}
                      />
                      {isFounder && (
                        <Crown className="w-6 h-6 text-islamic-gold-500 absolute -top-2 -right-2" />
                      )}
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex flex-wrap gap-2 mb-4">
                      {isFounder && (
                        <Badge className="bg-islamic-gold-500 text-islamic-gold-900 font-arabic">
                          <Crown className="w-3 h-3 ml-1" />
                          الإمام المؤسس
                        </Badge>
                      )}
                      <Badge variant="secondary" className="font-arabic">
                        الطبقة {scholar.generation}
                      </Badge>
                      {scholar.verified && (
                        <Badge variant="outline" className="font-arabic">
                          <Star className="w-3 h-3 ml-1" />
                          محقق
                        </Badge>
                      )}
                    </div>

                    <h1 className="text-3xl font-bold text-gray-900 mb-2 font-arabic">
                      {scholar.arabicName}
                    </h1>
                    <h2 className="text-xl text-gray-600 mb-2">
                      {scholar.name}
                    </h2>
                    <p className="text-lg text-islamic-green-600 mb-2 font-arabic">
                      {scholar.title}
                    </p>
                    <p className="text-sm text-gray-600 mb-4 font-arabic">
                      {scholar.kunya} • {scholar.nisba}
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
                        عرض المؤلفات ({scholarBooks.length})
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
                <TabsTrigger value="timeline" className="font-arabic">
                  السيرة الزمنية
                </TabsTrigger>
              </TabsList>

              <TabsContent value="biography" className="mt-6">
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-lg font-bold mb-4 font-arabic">
                      السيرة الكاملة
                    </h3>
                    <div className="prose prose-lg max-w-none font-arabic leading-relaxed text-right">
                      <p className="mb-4">{scholar.fullBiography}</p>
                      {scholar.notes && (
                        <div className="mt-6 p-4 bg-islamic-green-50 rounded-lg">
                          <h4 className="font-semibold mb-2">ملاحظات:</h4>
                          <p>{scholar.notes}</p>
                        </div>
                      )}
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

                    {/* Available Books */}
                    {scholarBooks.length > 0 && (
                      <div className="mb-8">
                        <h4 className="font-semibold mb-4 font-arabic">
                          الكتب المتوفرة في قاعدة البيانات
                        </h4>
                        <div className="space-y-4">
                          {scholarBooks.map((book) => (
                            <Link key={book.id} to={`/shafi-books/${book.id}`}>
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
                                      <span className="font-arabic">
                                        {book.category}
                                      </span>
                                      {book.pages && (
                                        <span>{book.pages} صفحة</span>
                                      )}
                                      <span className="font-arabic">
                                        {book.publishInfo.originalDate}
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* All Works Listed */}
                    <div>
                      <h4 className="font-semibold mb-3 font-arabic">
                        جميع الأعمال المعروفة
                      </h4>
                      <ul className="space-y-2">
                        {scholar.works.map((work, index) => (
                          <li key={index} className="flex items-center">
                            <BookOpen className="w-4 h-4 text-islamic-green-600 ml-2" />
                            <span className="font-arabic">{work}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
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

                    {/* Specializations */}
                    <div className="mt-8">
                      <h4 className="font-semibold mb-3 font-arabic">
                        التخصصات العلمية
                      </h4>
                      <div className="flex flex-wrap gap-2">
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
                              to={`/shafi-scholars/${teacher.id}`}
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
                          {scholar.teacherIds.map((teacherId, index) => (
                            <li key={index} className="flex items-center">
                              <User className="w-4 h-4 text-islamic-green-600 ml-2" />
                              <span className="font-arabic">{teacherId}</span>
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
                              to={`/shafi-scholars/${student.id}`}
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
                          {scholar.studentIds.map((studentId, index) => (
                            <li key={index} className="flex items-center">
                              <User className="w-4 h-4 text-islamic-green-600 ml-2" />
                              <span className="font-arabic">{studentId}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="timeline" className="mt-6">
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-lg font-bold mb-4 font-arabic">
                      السيرة الزمنية
                    </h3>
                    <div className="space-y-6">
                      <div className="flex items-start gap-3">
                        <div className="w-3 h-3 bg-islamic-green-500 rounded-full mt-1"></div>
                        <div>
                          <div className="font-semibold font-arabic">
                            الولادة
                          </div>
                          <div className="text-gray-600 font-arabic text-sm">
                            {scholar.birthYear} في {scholar.birthPlace}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <div className="w-3 h-3 bg-islamic-green-500 rounded-full mt-1"></div>
                        <div>
                          <div className="font-semibold font-arabic">
                            طلب العلم والتكوين
                          </div>
                          <div className="text-gray-600 font-arabic text-sm">
                            تتلمذ على يد {teachers.length} من العلماء
                          </div>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <div className="w-3 h-3 bg-islamic-green-500 rounded-full mt-1"></div>
                        <div>
                          <div className="font-semibold font-arabic">
                            التأليف والتدريس
                          </div>
                          <div className="text-gray-600 font-arabic text-sm">
                            ألف {scholar.works.length} كتاباً ودرّس{" "}
                            {students.length} من التلاميذ
                          </div>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <div className="w-3 h-3 bg-gray-400 rounded-full mt-1"></div>
                        <div>
                          <div className="font-semibold font-arabic">
                            الوفاة
                          </div>
                          <div className="text-gray-600 font-arabic text-sm">
                            {scholar.deathYear} في {scholar.deathPlace}
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Quick Info */}
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
                    <span className="font-arabic text-right max-w-[60%]">
                      {scholar.fullName}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 font-arabic">الكنية:</span>
                    <span className="font-arabic">{scholar.kunya}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 font-arabic">النسبة:</span>
                    <span className="font-arabic">{scholar.nisba}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 font-arabic">الطبقة:</span>
                    <span className="font-arabic">{scholar.generation}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 font-arabic">القرن:</span>
                    <span className="font-arabic">{scholar.century}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Statistics */}
            <Card className="mb-6">
              <CardContent className="p-6">
                <h3 className="text-lg font-bold mb-4 font-arabic">إحصائيات</h3>
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-islamic-green-600">
                      {scholar.works.length}
                    </div>
                    <div className="text-xs text-gray-600 font-arabic">
                      مؤلف
                    </div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-islamic-green-600">
                      {scholar.specializations.length}
                    </div>
                    <div className="text-xs text-gray-600 font-arabic">
                      تخصص
                    </div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-islamic-green-600">
                      {teachers.length}
                    </div>
                    <div className="text-xs text-gray-600 font-arabic">شيخ</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-islamic-green-600">
                      {students.length}
                    </div>
                    <div className="text-xs text-gray-600 font-arabic">
                      تلميذ
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Sources */}
            {scholar.sources.length > 0 && (
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-bold mb-4 font-arabic">
                    المصادر
                  </h3>
                  <ul className="space-y-2 text-sm">
                    {scholar.sources.map((source, index) => (
                      <li key={index} className="flex items-center font-arabic">
                        <div className="w-1 h-1 bg-islamic-green-500 rounded-full ml-2"></div>
                        {source}
                      </li>
                    ))}
                  </ul>
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
