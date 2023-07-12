"use client";

const InputAtom = ({ id, name, type, label, placeholder }) => {
  return (
    <input
      label={label}
      id={id}
      name={name}
      type={type}
      className="input-text"
      placeholder={placeholder}
      required
    />
  );
};

export default InputAtom;
