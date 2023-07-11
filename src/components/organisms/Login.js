import ButtonAtom from "../atoms/Button";
import InputAtom from "../atoms/Input";
const LoginForm = (props) => {
  return (
    <div className="col-sm-7 bg-color align-self-center">
      <div className="form-section">
        <div className="title"></div>
        <h3>Login into your account</h3>
        <div className="register-inner-form"></div>
        <form method="GET">
          <div className="form-group form-box">
            <InputAtom id="email" placeholder="Email" />
          </div>
          <div className="form-group form-box">
            <InputAtom id="password" placeholder="Password" />
          </div>

          <div className="form-group">
            <ButtonAtom label="Login" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
