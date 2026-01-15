import { SearchCity } from "@/features/search-city";

export function Header() {
  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between w-full">
          <h1 className="text-2xl font-bold text-blue-600 whitespace-nowrap">
            날씨 앱
          </h1>
          <div className="flex-1 max-w-md ml-auto">
            <SearchCity onSearch={(city) => console.log(city)} />
          </div>
        </div>
      </div>
    </header>
  );
}
