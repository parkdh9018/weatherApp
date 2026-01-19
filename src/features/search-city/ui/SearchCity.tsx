import { useCityStore } from "@/shared/model";
import { useDistrictSearch } from "../model/useDistrictSearch";
import { useLocation, useNavigate } from "react-router-dom";
import { geocodingApi } from "@/entities/weather/api/geocodingApi";
import { useState } from "react";
import { toast } from "react-toastify";
import { formatAddressDisplay } from "@/shared/lib/formatAddress";

export function SearchCity() {
  const { query, setQuery, results, isLoading } = useDistrictSearch();
  const setLocationData = useCityStore((state) => state.setLocationData);
  const location = useLocation();
  const navigate = useNavigate();
  const [isGeocoding, setIsGeocoding] = useState(false);

  const handleSelect = async (district: string) => {
    try {
      setIsGeocoding(true);
      const coords = await geocodingApi.getCoordsByAddress(district);
      setLocationData(district, { lat: coords.lat, lon: coords.lon });
      setQuery("");

      // 현재 즐겨찾기 페이지에 있으면 날씨 페이지로 이동
      if (location.pathname === "/favorite") {
        navigate("/weather");
      }
    } catch (error) {
      console.error("Failed to geocode address:", error);
      toast.error("주소를 좌표로 변환하는데 실패했습니다.");
    } finally {
      setIsGeocoding(false);
    }
  };

  return (
    <div className="relative flex-1">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="지역 검색... (예: 서울, 강남, 복정동)"
        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      {(isLoading || isGeocoding) && (
        <div className="absolute z-10 w-full bg-white border rounded-lg shadow-lg mt-1 p-4 text-center text-gray-500">
          {isGeocoding ? "위치 정보 확인 중..." : "검색 데이터 로딩 중..."}
        </div>
      )}

      {results.length > 0 && !isLoading && (
        <ul className="absolute z-10 w-full bg-white border rounded-lg shadow-lg mt-1 max-h-80 overflow-y-auto">
          {results.map((result, index) => (
            <li
              key={index}
              onClick={() => handleSelect(result.full)}
              className="px-4 py-3 hover:bg-gray-100 cursor-pointer border-b last:border-b-0"
            >
              <div className="font-medium">
                {result.dong ? (
                  <>
                    <span className="text-blue-600">{result.dong}</span>
                    <span className="text-gray-500 text-sm ml-2">
                      {result.district && `${result.district}, `}
                      {result.city}
                    </span>
                  </>
                ) : result.district ? (
                  <>
                    <span className="text-blue-600">{result.district}</span>
                    <span className="text-gray-500 text-sm ml-2">
                      {result.city}
                    </span>
                  </>
                ) : (
                  <span className="text-blue-600">{result.city}</span>
                )}
              </div>
              <div className="text-xs text-gray-400 mt-1">
                {formatAddressDisplay(result.full)}
              </div>
            </li>
          ))}
        </ul>
      )}

      {query.length >= 2 && results.length === 0 && !isLoading && (
        <div className="absolute z-10 w-full bg-white border rounded-lg shadow-lg mt-1 p-4 text-center text-gray-500">
          검색 결과가 없습니다.
        </div>
      )}
    </div>
  );
}
