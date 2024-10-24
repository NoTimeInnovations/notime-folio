import React from 'react';

const Input = ({ id, name, placeholder, value, onChange , readOnly }) => {
  return (
    <input
      type={name == "password" ? 'password' : 'text'}
      id={id}
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      readOnly={readOnly}
      className="lg:text-xl bg-transparent border-b border-b-[#1c222e] text-white w-full p-2"
    />
  );
};

export default Input;
