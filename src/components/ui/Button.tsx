import { ButtonHTMLAttributes } from "react";
import { cn } from "../../utils/cn";

type Variant = "primary" | "secondary" | "outline" | "ghost" | "danger";
type Size = "sm" | "md" | "lg" | "xl";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  full?: boolean;
  loading?: boolean;
}

const base = "inline-flex items-center justify-center font-semibold rounded-xl transition-all duration-150 active:scale-[0.98] disabled:opacity-60 disabled:pointer-events-none focus:outline-none focus:ring-2 focus:ring-offset-2";

const variants: Record<Variant, string> = {
  primary: "bg-amber-500 text-black hover:bg-amber-400 focus:ring-amber-400 shadow-lg shadow-amber-500/20",
  secondary: "bg-zinc-900 text-white hover:bg-zinc-800 focus:ring-zinc-700",
  outline: "border-2 border-zinc-300 text-zinc-900 hover:bg-zinc-50 focus:ring-zinc-400",
  ghost: "text-zinc-700 hover:bg-zinc-100 focus:ring-zinc-300",
  danger: "bg-red-600 text-white hover:bg-red-500 focus:ring-red-500"
};

const sizes: Record<Size, string> = {
  sm: "text-sm px-3 py-2",
  md: "text-base px-4 py-2.5",
  lg: "text-lg px-6 py-3",
  xl: "text-xl px-8 py-4"
};

export default function Button({ 
  variant="primary", 
  size="lg", 
  full=false, 
  loading=false, 
  className, 
  children, 
  ...props 
}: Props) {
  return (
    <button
      className={cn(
        base,
        variants[variant],
        sizes[size],
        full && "w-full",
        className
      )}
      disabled={loading || props.disabled}
      {...props}
    >
      {loading ? (
        <span className="inline-flex items-center gap-2">
          <svg className="h-5 w-5 animate-spin" viewBox="0 0 24 24" fill="none">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 00-8 8h4z"/>
          </svg>
          Processing...
        </span>
      ) : children}
    </button>
  );
}
