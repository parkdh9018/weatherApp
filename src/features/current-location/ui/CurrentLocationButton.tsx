import { useCurrentLocation } from "../model/useCurrentLocation";

export function CurrentLocationButton() {
  const { mutate, isPending } = useCurrentLocation();

  return (
    <div>
      <button
        onClick={() => mutate()}
        disabled={isPending}
        className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 disabled:bg-gray-400 transition flex items-center gap-2 whitespace-nowrap"
      >
        {isPending ? (
          <>
            <span className="animate-spin">⟳</span>
            <span>위치 가져오는 중...</span>
          </>
        ) : (
          <>
            <span>📍</span>
            <span>현재 위치</span>
          </>
        )}
      </button>
    </div>
  );
}
