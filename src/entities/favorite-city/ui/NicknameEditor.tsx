import { useFavoritesStore } from "@/shared/model";
import { useState } from "react";

interface NicknameEditorProps {
  address: string;
  currentNickname?: string;
  onCancel: () => void;
}

export function NicknameEditor({
  address,
  currentNickname,
  onCancel,
}: NicknameEditorProps) {
  const [nickname, setNickname] = useState(currentNickname || "");
  const updateNickname = useFavoritesStore((state) => state.updateNickname);

  const handleSave = () => {
    updateNickname(address, nickname);
    onCancel();
  };

  return (
    <div
      className="flex items-center gap-2"
      onClick={(e) => e.stopPropagation()}
    >
      <input
        type="text"
        value={nickname}
        onChange={(e) => setNickname(e.target.value)}
        placeholder="별칭 입력"
        className="px-2 py-1 border rounded flex-1"
        autoFocus
      />
      <button
        onClick={handleSave}
        className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        저장
      </button>
      <button
        onClick={onCancel}
        className="px-3 py-1 bg-gray-300 rounded hover:bg-gray-400"
      >
        취소
      </button>
    </div>
  );
}
