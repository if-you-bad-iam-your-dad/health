import React, { forwardRef } from "react";
import { LucideIcon } from "lucide-react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  icon?: LucideIcon;
  rightIcon?: React.ReactNode;
  error?: string;
  helperText?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      icon: Icon,
      rightIcon,
      error,
      helperText,
      className = "",
      ...props
    },
    ref
  ) => {
    return (
      <div className="space-y-1">
        <label
          htmlFor={props.id}
          className="block text-sm font-medium text-gray-700"
        >
          {label}
        </label>
        <div className="relative rounded-md shadow-sm">
          {Icon && (
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Icon
                className={`h-5 w-5 ${
                  error ? "text-red-400" : "text-gray-400"
                }`}
              />
            </div>
          )}
          <input
            ref={ref}
            className={`
              ${Icon ? "pl-10" : "pl-3"}
              ${rightIcon ? "pr-10" : "pr-3"}
              block w-full pr-3 py-2 sm:text-sm rounded-md transition-colors duration-200
              ${
                error
                  ? "border-red-300 text-red-900 placeholder-red-300 focus:ring-red-500 focus:border-red-500"
                  : "border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
              }
              ${className}
            `}
            aria-invalid={error ? "true" : "false"}
            aria-describedby={error ? `${props.id}-error` : undefined}
            {...props}
          />
          {rightIcon && (
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
              {rightIcon}
            </div>
          )}
        </div>
        {error && (
          <p
            className="text-sm text-red-600"
            id={`${props.id}-error`}
            role="alert"
          >
            {error}
          </p>
        )}
        {helperText && !error && (
          <p className="text-sm text-gray-500" id={`${props.id}-description`}>
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;
