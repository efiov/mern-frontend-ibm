import ButtonAtom from "../atoms/Button";
import { FiEdit } from "react-icons/fi";
import InputAtom from "../atoms/Input";
const RegisterForm = (props) => {
  return (
    <div className="col-sm-7 bg-color align-self-center">
      <div className="form-section">
        <div className="title"></div>
        <h3>Create a new account</h3>
        <div className="register-inner-form"></div>
        <form method="GET">
          <div className="form-group form-box">
            <InputAtom id="name" placeholder="Name" />
            <i className="icon">
              {" "}
              <FiEdit />{" "}
            </i>
          </div>
          <div className="form-group form-box">
            <InputAtom id="email" placeholder="Email" />
          </div>
          <div className="form-group form-box">
            <InputAtom id="password" placeholder="Password" />
          </div>

          <div className="form-group">
            <ButtonAtom label="Register" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterForm;
