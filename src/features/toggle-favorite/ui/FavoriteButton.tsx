import { useFavoritesStore } from "@/shared/model";

interface FavoriteButtonProps {
  address: string;
  coords: { lat: number; lon: number };
}

export function FavoriteButton({ address, coords }: FavoriteButtonProps) {
  const { isFavorite, toggleFavorite } = useFavoritesStore();
  const favorite = isFavorite(address);

  const handleToggle = () => {
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
