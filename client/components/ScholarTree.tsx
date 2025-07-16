import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Users, ArrowDown, ArrowRight, Crown, BookOpen } from "lucide-react";
import { Link } from "react-router-dom";
import { GREAT_IMAMS, CLASSICAL_BOOKS } from "@/data/library";

interface ScholarNode {
  scholar: any;
  students: ScholarNode[];
  level: number;
}

export default function ScholarTree() {
  // Build the scholar tree based on teacher-student relationships
  const buildScholarTree = (): ScholarNode[] => {
    const scholarMap = new Map();
    const roots: ScholarNode[] = [];

    // Initialize all scholars
    GREAT_IMAMS.forEach((scholar) => {
      scholarMap.set(scholar.id, {
        scholar,
        students: [],
        level: 0,
      });
    });

    // Build relationships
    GREAT_IMAMS.forEach((scholar) => {
      const node = scholarMap.get(scholar.id);

      // Find students (scholars who mention this scholar as a teacher)
      const students = GREAT_IMAMS.filter((s) =>
        s.teachers.some(
          (teacher) =>
            scholar.name.includes(teacher) ||
            scholar.arabicName.includes(teacher),
        ),
      );

      students.forEach((student) => {
        const studentNode = scholarMap.get(student.id);
        if (studentNode) {
          node.students.push(studentNode);
          studentNode.level = node.level + 1;
        }
      });
    });

    // Find root nodes (scholars with no teachers in our dataset)
    GREAT_IMAMS.forEach((scholar) => {
      const hasTeacherInDataset = GREAT_IMAMS.some((potentialTeacher) =>
        scholar.teachers.some(
          (teacher) =>
            potentialTeacher.name.includes(teacher) ||
            potentialTeacher.arabicName.includes(teacher),
        ),
      );

      if (!hasTeacherInDataset) {
        roots.push(scholarMap.get(scholar.id));
      }
    });

    return roots;
  };

  const scholarTree = buildScholarTree();

  const ScholarNodeComponent = ({
    node,
    isRoot = false,
  }: {
    node: ScholarNode;
    isRoot?: boolean;
  }) => {
    const scholarBooks = CLASSICAL_BOOKS.filter(
      (book) => book.authorId === node.scholar.id,
    );

    return (
      <div className={`relative ${isRoot ? "mb-8" : "mb-6"}`}>
        {/* Scholar Card */}
        <Card
          className={`${isRoot ? "ring-2 ring-islamic-gold-300 bg-islamic-gold-50" : ""} hover:shadow-lg transition-shadow`}
        >
          <CardContent className="p-4">
            <div className="flex items-center gap-4">
              <div
                className={`w-12 h-12 ${isRoot ? "bg-islamic-gold-100" : "bg-islamic-green-100"} rounded-full flex items-center justify-center relative`}
              >
                <Users
                  className={`w-6 h-6 ${isRoot ? "text-islamic-gold-600" : "text-islamic-green-600"}`}
                />
                {isRoot && (
                  <Crown className="w-3 h-3 text-islamic-gold-500 absolute -top-1 -right-1" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-bold text-sm font-arabic">
                    {node.scholar.arabicName}
                  </h3>
                  {isRoot && (
                    <Badge className="bg-islamic-gold-500 text-islamic-gold-900 text-xs">
                      مؤسس
                    </Badge>
                  )}
                </div>
                <p className="text-xs text-gray-600 font-arabic mb-1">
                  {node.scholar.title}
                </p>
                <p className="text-xs text-gray-500 font-arabic">
                  {node.scholar.birthYear} - {node.scholar.deathYear}
                </p>
              </div>
              <div className="flex flex-col gap-1">
                <Link to={`/scholars/${node.scholar.id}`}>
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-xs font-arabic h-6"
                  >
                    السيرة
                  </Button>
                </Link>
                {scholarBooks.length > 0 && (
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-xs font-arabic h-6"
                  >
                    <BookOpen className="w-3 h-3 ml-1" />
                    {scholarBooks.length}
                  </Button>
                )}
              </div>
            </div>

            {/* Quick Info */}
            <div className="mt-3 flex flex-wrap gap-1">
              {node.scholar.specializations.slice(0, 2).map((spec, index) => (
                <Badge
                  key={index}
                  variant="secondary"
                  className="text-xs font-arabic"
                >
                  {spec}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Students Connection */}
        {node.students.length > 0 && (
          <div className="ml-8 mt-4">
            {/* Connection Line */}
            <div className="flex items-center mb-4">
              <div className="w-4 h-px bg-gray-300"></div>
              <ArrowDown className="w-4 h-4 text-gray-400 mx-2" />
              <div className="text-xs text-gray-500 font-arabic">
                التلاميذ ({node.students.length})
              </div>
            </div>

            {/* Students Grid */}
            <div className="space-y-4">
              {node.students.map((studentNode, index) => (
                <div key={studentNode.scholar.id} className="relative">
                  {/* Branch Line */}
                  <div className="absolute -left-8 top-6 w-8 h-px bg-gray-300"></div>
                  <ScholarNodeComponent node={studentNode} />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  };

  const CompactScholarTree = () => {
    return (
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {GREAT_IMAMS.map((imam) => {
          const students = GREAT_IMAMS.filter((scholar) =>
            scholar.teachers.some(
              (teacher) =>
                imam.name.includes(teacher) ||
                imam.arabicName.includes(teacher),
            ),
          );

          return (
            <Card key={imam.id} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-4">
                {/* Imam */}
                <div className="text-center mb-4">
                  <div className="w-16 h-16 bg-islamic-gold-100 rounded-full mx-auto mb-3 flex items-center justify-center relative">
                    <Users className="w-8 h-8 text-islamic-gold-600" />
                    <Crown className="w-4 h-4 text-islamic-gold-500 absolute -top-1 -right-1" />
                  </div>
                  <h3 className="font-bold font-arabic text-sm mb-1">
                    {imam.arabicName}
                  </h3>
                  <p className="text-xs text-gray-600 font-arabic mb-2">
                    {imam.title}
                  </p>
                  <Badge className="bg-islamic-gold-500 text-islamic-gold-900 text-xs">
                    {imam.madhhab === "hanafi" && "الحنفي"}
                    {imam.madhhab === "maliki" && "المالكي"}
                    {imam.madhhab === "shafii" && "الشافعي"}
                    {imam.madhhab === "hanbali" && "الحنبلي"}
                  </Badge>
                </div>

                {/* Students */}
                {students.length > 0 && (
                  <div>
                    <div className="flex items-center justify-center mb-3">
                      <ArrowDown className="w-4 h-4 text-gray-400" />
                    </div>
                    <div className="space-y-2">
                      <h4 className="text-xs font-semibold text-center font-arabic text-gray-700">
                        أشهر التلاميذ
                      </h4>
                      {students.slice(0, 2).map((student) => (
                        <Link key={student.id} to={`/scholars/${student.id}`}>
                          <div className="bg-gray-50 rounded-lg p-2 hover:bg-gray-100 transition-colors">
                            <div className="flex items-center gap-2">
                              <div className="w-6 h-6 bg-islamic-green-100 rounded-full flex items-center justify-center">
                                <Users className="w-3 h-3 text-islamic-green-600" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="text-xs font-arabic font-semibold">
                                  {student.arabicName}
                                </p>
                                <p className="text-xs text-gray-500 font-arabic">
                                  {student.specializations[0]}
                                </p>
                              </div>
                            </div>
                          </div>
                        </Link>
                      ))}
                      {students.length > 2 && (
                        <div className="text-center">
                          <span className="text-xs text-gray-500 font-arabic">
                            +{students.length - 2} آخرين
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Quick Actions */}
                <div className="mt-4 space-y-2">
                  <Link to={`/scholars/${imam.id}`}>
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full text-xs font-arabic"
                    >
                      عرض السيرة الكاملة
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    );
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4 font-arabic">
          شجرة العلماء والمذاهب
        </h2>
        <p className="text-gray-600 font-arabic max-w-2xl mx-auto">
          تصور تفاعلي لعلاقات الأئمة الأربعة وتلاميذهم عبر التاريخ
        </p>
      </div>

      {/* Compact Tree View */}
      <CompactScholarTree />

      {/* Legend */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-center gap-6 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-islamic-gold-100 rounded-full flex items-center justify-center">
                <Crown className="w-2 h-2 text-islamic-gold-600" />
              </div>
              <span className="font-arabic">الأئمة المؤسسون</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-islamic-green-100 rounded-full flex items-center justify-center">
                <Users className="w-2 h-2 text-islamic-green-600" />
              </div>
              <span className="font-arabic">التلاميذ والأتباع</span>
            </div>
            <div className="flex items-center gap-2">
              <ArrowDown className="w-4 h-4 text-gray-400" />
              <span className="font-arabic">علاقة الأستاذ والتلميذ</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
