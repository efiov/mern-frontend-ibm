"use client";

const InputAtom = ({ id, name, type, label, placeholder, onChange, value }) => {
  return (
    <input
      label={label}
      value={value}
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
