import { Header } from "@/widgets/header";
import { Navigation } from "@/widgets/navigation";
import { WeatherDashboard } from "@/widgets/weatherDashboard";
import { useInitialLocation } from "../model/useInitialLocation";

export function MainPage() {
  useInitialLocation();

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <Navigation />
      <WeatherDashboard />
    </div>
  );
}
