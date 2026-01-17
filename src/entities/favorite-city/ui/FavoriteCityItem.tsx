import type { FavoriteCity } from "@/shared/model";

interface FavoriteCityItemProps {
  city: FavoriteCity;
  onCityClick: (address: string, coords: { lat: number; lon: number }) => void;
  onRemove: (address: string) => void;
}

export function FavoriteCityItem({
  city,
  onCityClick,
  onRemove,
}: FavoriteCityItemProps) {
  return (
    <div className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors">
      <button
        onClick={() => onCityClick(city.address, city.coords)}
        className="flex-1 text-left"
      >
        <h3 className="text-lg font-semibold text-blue-600 hover:text-blue-800">
          {city.address}
        </h3>
        <p className="text-sm text-gray-500">클릭하여 날씨 보기</p>
      </button>
      <button
        onClick={() => onRemove(city.address)}
        className="ml-4 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
        title="즐겨찾기 삭제"
      >
        삭제
      </button>
    </div>
  );
}
