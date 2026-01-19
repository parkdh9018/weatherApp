interface InfoCardProps {
  label: string;
  children: React.ReactNode;
}

export function InfoCard({ label, children }: InfoCardProps) {
  return (
    <div className="bg-white rounded-lg p-3 shadow-sm">
      <div className="text-xs text-gray-500 mb-1">{label}</div>
      {children}
    </div>
  );
}
