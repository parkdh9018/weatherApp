import { SearchCity } from "@/features/search-city";

export function Header() {
  return (
    <header className="bg-white shadow-md">
      <div className="mx-auto px-4 py-4 max-w-4xl">
        <div className="flex items-center justify-between gap-4">
          <h1 className="text-2xl font-bold text-blue-600 whitespace-nowrap">
            날씨
          </h1>
          <div className="flex items-center gap-2 flex-1 max-w-md">
            <SearchCity />
          </div>
        </div>
      </div>
    </header>
  );
}
