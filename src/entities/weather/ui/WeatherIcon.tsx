interface WeatherIconProps {
  icon: string;
  description: string;
  size?: "sm" | "md" | "lg";
}

export function WeatherIcon({
  icon,
  description,
  size = "md",
}: WeatherIconProps) {
  const sizeMap = {
    sm: "w-12 h-12",
    md: "w-20 h-20",
    lg: "w-32 h-32",
  };

  return (
    <img
      src={`https://openweathermap.org/img/wn/${icon}@2x.png`}
      alt={description}
      className={sizeMap[size]}
    />
  );
}
