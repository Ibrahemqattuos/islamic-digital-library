import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import Navigation from "@/components/Navigation";
import SearchResults from "@/components/SearchResults";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

export default function SearchPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get("q") || "");

  useEffect(() => {
    const searchQuery = searchParams.get("q");
    if (searchQuery) {
      setQuery(searchQuery);
    }
  }, [searchParams]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      setSearchParams({ q: query.trim() });
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
              البحث في المكتبة الإسلامية
            </h1>
            <p className="text-lg text-gray-600 font-arabic max-w-2xl mx-auto">
              ابحث في الكتب والعلماء والمسائل الفقهية والفعاليات
            </p>
          </div>

          {/* Search Form */}
          <form
            onSubmit={handleSearch}
            className="max-w-2xl mx-auto flex gap-4"
          >
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                type="search"
                placeholder="ابحث في جميع محتويات المكتبة..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="pl-10 h-12 font-arabic text-right"
                dir="rtl"
              />
            </div>
            <Button type="submit" size="lg" className="h-12 px-8 font-arabic">
              بحث
            </Button>
          </form>
        </div>
      </section>

      {/* Search Results */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SearchResults query={searchParams.get("q") || ""} />
        </div>
      </section>
    </div>
  );
}
