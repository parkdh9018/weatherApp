import { Header } from "@/widgets/header";
import { WeatherDashboard } from "@/widgets/weatherDashboard";

export function MainPage() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <WeatherDashboard />
    </div>
  );
}
