"use client";

const InputAtom = ({ id, name, type, label, placeholder, value, onChange}) => {
  return (
    <input
      label={label}
      id={id}
      name={name}
      type={type}
      className="input-text"
      value={value}
      placeholder={placeholder}
      required
      onChange = {onChange}
    />
  );
};

export default InputAtom;
