'use client';

interface ConfidenceBarProps {
  value: number;
  label?: string;
  showPercentage?: boolean;
}

export default function ConfidenceBar({
  value,
  label,
  showPercentage = true,
}: ConfidenceBarProps) {
  const getColor = () => {
    if (value >= 80) return 'bg-green-500';
    if (value >= 60) return 'bg-amber-500';
    return 'bg-red-500';
  };

  return (
    <div className="w-full">
      {label && (
        <div className="mb-1 flex items-center justify-between text-xs text-slate-500">
          <span>{label}</span>
          {showPercentage && (
            <span className="font-medium text-slate-700">{value}%</span>
          )}
        </div>
      )}
      <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100">
        <div
          className={`h-full rounded-full transition-all duration-300 ${getColor()}`}
          style={{ width: `${Math.min(100, Math.max(0, value))}%` }}
        />
      </div>
    </div>
  );
}
