import React from "react";
import { UseFormRegisterReturn } from "react-hook-form";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  register?: UseFormRegisterReturn; 
}

const Input: React.FC<InputProps> = ({ label, error, register, className, ...props }) => {
  return (
    <div className="flex flex-col gap-1">
      <label className="pb-1 text-base text-black font-bold">{label}</label>
      <input
        {...register} 
        {...props} 
        className={`w-full h-8 p-2 border-2 border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500 ${className}`}
      />
      <div className="h-4">
      {error && <p className="text-sm text-red-400">{error}</p>}
      </div>
    </div>
  );
};

export default Input;
