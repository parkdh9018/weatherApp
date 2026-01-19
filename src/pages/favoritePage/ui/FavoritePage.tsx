import { Header } from "@/widgets/header";
import { Navigation } from "@/widgets/navigation";
import { useFavoritesStore, useCityStore } from "@/shared/model";
import { useNavigate } from "react-router-dom";
import { FavoriteCityItem } from "@/entities/favorite-city";

export function FavoritePage() {
  const { favorites, removeFavorite } = useFavoritesStore();
  const setSelectedAddress = useCityStore((state) => state.setSelectedAddress);
  const setSelectedCoords = useCityStore((state) => state.setSelectedCoords);
  const navigate = useNavigate();

  const handleCityClick = (
    address: string,
    coords: { lat: number; lon: number },
  ) => {
    setSelectedAddress(address);
    setSelectedCoords(coords);
    navigate("/weather");
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <Navigation />
      <div className="mx-auto px-4 py-8 max-w-4xl">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-bold mb-4">즐겨찾기</h2>

          {favorites.length === 0 ? (
            <p className="text-gray-600">즐겨찾는 지역을 추가해보세요.</p>
          ) : (
            <div className="space-y-3">
              {favorites.map((city) => (
                <FavoriteCityItem
                  key={city.address}
                  city={city}
                  onCityClick={handleCityClick}
                  onRemove={removeFavorite}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
