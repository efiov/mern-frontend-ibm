'use client'
import 'bootstrap/dist/css/bootstrap.css'
const ButtonAtom = ({ label, type, onClick }) => {
  return (
    <button className="btn primary-btn" type={type} onClick={onClick}>
      {label}
    </button>
  )
}

export default ButtonAtom
