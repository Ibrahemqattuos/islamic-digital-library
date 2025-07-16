import Navigation from "@/components/Navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Calendar,
  Search,
  Filter,
  Clock,
  MapPin,
  Users,
  ArrowRight,
  Video,
  ExternalLink,
} from "lucide-react";

export default function Events() {
  const events = [
    {
      id: 1,
      title: "محاضرة: علوم القرآن في العصر الحديث",
      speaker: "الدكتور محمد الزحيلي",
      type: "محاضرة",
      date: "2024-01-25",
      time: "20:00",
      duration: "ساعتان",
      location: "المسجد الكبير - الرياض",
      isOnline: true,
      attendees: 450,
      maxAttendees: 500,
      description:
        "محاضرة ��املة حول علوم القرآن وتطبيقاتها في العصر الحديث، تشمل علوم التفسير والقراءات والإعجاز العلمي",
      tags: ["قرآن", "تفسير", "علوم شرعية"],
      status: "متاح",
      category: "العلوم الشرعية",
    },
    {
      id: 2,
      title: "ندوة: الفقه المعاصر والتقنيات الحديثة",
      speaker: "الشيخ عبدالله السعد",
      type: "ندوة",
      date: "2024-01-27",
      time: "19:30",
      duration: "3 ساعات",
      location: "جامعة الإمام محمد بن سعود",
      isOnline: true,
      attendees: 230,
      maxAttendees: 300,
      description:
        "ندوة تفاعلية حول أحكام التقنيات الحديثة والذكاء الاصطناعي من منظور فقهي معاصر",
      tags: ["فقه", "تقنية", "ذكاء اصطناعي"],
      status: "متاح",
      category: "الفقه المعاصر",
    },
    {
      id: 3,
      title: "دورة تدريبية: منهجية البحث في الحديث الشريف",
      speaker: "الدكتور أحمد الغامدي",
      type: "دورة",
      date: "2024-02-01",
      time: "16:00",
      duration: "5 أيام",
      location: "معهد الدراسات الإسلامية",
      isOnline: false,
      attendees: 45,
      maxAttendees: 50,
      description:
        "دورة متخصصة في منهجية البحث والتحقيق في علوم الحديث النبوي الشريف للطلاب والباحثين",
      tags: ["حديث", "بحث", "منهجية"],
      status: "مكتمل",
      category: "علوم الحديث",
    },
    {
      id: 4,
      title: "مؤتمر: التراث الإسلامي والحضارة المعاصرة",
      speaker: "نخبة من العلماء",
      type: "مؤتمر",
      date: "2024-02-10",
      time: "09:00",
      duration: "3 أيام",
      location: "مركز الملك عبدالعزيز الثقافي",
      isOnline: true,
      attendees: 1200,
      maxAttendees: 1500,
      description:
        "مؤتمر دولي يجمع علماء من مختلف البلدان لمناقشة دور التراث الإسلامي في بناء الحضارة المعاصرة",
      tags: ["تراث", "حضارة", "مؤتمر دولي"],
      status: "متاح",
      category: "التراث والحضارة",
    },
    {
      id: 5,
      title: "ورشة ��مل: تحقيق المخطوطات الإسلامية",
      speaker: "الدكتورة فاطمة الزهراني",
      type: "ورشة",
      date: "2024-02-15",
      time: "14:00",
      duration: "يوم واحد",
      location: "مكتبة الملك فهد الوطنية",
      isOnline: false,
      attendees: 25,
      maxAttendees: 30,
      description:
        "ورشة عملية لتعلم أساليب وطرق تحقيق المخطوطات الإسلامية والحفاظ على التراث المكتوب",
      tags: ["مخطوطات", "تحقيق", "تراث"],
      status: "متاح",
      category: "المخطوطات",
    },
    {
      id: 6,
      title: "محاضرة: السيرة النبوية ودروسها المعاصرة",
      speaker: "الدكتور صالح المغامسي",
      type: "محاضرة",
      date: "2024-02-20",
      time: "21:00",
      duration: "ساعة ونصف",
      location: "الحرم المكي الشريف",
      isOnline: true,
      attendees: 2500,
      maxAttendees: 3000,
      description:
        "محاضرة مباشرة من الحرم المكي حول الدروس المستفادة من السيرة النبوية وتطبيقاتها في العصر الحالي",
      tags: ["سيرة", "دروس", "تطبيقات"],
      status: "متاح",
      category: "السيرة النبوية",
    },
  ];

  const eventTypes = [
    "جميع الأنواع",
    "محاضرة",
    "ندوة",
    "دورة",
    "مؤتمر",
    "ورشة",
  ];

  const categories = [
    "جميع الفئات",
    "العلوم الشرعية",
    "الفقه المعاصر",
    "علوم الحديث",
    "التراث والحضارة",
    "المخطوطات",
    "السيرة النبوية",
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "متاح":
        return "bg-green-100 text-green-800";
      case "مكتمل":
        return "bg-red-100 text-red-800";
      case "قريباً":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "محاضرة":
        return "bg-blue-100 text-blue-800";
      case "ندوة":
        return "bg-purple-100 text-purple-800";
      case "دورة":
        return "bg-orange-100 text-orange-800";
      case "مؤتمر":
        return "bg-red-100 text-red-800";
      case "ورشة":
        return "bg-teal-100 text-teal-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("ar-SA", {
      year: "numeric",
      month: "long",
      day: "numeric",
      weekday: "long",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      {/* Header */}
      <section className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4 font-arabic">
              الفعاليات والأنشطة الإسلامية
            </h1>
            <p className="text-lg text-gray-600 font-arabic max-w-2xl mx-auto">
              محاضرات، ندوات، دورات ومؤتمرات في العلوم الشرعية والثقافة
              الإسلامية
            </p>
          </div>

          {/* Search */}
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                type="search"
                placeholder="البحث في الفعاليات والأنشطة..."
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
                نوع الفعالية
              </h3>
              <div className="flex flex-wrap gap-2">
                {eventTypes.map((type, index) => (
                  <Button
                    key={index}
                    variant={index === 0 ? "default" : "outline"}
                    size="sm"
                    className="font-arabic"
                  >
                    {type}
                  </Button>
                ))}
              </div>
            </div>
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
          </div>
        </div>
      </section>

      {/* Events List */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-6 flex justify-between items-center">
            <h2 className="text-2xl font-bold text-gray-900 font-arabic">
              الفعاليات ({events.length})
            </h2>
            <div className="text-sm text-gray-600 font-arabic">
              مرتبة حسب التاريخ
            </div>
          </div>

          <div className="space-y-6">
            {events.map((event) => (
              <Card
                key={event.id}
                className="hover:shadow-lg transition-all duration-300"
              >
                <CardContent className="p-6">
                  <div className="flex flex-col lg:flex-row lg:items-start lg:space-x-6 rtl:lg:space-x-reverse">
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center space-x-2 rtl:space-x-reverse">
                          <Badge
                            className={`text-xs ${getTypeColor(event.type)}`}
                          >
                            {event.type}
                          </Badge>
                          <Badge
                            className={`text-xs ${getStatusColor(
                              event.status,
                            )}`}
                          >
                            {event.status}
                          </Badge>
                          {event.isOnline && (
                            <Badge
                              variant="outline"
                              className="text-xs text-blue-600 border-blue-600"
                            >
                              <Video className="w-3 h-3 ml-1" />
                              أونلاين
                            </Badge>
                          )}
                        </div>
                      </div>

                      <h3 className="text-xl font-bold text-gray-900 mb-3 font-arabic leading-relaxed">
                        {event.title}
                      </h3>

                      <div className="grid md:grid-cols-2 gap-4 mb-4 text-sm text-gray-600">
                        <div className="space-y-2">
                          <div className="flex items-center">
                            <Users className="w-4 h-4 ml-2" />
                            <span className="font-arabic">{event.speaker}</span>
                          </div>
                          <div className="flex items-center">
                            <Calendar className="w-4 h-4 ml-2" />
                            <span className="font-arabic">
                              {formatDate(event.date)}
                            </span>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <div className="flex items-center">
                            <Clock className="w-4 h-4 ml-2" />
                            <span className="font-arabic">
                              {event.time} - {event.duration}
                            </span>
                          </div>
                          <div className="flex items-center">
                            <MapPin className="w-4 h-4 ml-2" />
                            <span className="font-arabic">
                              {event.location}
                            </span>
                          </div>
                        </div>
                      </div>

                      <p className="text-gray-700 mb-4 font-arabic leading-relaxed">
                        {event.description}
                      </p>

                      <div className="flex flex-wrap gap-2 mb-4">
                        {event.tags.map((tag, index) => (
                          <span
                            key={index}
                            className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-islamic-green-100 text-islamic-green-700 font-arabic"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="text-sm text-gray-500">
                          <span className="font-arabic">
                            {event.attendees} / {event.maxAttendees} مشارك
                          </span>
                          <div className="w-32 bg-gray-200 rounded-full h-2 mt-1">
                            <div
                              className="bg-islamic-green-500 h-2 rounded-full"
                              style={{
                                width: `${
                                  (event.attendees / event.maxAttendees) * 100
                                }%`,
                              }}
                            ></div>
                          </div>
                        </div>

                        <div className="flex gap-2">
                          {event.isOnline && (
                            <Button
                              variant="outline"
                              size="sm"
                              className="font-arabic"
                            >
                              <Video className="w-4 h-4 ml-1" />
                              شاهد أونلاين
                            </Button>
                          )}
                          <Button
                            className="font-arabic"
                            size="sm"
                            disabled={event.status === "مكتمل"}
                          >
                            {event.status === "مكتمل" ? "مكتمل" : "سجل الآن"}
                            <ArrowRight className="w-4 h-4 mr-2" />
                          </Button>
                        </div>
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
              تحميل المزيد من الفعاليات
              <ArrowRight className="w-4 h-4 mr-2" />
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
