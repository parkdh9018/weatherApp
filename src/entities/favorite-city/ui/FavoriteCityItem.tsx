import type { FavoriteCity } from "@/shared/model";
import { useState } from "react";
import { WeatherSummary } from "@/entities/weather";
import { NicknameEditor } from "./NicknameEditor";
import { formatAddressDisplay } from "@/shared/lib/formatAddress";

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
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors gap-4">
      <button
        onClick={() => onCityClick(city.address, city.coords)}
        className="flex-1 text-left flex flex-col md:flex-row md:items-center gap-4"
      >
        <div className="flex-1">
          {isEditing ? (
            <NicknameEditor
              address={city.address}
              currentNickname={city.nickname}
              onCancel={() => setIsEditing(false)}
            />
          ) : (
            <>
              <h3 className="text-lg font-semibold text-blue-600 hover:text-blue-800">
                {city.nickname || formatAddressDisplay(city.address)}
              </h3>
              {city.nickname && (
                <p className="text-sm text-gray-500">
                  {formatAddressDisplay(city.address)}
                </p>
              )}
            </>
          )}
        </div>

        {/* 날씨 정보 */}
        {!isEditing && (
          <WeatherSummary
            lat={city.coords.lat}
            lon={city.coords.lon}
            address={city.address}
          />
        )}
      </button>
      <div className="flex gap-2">
        {!isEditing && (
          <button
            onClick={() => setIsEditing(true)}
            className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
            title="별칭 수정"
          >
            편집
          </button>
        )}
        <button
          onClick={() => onRemove(city.address)}
          className="px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
          title="즐겨찾기 삭제"
        >
          삭제
        </button>
      </div>
    </div>
  );
}
