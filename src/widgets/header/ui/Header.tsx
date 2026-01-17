import { SearchCity } from "@/features/search-city";
import { Navigation } from "./Navigation";

export function Header() {
  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between gap-4 mb-4">
          <h1 className="text-2xl font-bold text-blue-600 whitespace-nowrap">
            날씨 앱
          </h1>
          <div className="flex items-center gap-2 flex-1 max-w-2xl">
            <SearchCity />
          </div>
        </div>
        <Navigation />
      </div>
    </header>
  );
}
