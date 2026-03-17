import { cn } from '@/lib/utils';
import type { PropertyStatus } from '@/types/domain';

interface StatusBadgeProps {
  status: PropertyStatus;
  className?: string;
}

const statusConfig: Record<PropertyStatus, { label: string; className: string }> = {
  Active: {
    label: 'Active',
    className: 'bg-green-50 text-green-800 border-green-200',
  },
  Sold: {
    label: 'Sold',
    className: 'bg-neutral-100 text-neutral-500 border-neutral-200',
  },
  'Pre-Development': {
    label: 'Pre-Development',
    className: 'bg-amber-50 text-amber-800 border-amber-200',
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
