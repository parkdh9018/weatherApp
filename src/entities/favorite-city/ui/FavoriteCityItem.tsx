import type { FavoriteCity } from "@/shared/model";
import { useFavoritesStore } from "@/shared/model";
import { useState } from "react";

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
  const [nickname, setNickname] = useState(city.nickname || "");
  const updateNickname = useFavoritesStore((state) => state.updateNickname);

  const handleSaveNickname = () => {
    updateNickname(city.address, nickname);
    setIsEditing(false);
  };

  const handleCancelEdit = () => {
    setNickname(city.nickname || "");
    setIsEditing(false);
  };

  return (
    <div className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors">
      <button
        onClick={() => onCityClick(city.address, city.coords)}
        className="flex-1 text-left"
      >
        {isEditing ? (
          <div
            className="flex items-center gap-2"
            onClick={(e) => e.stopPropagation()}
          >
            <input
              type="text"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              placeholder="별칭 입력"
              className="px-2 py-1 border rounded flex-1"
              autoFocus
            />
            <button
              onClick={handleSaveNickname}
              className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              저장
            </button>
            <button
              onClick={handleCancelEdit}
              className="px-3 py-1 bg-gray-300 rounded hover:bg-gray-400"
            >
              취소
            </button>
          </div>
        ) : (
          <>
            <h3 className="text-lg font-semibold text-blue-600 hover:text-blue-800">
              {city.nickname || city.address}
            </h3>
            {city.nickname && (
              <p className="text-sm text-gray-500">{city.address}</p>
            )}
            {!city.nickname && (
              <p className="text-sm text-gray-500">클릭하여 날씨 보기</p>
            )}
          </>
        )}
      </button>
      <div className="flex gap-2 ml-4">
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
