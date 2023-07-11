"use client";

const InputAtom = ({ id, placeholder }) => {
  return (
    <input
      type="text"
      id={id}
      className="input-text"
      placeholder={placeholder}
    />
  );
};

export default InputAtom;
