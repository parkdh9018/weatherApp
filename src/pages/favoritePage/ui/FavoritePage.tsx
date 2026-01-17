import { Header } from "@/widgets/header";

export function FavoritePage() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-bold mb-4">즐겨찾기</h2>
          <p className="text-gray-600">
            즐겨찾는 지역을 추가하고 관리할 수 있습니다.
          </p>
          {/* 즐겨찾기 기능은 추후 구현 */}
        </div>
      </div>
    </div>
  );
}
