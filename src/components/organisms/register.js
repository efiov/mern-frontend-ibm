import ButtonAtom from "../atoms/Button";
import { FiEdit } from "react-icons/fi";
import InputAtom from "../atoms/Input";
import "bootstrap/dist/css/bootstrap.css";

export default function RegisterFormForm() {
  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = {
      name: event.target.name.value,
      email: event.target.email.value,
      password: event.target.password.value,
    };
    const JSONdata = JSON.stringify(data);
    const endpoint = "http://localhost:3001/register";
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSONdata,
    };
    const response = await fetch(endpoint, options);
    const result = await response.json();
    console.log(result);
  };
  return (
    <div className="col-sm-7 bg-color align-self-center">
      <div className="form-section">
        <div className="title"></div>
        <h3>Create a new account</h3>
        <div className="register-inner-form"></div>
        <form onSubmit={handleSubmit}>
          <div className="form-group form-box">
            <InputAtom id="name" placeholder="Name" />
            <i className="icon">
              {" "}
              <FiEdit />{" "}
            </i>
          </div>
          <div className="form-group form-box">
            <InputAtom id="email" name="email" placeholder="Email" />
          </div>
          <div className="form-group form-box">
            <InputAtom
              id="password"
              name="password"
              type="password"
              placeholder="Password"
            />
          </div>

          <div className="form-group">
            <ButtonAtom label="Register" type={"submit"} />
          </div>
        </form>
      </div>
    </div>
  );
}
