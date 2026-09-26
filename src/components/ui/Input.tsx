import { forwardRef } from "react";
import { cn } from "@/lib/utils";
import type {
  FieldError,
  FieldValues,
  UseFormRegisterReturn,
} from "react-hook-form";

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "name"> {
  readonly label?: string;
  readonly error?: FieldError | string | undefined;
  readonly hint?: string;
  readonly registration?: UseFormRegisterReturn<never>;
  readonly id: string;
  readonly name?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      label,
      error,
      hint,
      registration,
      id,
      name,
      type = "text",
      required,
      disabled,
      "aria-describedby": describedBy,
      ...props
    },
    ref,
  ) => {
    const errorId = `${id}-error`;
    const hintId = `${id}-hint`;
    const hasError = Boolean(error);
    const describedByValue = [
      describedBy,
      hint ? hintId : undefined,
      hasError ? errorId : undefined,
    ]
      .filter(Boolean)
      .join(" ") || undefined;

    const errorMessage =
      typeof error === "string"
        ? error
        : error?.message
          ? String(error.message)
          : undefined;

    return (
      <div className="flex flex-col gap-1.5 w-full">
        {label ? (
          <label
            htmlFor={id}
            className="text-sm font-medium text-foreground/90"
          >
            {label}
            {required ? (
              <span className="text-destructive ml-0.5" aria-hidden="true">
                *
              </span>
            ) : null}
          </label>
        ) : null}
        <input
          id={id}
          ref={ref}
          name={name ?? registration?.name}
          type={type}
          required={required}
          disabled={disabled}
          aria-invalid={hasError || undefined}
          aria-describedby={describedByValue}
          aria-required={required || undefined}
          className={cn(
            "flex h-11 w-full rounded-lg border bg-background px-3.5 py-2 text-sm text-foreground shadow-sm transition-colors duration-150",
            "placeholder:text-muted-foreground/70",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 focus-visible:ring-offset-background",
            "disabled:cursor-not-allowed disabled:opacity-50",
            hasError
              ? "border-destructive focus-visible:ring-destructive"
              : "border-input hover:border-ring/50",
            className,
          )}
          {...registration}
          {...props}
        />
        {hint && !hasError ? (
          <p id={hintId} className="text-xs text-muted-foreground">
            {hint}
          </p>
        ) : null}
        {hasError && errorMessage ? (
          <p
            id={errorId}
            role="alert"
            className="text-xs font-medium text-destructive flex items-start gap-1"
          >
            {errorMessage}
          </p>
        ) : null}
      </div>
    );
  },
);

Input.displayName = "Input";
