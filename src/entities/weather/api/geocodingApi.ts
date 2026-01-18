import type { Coordinates } from "../model/type";

export const geocodingApi = {
  getCoordsByAddress: async (address: string): Promise<Coordinates> => {
    const geocoder = new kakao.maps.services.Geocoder();
    return await new Promise((resolve, reject) => {
      geocoder.addressSearch(address, (result, status) => {
        if (status === kakao.maps.services.Status.OK) {
          console.log("Geocoding result:", result);
          resolve({
            lat: Math.round(Number(result[0].y) * 1000) / 1000,
            lon: Math.round(Number(result[0].x) * 1000) / 1000,
            address: result[0].address_name,
          });
        } else {
          reject(new Error("좌표 정보를 가져오는데 실패했습니다"));
        }
      });
    });
  },

  getAddressFromCoords: async (
    lat: number,
    lon: number
  ): Promise<kakao.maps.services.Address | null> => {
    const geocoder = new kakao.maps.services.Geocoder();
    return await new Promise((resolve, reject) => {
      geocoder.coord2Address(lon, lat, (result, status) => {
        console.log("Reverse geocoding result:", result);
        if (status === kakao.maps.services.Status.OK && result[0]) {
          resolve(result[0].address || null);
        } else {
          reject(new Error("알 수 없는 위치"));
        }
      });
    });
  },
};
