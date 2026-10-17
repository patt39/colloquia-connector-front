import { Spinner } from '@/components/ui/spinner';
import { cn } from '@/lib/utils';

const LoadingFile = ({ className }: { className?: string }) => {
  return (
    <div
      className={cn(
        'inset-x-0 top-0 m-8 grid place-items-center items-center justify-center py-4',
        className,
      )}
    >
      <Spinner className="size-8 text-blue-500" />
    </div>
  );
};

export { LoadingFile };
