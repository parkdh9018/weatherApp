import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { MainPage } from "@/pages/mainPage";
import { FavoritePage } from "@/pages/favoritePage";

export function RouterProvider() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/weather" replace />} />
        <Route path="/weather" element={<MainPage />} />
        <Route path="/favorite" element={<FavoritePage />} />
      </Routes>
    </BrowserRouter>
  );
}
