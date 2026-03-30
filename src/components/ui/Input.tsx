import { InputHTMLAttributes, forwardRef } from "react";
import { cn } from "../../utils/cn";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

const Input = forwardRef<HTMLInputElement, Props>(function Input({ label, error, className, ...props }, ref) {
  return (
    <label className="block">
      {label && <span className="block text-sm font-semibold text-zinc-800 mb-2">{label}</span>}
      <input
        ref={ref}
        className={cn(
          "w-full rounded-xl border-2 border-zinc-300 bg-white px-4 py-3 text-base font-medium text-zinc-900 placeholder-zinc-400",
          "focus:outline-none focus:border-amber-500 focus:ring-4 focus:ring-amber-500/10 transition",
          error && "border-red-500 focus:border-red-500 focus:ring-red-500/10",
          className
        )}
        {...props}
      />
      {error && <p className="mt-2 text-sm font-medium text-red-600">{error}</p>}
    </label>
  );
});

export default Input;
