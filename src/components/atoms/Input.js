"use client";

const InputAtom = ({
  id,
  name,
  type,
  label,
  placeholder,
  value,
  onChange,
  variant,
}) => {
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
      onChange={onChange}
      variant={variant}
    />
  );
};

export default InputAtom;
