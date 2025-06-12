import React, { useState, useRef } from "react";

type InputOTPProps = {
  maxLength: number;
  onComplete?: (otp: string) => void;
  className?: string;
  inputStyle?: string;
};

const InputOTP: React.FC<InputOTPProps> = ({
  maxLength = 6,
  onComplete,
  className,
  inputStyle,
}) => {
  const [otpValues, setOtpValues] = useState<string[]>(
    Array(maxLength).fill("")
  );
  const inputRefs = useRef<HTMLInputElement[]>([]);

  const handleChange = (index: number, value: string) => {
    if (/^\d?$/.test(value)) {
      const newValues = [...otpValues];
      newValues[index] = value;
      setOtpValues(newValues);

      if (newValues.join("").length === maxLength) {
        onComplete?.(newValues.join(""));
      }

      if (value && index < maxLength - 1) {
        inputRefs.current[index + 1]?.focus();
      }
    }
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Backspace" && !otpValues[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  return (
    <div className={` ${className}`}>
      {otpValues.map((val, index) => (
        <input
          key={index}
          ref={(el) => {
            if (el) {
              inputRefs.current[index] = el;
            }
          }}
          type="text"
          maxLength={1}
          value={val}
          onChange={(e) => handleChange(index, e.target.value)}
          onKeyDown={(e) => handleKeyDown(index, e)}
          className={`${inputStyle}`}
        />
      ))}
    </div>
  );
};

export default InputOTP;
