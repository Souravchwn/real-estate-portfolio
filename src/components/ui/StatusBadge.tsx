import { cn } from '@/lib/utils';
import type { PropertyStatus } from '@/types/domain';

interface StatusBadgeProps {
  status: PropertyStatus;
  className?: string;
}

const statusConfig: Record<PropertyStatus, { label: string; className: string }> = {
  MOVE: {
    label: 'MOVE',
    className: 'bg-green-50 text-green-800 border-green-200',
  },
  BUILD: {
    label: 'BUILD',
    className: 'bg-amber-50 text-amber-800 border-amber-200',
  },
  OWN: {
    label: 'OWN',
    className: 'bg-blue-50 text-blue-800 border-blue-200',
  },
  DROP: {
    label: 'DROP',
    className: 'bg-purple-50 text-purple-800 border-purple-200',
  },
};

export function StatusBadge({ status, className }: StatusBadgeProps): React.JSX.Element {
  const config = statusConfig[status];
  return (
    <span
      className={cn(
        'inline-block border px-2.5 py-0.5 text-caption rounded-sm',
        config.className,
        className,
      )}
    >
      {config.label}
    </span>
  );
}
