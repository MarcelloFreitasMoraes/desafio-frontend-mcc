import React from "react";
import { UseFormRegisterReturn } from "react-hook-form";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  register?: UseFormRegisterReturn;
  leftIcon?: React.ReactNode; 
  rightIcon?: React.ReactNode; 
}

const Input: React.FC<InputProps> = ({
  label,
  error,
  register,
  className,
  leftIcon,
  rightIcon,
  ...props
}) => {
  return (
    <div className="flex flex-col gap-1">
      <label className="pb-1 text-base text-black font-bold">{label}</label>
      <div className="relative">
        {leftIcon && (
          <button type="submit" className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-500">
            {leftIcon}
          </button>
        )}
        {rightIcon && (
          <button type="submit" className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500">
            {rightIcon}
          </button>
        )}
        <input
          {...register}
          {...props}
          className={`bg-white w-full h-10 p-2 pl-4 pr-4 border-2 border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500 ${className}`}
        />
      </div>
      <div className="h-4">
        {error && <p className="text-sm text-red-400">{error}</p>}
      </div>
    </div>
  );
};

export default Input;
