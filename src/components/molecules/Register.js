import ButtonAtom from "../atoms/Button";
import { FiEdit } from "react-icons/fi";
import { FiAtSign } from "react-icons/fi";
import { AiOutlineEyeInvisible } from "react-icons/ai";
import { AiOutlineEye } from "react-icons/ai";
import InputAtom from "../atoms/Input";
import "bootstrap/dist/css/bootstrap.css";
import { useRouter } from "next/navigation";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";

export default function RegisterForm() {
  const router = useRouter();
  const [passwordShown, setPasswordShown] = useState(false);
  const [repass, setRepass] = useState("");
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const email = (email) =>
    /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email);
  const validPassword = (pass, re) => pass === re;
  const togglePassword = () => setPasswordShown(!passwordShown);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email(data.email)) {
      toast.error("Wrong email!");
    } else if (!validPassword(data.password, repass)) {
      toast.error("Passwords do not match!");
    } else {
      axios
        .post("/api/register", data)
        .then(() => {
          toast.success("User has been registered!");
          router.push("/");
        })
        .catch(() => toast.error("Something went wrong!"));
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
            <InputAtom
              id="name"
              placeholder="Name"
              value={data.name}
              onChange={(e) => setData({ ...data, name: e.target.value })}
            />
            <i className="icon">
              {" "}
              <FiEdit />{" "}
            </i>
          </div>
          <div className="form-group form-box">
            <InputAtom
              id="email"
              name="email"
              placeholder="Email"
              value={data.email}
              onChange={(e) => setData({ ...data, email: e.target.value })}
            />
            <i className="icon">
              {" "}
              <FiAtSign />{" "}
            </i>
          </div>
          <div className="form-group form-box">
            <InputAtom
              id="password"
              name="password"
              type={passwordShown ? "text" : "password"}
              placeholder="Password"
              value={data.password}
              onChange={(e) => setData({ ...data, password: e.target.value })}
            />
            {passwordShown && (
              <i className="icon" onClick={(e) => togglePassword()}>
                {" "}
                <AiOutlineEye />{" "}
              </i>
            )}
            {!passwordShown && (
              <i className="icon" onClick={(e) => togglePassword()}>
                {" "}
                <AiOutlineEyeInvisible />{" "}
              </i>
            )}
          </div>
          <div className="form-group form-box">
            <InputAtom
              id="repassword"
              name="repassword"
              type={passwordShown ? "text" : "password"}
              placeholder="Password"
              value={repass}
              onChange={(e) => setRepass(e.target.value)}
            />
            {passwordShown && (
              <i className="icon" onClick={(e) => togglePassword()}>
                {" "}
                <AiOutlineEye />{" "}
              </i>
            )}
            {!passwordShown && (
              <i className="icon" onClick={(e) => togglePassword()}>
                {" "}
                <AiOutlineEyeInvisible />{" "}
              </i>
            )}
          </div>
          <div className="form-group">
            <ButtonAtom label="Register" type={"submit"} />
          </div>
        </form>
      </div>
    </div>
  );
}
