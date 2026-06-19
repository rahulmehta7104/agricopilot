import { cn } from "../../lib/utils";

export function Loader({ className }) {
  return (
    <div className={cn("flex items-center justify-center", className)}>
      <div className="h-6 w-6 animate-spin rounded-full border-2 border-emerald-500 border-t-transparent"></div>
    </div>
  );
}

export function Skeleton({ className, ...props }) {
  return (
    <div 
      className={cn("animate-pulse rounded-xl bg-slate-200 dark:bg-slate-800", className)} 
      {...props} 
    />
  );
}
