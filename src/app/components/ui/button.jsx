import React from "react";
import { cn } from "@/lib/utils";

const Button = React.forwardRef(
  (
    {
      children,
      className = "",
      onClick,
      type = "button",
      disabled = false,
      ...props
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        type={type}
        onClick={onClick}
        disabled={disabled}
        className={cn(
          "h-[10%] w-[40%] bg-transparent border-2 border-black rounded-full mt-8 text-black text-xl font-medium hover:bg-black hover:text-white transition-all duration-300 ease-in-out pointer-events-auto z-10",
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

export { Button };
