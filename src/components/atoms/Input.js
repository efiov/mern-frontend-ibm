"use client";

const InputAtom = ({ id, name, type, label, placeholder, onChange }) => {
  return (
    <input
      label={label}
      id={id}
      name={name}
      type={type}
      className="input-text"
      placeholder={placeholder}
      onChange={(e) => onChange(e.target.value)}
      required
    />
  );
};

export default InputAtom;
