import { useFavoritesStore } from "@/shared/model";
import { MAX_FAVORITES } from "@/shared/model/store";

interface FavoriteButtonProps {
  address: string;
  coords: { lat: number; lon: number };
}

export function FavoriteButton({ address, coords }: FavoriteButtonProps) {
  const { isFavorite, toggleFavorite, favorites } = useFavoritesStore();
  const favorite = isFavorite(address);

  const handleToggle = () => {
    // 최대 갯수 체크 (추가할 때만)
    if (!favorite && favorites.length >= MAX_FAVORITES) {
      alert(`즐겨찾기는 최대 ${MAX_FAVORITES}개까지 추가할 수 있습니다.`);
      return;
    }
    toggleFavorite({ address, coords });
  };

  return (
    <button
      onClick={handleToggle}
      className="text-2xl hover:scale-110 transition-transform"
      title={favorite ? "즐겨찾기 제거" : "즐겨찾기 추가"}
    >
      {favorite ? "♥" : "♡"}
    </button>
  );
}
