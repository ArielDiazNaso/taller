import {
  Children,
  cloneElement,
  forwardRef,
  isValidElement,
  useMemo,
  type ReactElement,
} from "react";
import { Loader2, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "secondary" | "outline" | "ghost" | "destructive";
type ButtonSize = "sm" | "md" | "lg" | "icon";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  readonly variant?: ButtonVariant;
  readonly size?: ButtonSize;
  readonly loading?: boolean;
  readonly leftIcon?: LucideIcon;
  readonly rightIcon?: LucideIcon;
  readonly asChild?: boolean;
}

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-primary text-primary-foreground shadow-sm hover:bg-primary/90 active:bg-primary/95 focus-visible:ring-primary",
  secondary:
    "bg-secondary text-secondary-foreground hover:bg-secondary/80 active:bg-secondary/90",
  outline:
    "border border-border bg-transparent text-foreground hover:bg-accent/10 hover:border-accent/50",
  ghost:
    "bg-transparent text-foreground hover:bg-muted text-foreground/90 hover:text-foreground",
  destructive:
    "bg-destructive text-destructive-foreground hover:bg-destructive/90 active:bg-destructive/95",
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "h-9 px-3 text-sm gap-1.5 rounded-md",
  md: "h-11 px-5 text-sm gap-2 rounded-lg",
  lg: "h-12 px-7 text-base gap-2 rounded-xl",
  icon: "h-11 w-11 p-0",
};

const baseClasses =
  "relative inline-flex items-center justify-center whitespace-nowrap font-medium transition-all duration-200 ease-out disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98] select-none";

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      loading = false,
      disabled,
      leftIcon: LeftIcon,
      rightIcon: RightIcon,
      type = "button",
      asChild = false,
      children,
      "aria-disabled": ariaDisabledProp,
      onClick,
      ...props
    },
    ref,
  ) => {
    const isDisabled = loading || disabled;
    const ariaDisabled = ariaDisabledProp ?? isDisabled;

    const composedClasses = useMemo(
      () =>
        cn(
          baseClasses,
          variantClasses[variant],
          sizeClasses[size],
          className,
        ),
      [variant, size, className],
    );

    const content = useMemo(() => {
      if (loading) {
        return (
          <>
            <Loader2 className="h-4 w-4 animate-spin shrink-0" aria-hidden="true" />
            <span className="opacity-70">{children}</span>
          </>
        );
      }
      return (
        <>
          {LeftIcon ? <LeftIcon className="h-4 w-4 shrink-0" aria-hidden="true" /> : null}
          {children}
          {RightIcon ? <RightIcon className="h-4 w-4 shrink-0" aria-hidden="true" /> : null}
        </>
      );
    }, [loading, children, LeftIcon, RightIcon]);

    if (asChild) {
      const onlyChild = Children.only(children) as ReactElement | null | undefined;
      if (isValidElement<{
        className?: string;
        "aria-disabled"?: boolean | "true" | "false";
        onClick?: React.MouseEventHandler<unknown>;
        ref?: React.Ref<unknown>;
      }>(onlyChild)) {
        return cloneElement(onlyChild, {
          className: cn(
            onlyChild.props.className,
            composedClasses,
            isDisabled ? "pointer-events-none opacity-50" : undefined,
          ),
          "aria-disabled": ariaDisabled,
          onClick: (event: React.MouseEvent<unknown>) => {
            if (isDisabled) {
              event.preventDefault();
              event.stopPropagation();
              return;
            }
            onlyChild.props.onClick?.(event);
            onClick?.(event as React.MouseEvent<HTMLButtonElement>);
          },
          ref,
        });
      }
      return null;
    }

    return (
      <button
        ref={ref}
        type={type}
        disabled={isDisabled}
        aria-disabled={ariaDisabled}
        onClick={isDisabled ? undefined : onClick}
        className={composedClasses}
        {...props}
      >
        {content}
      </button>
    );
  },
);

Button.displayName = "Button";
