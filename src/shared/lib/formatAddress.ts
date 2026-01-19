/**
 * 주소 문자열들을 "-"로 연결
 * @param parts 연결할 주소 부분들 (시/도, 구/군, 동/읍/면 등)
 * @returns "서울특별시-강남구-역삼동" 형식의 문자열
 */
export const formatKakaoAddress = (...parts: string[]): string => {
  return parts.filter(Boolean).join("-");
};

/**
 * 주소 문자열의 하이픈을 공백으로 변환
 * @param address "서울특별시-강남구-역삼동" 형식의 문자열
 * @returns "서울특별시 강남구 역삼동" 형식의 문자열
 */
export const formatAddressDisplay = (address: string): string => {
  return address.replace(/-/g, " ");
};
