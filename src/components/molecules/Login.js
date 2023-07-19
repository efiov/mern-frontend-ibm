"use client";

import ButtonAtom from "../atoms/Button";
import InputAtom from "../atoms/Input";
import "bootstrap/dist/css/bootstrap.css";
import { useRouter } from "next/navigation";
import { useSession, signIn, getSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { FiAtSign } from "react-icons/fi";
import { AiOutlineEyeInvisible } from "react-icons/ai";
import { AiOutlineEye } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { toast } from "react-hot-toast";
import { VscGithubInverted } from "react-icons/vsc";

export default function LoginForm() {
  const session = useSession();
  const router = useRouter();
  const [passwordShown, setPasswordShown] = useState(false);
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const togglePassword = () => setPasswordShown(!passwordShown);
  useEffect(() => {
    if (session?.status === "authenticated") {
      router.push("/dashboard");
    }
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    signIn("credentials", { ...data, redirect: false }).then((callback) => {
      if (callback?.error) {
        toast.error(callback.error);
      }

      if (callback?.ok && !callback?.error) {
        toast.success("Logged in successfully!");
        router.push("/dashboard");
      }
    });
  };

  return (
    <div className="col-sm-7 bg-color align-self-center">
      <div className="form-section">
        <div className="title"></div>
        <h3>Login into your account</h3>
        <div className="register-inner-form"></div>
        <form onSubmit={handleSubmit}>
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
          <div className="form-group">
            <ButtonAtom label="Login" type={"submit"} />
          </div>
        </form>
      </div>
      <div className="auth">
        <i
          className="google-icon"
          onClick={() =>
            signIn("google", {
              callbackUrl: `${window.location.origin}/dashboard`,
            })
          }
        >
          <FcGoogle />
        </i>
        <i
          className="google-icon"
          onClick={() =>
            signIn("github", {
              callbackUrl: `${window.location.origin}/dashboard`,
            })
          }
        >
          <VscGithubInverted />
        </i>
      </div>
    </div>
  );
}
