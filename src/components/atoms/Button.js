"use client";
import "bootstrap/dist/css/bootstrap.css";
const ButtonAtom = ({ label, type }) => {
  return (
    <button className="btn primary-btn" type={type}>
      {label}
    </button>
  );
};

export default ButtonAtom;
