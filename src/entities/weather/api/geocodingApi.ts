import type { Coordinates } from "../model/type";

export const geocodingApi = {
  getCoordsByAddress: async (address: string): Promise<Coordinates> => {
    const geocoder = new kakao.maps.services.Geocoder();
    console.log("Requesting coordinates for address:", address);
    return await new Promise((resolve, reject) => {
      geocoder.addressSearch(address, (result, status) => {
        if (status === kakao.maps.services.Status.OK) {
          console.log("Geocoding result:", result);
          resolve({
            lat: Number(result[0].y),
            lon: Number(result[0].x),
          });
        } else {
          reject(new Error("좌표 정보를 가져오는데 실패했습니다"));
        }
      });
    });
  },
};
