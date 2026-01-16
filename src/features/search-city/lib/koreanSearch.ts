const CHO_HANGUL = [
  "ㄱ",
  "ㄲ",
  "ㄴ",
  "ㄷ",
  "ㄸ",
  "ㄹ",
  "ㅁ",
  "ㅂ",
  "ㅃ",
  "ㅅ",
  "ㅆ",
  "ㅇ",
  "ㅈ",
  "ㅉ",
  "ㅊ",
  "ㅋ",
  "ㅌ",
  "ㅍ",
  "ㅎ",
];

export const getChosung = (str: string): string => {
  let result = "";

  for (let i = 0; i < str.length; i++) {
    const code = str.charCodeAt(i) - 0xac00;
    if (code > -1 && code < 11172) {
      result += CHO_HANGUL[Math.floor(code / 588)];
    } else {
      result += str.charAt(i);
    }
  }

  return result;
};

export const matchKorean = (text: string, query: string): boolean => {
  const lowerQuery = query.toLowerCase();
  const lowerText = text.toLowerCase();

  // 일반 검색
  if (lowerText.includes(lowerQuery)) return true;

  // 초성 검색
  const chosung = getChosung(text);
  if (chosung.includes(lowerQuery)) return true;

  return false;
};
