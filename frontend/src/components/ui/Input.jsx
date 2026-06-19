import { cn } from "../../lib/utils";

export function Input({ 
  label, 
  error, 
  className, 
  id, 
  ...props 
}) {
  return (
    <div className="w-full">
      {label && (
        <label 
          htmlFor={id} 
          className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5"
        >
          {label}
        </label>
      )}
      <input
        id={id}
        className={cn(
          "w-full rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm transition-colors",
          "placeholder:text-slate-400 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20",
          "dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:placeholder:text-slate-500",
          error && "border-red-500 focus:border-red-500 focus:ring-red-500/20 dark:border-red-500",
          className
        )}
        {...props}
      />
      {error && (
        <p className="mt-1.5 text-sm text-red-500 dark:text-red-400">{error}</p>
      )}
    </div>
  );
}
