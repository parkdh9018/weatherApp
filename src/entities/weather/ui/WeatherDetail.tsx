interface WeatherDetailProps {
  label: string
  value: string | number
  unit?: string
}

export function WeatherDetail({ label, value, unit }: WeatherDetailProps) {
  return (
    <div>
      <p className="text-gray-600 text-sm">{label}</p>
      <p className="text-lg font-semibold">
        {value}{unit && <span className="text-sm ml-1">{unit}</span>}
      </p>
    </div>
  )
}