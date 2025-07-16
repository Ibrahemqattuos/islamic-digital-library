import { useState, useEffect } from "react";
import Navigation from "@/components/Navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Users,
  Search,
  MapPin,
  Calendar,
  BookOpen,
  ArrowRight,
  Crown,
  GraduationCap,
  Filter,
  Star,
} from "lucide-react";
import { Link } from "react-router-dom";
import {
  ShafiDataLoader,
  type ShafiScholar,
  type ShafiDataset,
} from "@/data/shafii-data";

export default function ShafiScholars() {
  const [data, setData] = useState<ShafiDataset | null>(null);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGeneration, setSelectedGeneration] = useState<number | null>(
    null,
  );
  const [selectedCentury, setSelectedCentury] = useState<string | null>(null);

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

  const scholars = data?.scholars || [];
  const generations = [...new Set(scholars.map((s) => s.generation))].sort();
  const centuries = [...new Set(scholars.map((s) => s.century))];

  // Filter scholars based on search and filters
  const filteredScholars = scholars.filter((scholar) => {
    const matchesSearch =
      !searchQuery ||
      scholar.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      scholar.arabicName.includes(searchQuery) ||
      scholar.specializations.some((spec) => spec.includes(searchQuery));

    const matchesGeneration =
      !selectedGeneration || scholar.generation === selectedGeneration;

    const matchesCentury =
      !selectedCentury || scholar.century === selectedCentury;

    return matchesSearch && matchesGeneration && matchesCentury;
  });

  const ScholarCard = ({ scholar }: { scholar: ShafiScholar }) => {
    const books = dataLoader.getBooksByAuthor(scholar.id);
    const students = dataLoader.getStudentsOfScholar(scholar.id);
    const teachers = dataLoader.getTeachersOfScholar(scholar.id);

    const isFounder = scholar.id === "imam-shafii";

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
              } rounded-full mx-auto mb-4 flex items-center justify-center relative`}
            >
              <Users
                className={`w-10 h-10 ${
                  isFounder ? "text-islamic-gold-600" : "text-islamic-green-600"
                }`}
              />
              {isFounder && (
                <Crown className="w-4 h-4 text-islamic-gold-500 absolute -top-1 -right-1" />
              )}
            </div>

            <h3 className="text-xl font-bold text-gray-900 mb-2 font-arabic">
              {scholar.arabicName}
            </h3>
            <p
              className={`${
                isFounder ? "text-islamic-gold-600" : "text-islamic-green-600"
              } font-arabic text-sm mb-2`}
            >
              {scholar.title}
            </p>
            <p className="text-xs text-gray-500 font-arabic mb-1">
              {scholar.kunya}
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
              <GraduationCap className="w-4 h-4 ml-2 flex-shrink-0" />
              <span className="font-arabic">الطبقة {scholar.generation}</span>
            </div>
          </div>

          {/* Statistics */}
          <div className="grid grid-cols-3 gap-4 mb-4 text-center">
            <div>
              <div className="text-lg font-bold text-islamic-green-600">
                {books.length}
              </div>
              <div className="text-xs text-gray-600 font-arabic">مؤلف</div>
            </div>
            <div>
              <div className="text-lg font-bold text-islamic-green-600">
                {teachers.length}
              </div>
              <div className="text-xs text-gray-600 font-arabic">شيخ</div>
            </div>
            <div>
              <div className="text-lg font-bold text-islamic-green-600">
                {students.length}
              </div>
              <div className="text-xs text-gray-600 font-arabic">تلميذ</div>
            </div>
          </div>

          {/* Specializations */}
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

          {/* Biography snippet */}
          <p className="text-sm text-gray-600 mb-4 font-arabic line-clamp-2 text-center leading-relaxed">
            {scholar.biography}
          </p>

          {/* Verification badge */}
          {scholar.verified && (
            <div className="flex justify-center mb-4">
              <Badge variant="outline" className="text-xs font-arabic">
                <Star className="w-3 h-3 ml-1" />
                محقق
              </Badge>
            </div>
          )}

          <div className="flex gap-2">
            <Button
              className="flex-1 font-arabic text-sm"
              size="sm"
              asChild
              variant={isFounder ? "default" : "default"}
            >
              <Link to={`/shafi-scholars/${scholar.id}`}>
                <Users className="w-4 h-4 ml-1" />
                السيرة الكاملة
              </Link>
            </Button>
            {books.length > 0 && (
              <Button
                variant="outline"
                className="flex-1 font-arabic text-sm"
                size="sm"
                asChild
              >
                <Link to={`/shafi-books?author=${scholar.id}`}>
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

  const GenerationView = ({ generation }: { generation: number }) => {
    const generationScholars = scholars.filter(
      (s) => s.generation === generation,
    );

    return (
      <div className="space-y-6">
        <Card>
          <CardContent className="p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4 font-arabic flex items-center">
              <GraduationCap className="w-5 h-5 ml-2" />
              الطبقة {generation}
            </h3>
            <p className="text-gray-600 font-arabic">
              {generation === 1 && "طبقة الإمام المؤسس والصحابة المباشرين"}
              {generation === 2 && "طبقة التلاميذ المباشرين وحملة المذهب"}
              {generation === 3 && "طبقة أصحاب الوجوه والمحققين"}
              {generation > 3 && `طبقة الفقهاء والعلماء المتأخرين`}
            </p>
            <div className="mt-4 text-sm text-gray-500">
              <span className="font-arabic">
                عدد العلماء: {generationScholars.length}
              </span>
            </div>
          </CardContent>
        </Card>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {generationScholars.map((scholar) => (
            <ScholarCard key={scholar.id} scholar={scholar} />
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
              علماء المذهب الشافعي
            </h1>
            <p className="text-lg text-gray-600 font-arabic max-w-2xl mx-auto">
              قاعدة بيانات شاملة لعلماء المذهب الشافعي عبر العصور مع علاقاتهم
              ومؤلفاتهم
            </p>
          </div>

          {/* Search */}
          <div className="max-w-2xl mx-auto mb-6">
            <div className="relative">
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                type="search"
                placeholder="البحث عن العلماء بالاسم أو التخصص..."
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
                {scholars.length}
              </div>
              <div className="text-sm text-gray-600 font-arabic">
                إجمالي العلماء
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-islamic-green-600">
                {generations.length}
              </div>
              <div className="text-sm text-gray-600 font-arabic">الطبقات</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-islamic-green-600">
                {data?.books.length || 0}
              </div>
              <div className="text-sm text-gray-600 font-arabic">الكتب</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-islamic-green-600">
                {data?.scholarRelations.length || 0}
              </div>
              <div className="text-sm text-gray-600 font-arabic">العلاقات</div>
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
                تصفية حسب الطبقة
              </h3>
              <div className="flex flex-wrap gap-2">
                <Button
                  variant={selectedGeneration === null ? "default" : "outline"}
                  size="sm"
                  className="font-arabic"
                  onClick={() => setSelectedGeneration(null)}
                >
                  جميع الطبقات
                </Button>
                {generations.map((gen) => (
                  <Button
                    key={gen}
                    variant={selectedGeneration === gen ? "default" : "outline"}
                    size="sm"
                    className="font-arabic"
                    onClick={() => setSelectedGeneration(gen)}
                  >
                    الطبقة {gen}
                  </Button>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-2 font-arabic">
                تصفية حسب القرن
              </h3>
              <div className="flex flex-wrap gap-2">
                <Button
                  variant={selectedCentury === null ? "default" : "outline"}
                  size="sm"
                  className="font-arabic"
                  onClick={() => setSelectedCentury(null)}
                >
                  جميع القرون
                </Button>
                {centuries.map((century) => (
                  <Button
                    key={century}
                    variant={
                      selectedCentury === century ? "default" : "outline"
                    }
                    size="sm"
                    className="font-arabic"
                    onClick={() => setSelectedCentury(century)}
                  >
                    {century}
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
                جميع العلماء
              </TabsTrigger>
              <TabsTrigger value="generation-1" className="font-arabic">
                الطبقة الأولى
              </TabsTrigger>
              <TabsTrigger value="generation-2" className="font-arabic">
                الطبقة الثانية
              </TabsTrigger>
              <TabsTrigger value="generation-3" className="font-arabic">
                الطبقة الثالثة
              </TabsTrigger>
              <TabsTrigger value="relationships" className="font-arabic">
                شبكة العلاقات
              </TabsTrigger>
            </TabsList>

            <TabsContent value="all">
              <div className="mb-6 flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-900 font-arabic">
                  العلماء ({filteredScholars.length})
                </h2>
                <div className="text-sm text-gray-600 font-arabic">
                  مرتبة حسب الطبقة والوفاة
                </div>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredScholars.map((scholar) => (
                  <ScholarCard key={scholar.id} scholar={scholar} />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="generation-1">
              <GenerationView generation={1} />
            </TabsContent>

            <TabsContent value="generation-2">
              <GenerationView generation={2} />
            </TabsContent>

            <TabsContent value="generation-3">
              <GenerationView generation={3} />
            </TabsContent>

            <TabsContent value="relationships">
              <div className="space-y-6">
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-lg font-bold mb-4 font-arabic">
                      شبكة العلاقات العلمية
                    </h3>
                    <p className="text-gray-600 font-arabic mb-4">
                      تصور تفاعلي لعلاقات الأستاذ والتلميذ بين علماء المذهب
                      الشافعي
                    </p>
                    <div className="text-center py-8">
                      <div className="text-gray-500 font-arabic">
                        شبكة العلاقات التفاعلية ستكون متاحة قري��اً
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
