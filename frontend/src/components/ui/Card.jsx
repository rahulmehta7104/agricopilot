import { cn } from "../../lib/utils";

export function Card({ className, children, ...props }) {
  return (
    <div 
      className={cn(
        "rounded-[1.5rem] bg-white border border-slate-200 p-6 shadow-sm transition-all",
        "hover:shadow-md",
        "dark:bg-slate-900 dark:border-slate-800",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
