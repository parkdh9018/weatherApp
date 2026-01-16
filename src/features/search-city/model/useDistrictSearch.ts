import { useMemo, useState, useEffect } from "react";
import { matchKorean } from "../lib/koreanSearch";

export interface DistrictResult {
  full: string;
  city: string;
  district?: string;
  dong?: string;
}

export const useDistrictSearch = () => {
  const [query, setQuery] = useState("");
  const [districts, setDistricts] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // 첫 번째 검색 시도 때만 JSON 로드
  useEffect(() => {
    if (query.length >= 2 && districts.length === 0 && !isLoading) {
      setIsLoading(true);
      import("@/shared/config/korea_districts.json")
        .then((module) => {
          setDistricts(module.default);
          setIsLoading(false);
        })
        .catch(() => {
          setIsLoading(false);
        });
    }
  }, [query, districts.length, isLoading]);

  const filteredDistricts = useMemo(() => {
    if (!query.trim() || query.length < 2 || districts.length === 0) return [];

    return districts
      .filter((district) => matchKorean(district, query))
      .slice(0, 20)
      .map((district) => {
        const parts = district.split("-");
        return {
          full: district,
          city: parts[0] || "",
          district: parts[1],
          dong: parts[2],
        };
      });
  }, [query, districts]);

  return {
    query,
    setQuery,
    results: filteredDistricts,
    isLoading,
  };
};
