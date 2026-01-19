import { useCurrentLocation } from "../model/useCurrentLocation";
import locationIcon from "../assets/location.svg";
import { useState } from "react";

export function CurrentLocationButton() {
  const { mutate, isPending } = useCurrentLocation();
  const [isSpinning, setIsSpinning] = useState(false);

  const handleClick = () => {
    setIsSpinning(true);
    mutate();
    setTimeout(() => setIsSpinning(false), 500);
  };

  return (
    <button
      onClick={handleClick}
      disabled={isPending}
      className="hover:scale-110 transition-transform disabled:opacity-50"
      title={isPending ? "위치 가져오는 중..." : "현재 위치"}
    >
      <img
        src={locationIcon}
        alt="현재 위치"
        className={`w-6 h-6 ${isSpinning ? "animate-[spin_0.5s_ease-in-out]" : ""}`}
      />
    </button>
  );
}
