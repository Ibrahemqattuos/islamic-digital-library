import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  BookOpen,
  Users,
  MessageSquare,
  Calendar,
  Star,
  TrendingUp,
  Clock,
  ArrowRight,
  Crown,
} from "lucide-react";
import { Link } from "react-router-dom";
import { CLASSICAL_BOOKS, GREAT_IMAMS } from "@/data/library";

export default function Index() {
  // Use real data from our library
  const featuredBooks = CLASSICAL_BOOKS.slice(0, 3);
  const featuredScholars = GREAT_IMAMS.slice(0, 3);

  const stats = [
    {
      label: "الكتب",
      value: CLASSICAL_BOOKS.length.toString(),
      icon: BookOpen,
    },
    { label: "العلماء", value: GREAT_IMAMS.length.toString(), icon: Users },
    { label: "المسائل الفقهية", value: "8,901", icon: MessageSquare },
    { label: "الفعاليات", value: "156", icon: Calendar },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-islamic-green-700 to-islamic-green-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 font-arabic leading-tight">
              المكتبة الإسلامية الرقمية
            </h1>
            <p className="text-xl md:text-2xl mb-8 font-arabic leading-relaxed max-w-3xl mx-auto">
              منصة شاملة للتراث الإسلامي تجمع آلاف الكتب والمخطوطات وأقوال
              العلماء في مكان واحد
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-islamic-gold-500 hover:bg-islamic-gold-600 text-islamic-gold-900 font-arabic text-lg px-8 py-3"
                asChild
              >
                <Link to="/books">
                  <BookOpen className="w-5 h-5 ml-2" />
                  تصفح الكتب
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-islamic-green-700 font-arabic text-lg px-8 py-3"
                asChild
              >
                <Link to="/scholars">
                  <Users className="w-5 h-5 ml-2" />
                  العلماء والمفكرون
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-islamic-green-100 rounded-full mb-4">
                    <Icon className="w-8 h-8 text-islamic-green-600" />
                  </div>
                  <div className="text-3xl font-bold text-gray-900 mb-2">
                    {stat.value}
                  </div>
                  <div className="text-sm text-gray-600 font-arabic">
                    {stat.label}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured Books Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4 font-arabic">
              الكتب المميزة
            </h2>
            <p className="text-lg text-gray-600 font-arabic">
              اكتشف أهم الكتب في التراث الإسلامي
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {featuredBooks.map((book) => (
              <Card
                key={book.id}
                className="hover:shadow-lg transition-shadow cursor-pointer"
              >
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <Badge variant="secondary" className="font-arabic">
                      {book.category}
                    </Badge>
                    <div className="flex items-center">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="text-sm text-gray-600 mr-1">
                        {book.rating}
                      </span>
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2 font-arabic">
                    {book.arabicTitle}
                  </h3>
                  <p className="text-gray-600 mb-4 font-arabic">
                    {book.author}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500 font-arabic">
                      {book.pages} صفحة
                    </span>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="font-arabic"
                      asChild
                    >
                      <Link to={`/books/${book.id}`}>
                        اقرأ الآن
                        <ArrowRight className="w-4 h-4 mr-2" />
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center">
            <Button variant="outline" size="lg" className="font-arabic" asChild>
              <Link to="/books">
                عرض جميع الكتب
                <ArrowRight className="w-4 h-4 mr-2" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Scholars Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4 font-arabic">
              علماء وأئمة
            </h2>
            <p className="text-lg text-gray-600 font-arabic">
              تعرف على سير العلماء ومؤلفاتهم
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {recentScholars.map((scholar) => (
              <Card
                key={scholar.id}
                className="hover:shadow-lg transition-shadow cursor-pointer"
              >
                <CardContent className="p-6 text-center">
                  <div className="w-20 h-20 bg-islamic-green-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <Users className="w-10 h-10 text-islamic-green-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2 font-arabic">
                    {scholar.name}
                  </h3>
                  <p className="text-gray-600 mb-4 font-arabic">
                    {scholar.specialization}
                  </p>
                  <div className="flex items-center justify-center text-sm text-gray-500">
                    <TrendingUp className="w-4 h-4 ml-1" />
                    <span className="font-arabic">{scholar.works} مؤلف</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center">
            <Button variant="outline" size="lg" className="font-arabic" asChild>
              <Link to="/scholars">
                عرض جميع العلماء
                <ArrowRight className="w-4 h-4 mr-2" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Recent Activity Section */}
      <section className="py-16 bg-islamic-green-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4 font-arabic">
              النشاطات الحديثة
            </h2>
            <p className="text-lg text-gray-600 font-arabic">
              آخر المسائل الفقهية والفعاليات
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <MessageSquare className="w-6 h-6 text-islamic-green-600 ml-3" />
                  <h3 className="text-lg font-bold text-gray-900 font-arabic">
                    المسائل الفقهية الحديثة
                  </h3>
                </div>
                <ul className="space-y-3">
                  <li className="flex items-center justify-between">
                    <span className="font-arabic text-gray-700">
                      حكم التعامل بالعملات الرقمية
                    </span>
                    <Clock className="w-4 h-4 text-gray-400" />
                  </li>
                  <li className="flex items-center justify-between">
                    <span className="font-arabic text-gray-700">
                      أحكام الصلاة في الطائرة
                    </span>
                    <Clock className="w-4 h-4 text-gray-400" />
                  </li>
                  <li className="flex items-center justify-between">
                    <span className="font-arabic text-gray-700">
                      زكاة الأسهم والاستثمارات
                    </span>
                    <Clock className="w-4 h-4 text-gray-400" />
                  </li>
                </ul>
                <Button
                  variant="ghost"
                  className="w-full mt-4 font-arabic"
                  asChild
                >
                  <Link to="/fiqh">
                    عرض المزيد
                    <ArrowRight className="w-4 h-4 mr-2" />
                  </Link>
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <Calendar className="w-6 h-6 text-islamic-green-600 ml-3" />
                  <h3 className="text-lg font-bold text-gray-900 font-arabic">
                    الفعاليات القادمة
                  </h3>
                </div>
                <ul className="space-y-3">
                  <li className="flex items-center justify-between">
                    <span className="font-arabic text-gray-700">
                      محاضرة في علوم القرآن
                    </span>
                    <span className="text-sm text-gray-500">غداً</span>
                  </li>
                  <li className="flex items-center justify-between">
                    <span className="font-arabic text-gray-700">
                      ندوة في الفقه المعاصر
                    </span>
                    <span className="text-sm text-gray-500">الجمعة</span>
                  </li>
                  <li className="flex items-center justify-between">
                    <span className="font-arabic text-gray-700">
                      دورة في دراسة الحديث
                    </span>
                    <span className="text-sm text-gray-500">
                      الأسبوع القادم
                    </span>
                  </li>
                </ul>
                <Button
                  variant="ghost"
                  className="w-full mt-4 font-arabic"
                  asChild
                >
                  <Link to="/events">
                    عرض المزيد
                    <ArrowRight className="w-4 h-4 mr-2" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-islamic-green-800 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-bold mb-4 font-arabic">
                المكتبة الرقمية
              </h3>
              <p className="text-islamic-green-200 font-arabic">
                منصة شاملة للتراث الإسلامي والمعرفة الدينية
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4 font-arabic">الأقسام</h4>
              <ul className="space-y-2 text-islamic-green-200">
                <li>
                  <Link to="/books" className="hover:text-white font-arabic">
                    الكتب
                  </Link>
                </li>
                <li>
                  <Link to="/scholars" className="hover:text-white font-arabic">
                    العلماء
                  </Link>
                </li>
                <li>
                  <Link to="/fiqh" className="hover:text-white font-arabic">
                    المسائل الفقهية
                  </Link>
                </li>
                <li>
                  <Link to="/events" className="hover:text-white font-arabic">
                    الفعاليات
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4 font-arabic">المساعدة</h4>
              <ul className="space-y-2 text-islamic-green-200">
                <li>
                  <Link to="/help" className="hover:text-white font-arabic">
                    كيفية الاستخدام
                  </Link>
                </li>
                <li>
                  <Link to="/contact" className="hover:text-white font-arabic">
                    اتصل بنا
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4 font-arabic">تواصل معنا</h4>
              <p className="text-islamic-green-200 font-arabic">
                info@islamiclibrary.com
              </p>
            </div>
          </div>
          <div className="border-t border-islamic-green-700 mt-8 pt-8 text-center">
            <p className="text-islamic-green-200 font-arabic">
              © 2024 المكتبة الإسلامية الرقمية. جميع الحقوق محفوظة.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
