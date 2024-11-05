import React from "react";
import GradientText from "./GradientText";

const Input = ({ id, name, placeholder, value, onChange, readOnly, label }) => {
  return (
    <div>
      {label && (
        <label htmlFor={id} >
          <GradientText className={'font-medium text-lg'}>{label}</GradientText>
        </label>
      )}

      <input
        type={name == "password" ? "password" : "text"}
        id={id}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        readOnly={readOnly}
        className="lg:text-xl bg-transparent border-b border-b-[#1c222e] text-white w-full p-2"
      />
    </div>
  );
};

export default Input;
