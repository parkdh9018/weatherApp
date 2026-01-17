import { create } from "zustand";
import { persist } from "zustand/middleware";

export const MAX_FAVORITES = 6;

export interface FavoriteCity {
  address: string;
  coords: {
    lat: number;
    lon: number;
  };
  nickname?: string;
}

interface FavoritesState {
  favorites: FavoriteCity[];
  addFavorite: (city: FavoriteCity) => void;
  removeFavorite: (address: string) => void;
  updateNickname: (address: string, nickname: string) => void;
  isFavorite: (address: string) => boolean;
  toggleFavorite: (city: FavoriteCity) => void;
}

export const useFavoritesStore = create<FavoritesState>()(
  persist(
    (set, get) => ({
      favorites: [],

      addFavorite: (city) => {
        set((state) => {
          // 중복 체크
          if (state.favorites.some((fav) => fav.address === city.address)) {
            return state;
          }
          // 최대 갯수 체크
          if (state.favorites.length >= MAX_FAVORITES) {
            return state;
          }
          return { favorites: [...state.favorites, city] };
        });
      },

      removeFavorite: (address) => {
        set((state) => ({
          favorites: state.favorites.filter((fav) => fav.address !== address),
        }));
      },

      updateNickname: (address, nickname) => {
        set((state) => ({
          favorites: state.favorites.map((fav) =>
            fav.address === address ? { ...fav, nickname } : fav
          ),
        }));
      },

      isFavorite: (address) => {
        return get().favorites.some((fav) => fav.address === address);
      },

      toggleFavorite: (city) => {
        const { isFavorite, addFavorite, removeFavorite } = get();
        if (isFavorite(city.address)) {
          removeFavorite(city.address);
        } else {
          addFavorite(city);
        }
      },
    }),
    {
      name: "favorite-cities-storage",
    }
  )
);
