import React, { FormEvent } from "react";

interface InputFieldProps {
  label: string;
  type: string;
  name: string;
  onChange?: (e: FormEvent) => void;
  onBlur?: () => void;
  value: string;
  className?: string;
  error?: string;
  rest?: any;
}

const InputField = ({
  label,
  name,
  onChange,
  type,
  className,
  onBlur,
  value,
  error,
  rest,
}: InputFieldProps) => {
  return (
    <div className="flex flex-col w-full">
      <div>
        <span className="text-lg font-medium">{label}</span>
      </div>
      <div>
        <input
          name={name}
          value={value}
          className={`block w-full rounded-md border  py-1.5 text-gray-900 shadow-sm  placeholder:text-gray-400  sm:text-sm sm:leading-6 outline-none invalid:border-red-500 ${
            error?.length ? "border-red-500" : ""
          }`}
          type={type}
          onChange={onChange}
          {...rest}
        />
      </div>
      <div>
        <span className="text-red-500">{error}</span>
      </div>
    </div>
  );
};

export default InputField;
