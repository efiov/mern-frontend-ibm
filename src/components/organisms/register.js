import ButtonAtom from "../atoms/Button";
import { FiEdit } from "react-icons/fi";
import InputAtom from "../atoms/Input";
import "bootstrap/dist/css/bootstrap.css";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function RegisterForm() {
  const router = useRouter();
  const handleSubmit = async (event) => {
    event.preventDefault();
    const name = event.target.name.value;
    const email = event.target.email.value;
    const password = event.target.password.value;
    try {
      const response = await axios.post("http://localhost:3001/register", {
        name: name,
        email: email,
        password: password,
      });
      router.push("/login");
    } catch (error) {
      console.error(error);
    }
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
