import React, { forwardRef } from "react";

interface ComponentInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

const ComponentInput = forwardRef<HTMLInputElement, ComponentInputProps>(
  ({ label, error, ...props }, ref) => {
    return (
      <div>
        <label htmlFor={props.id} className="block text-sm font-semibold leading-6 text-gray-900">
          {label}
        </label>
        <div className="mt-2.5">
          <input
            ref={ref}
            {...props}
            className={`block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ${
              error ? "ring-red-500" : "ring-gray-300"
            } placeholder:text-gray-400 focus:ring-2 focus:ring-inset ${
              error ? "focus:ring-red-500" : "focus:ring-indigo-600"
            } sm:text-sm sm:leading-6`}
          />
        </div>
        {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
      </div>
    );
  }
);

ComponentInput.displayName = "ComponentInput";

export default ComponentInput;
