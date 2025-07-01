import { useState } from "react";
import { thunkLogin } from "../../redux/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./LoginForm.css";
import { AnyAction } from "redux";
interface IErrors {
  email: string;
  password: string;
}

function LoginFormModal(): JSX.Element {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<IErrors | AnyAction>({
    email: "",
    password: "",
  });
  const { closeModal } = useModal();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const serverResponse = await dispatch(
      thunkLogin({
        email,
        password,
      })
    );

    if (serverResponse.ok) {
      closeModal();
    } else {
      setErrors(serverResponse);
    }
  };

  const demoLogin = () => {
    setEmail("demo@user.io");
    setPassword("password");
  };

  return (
    <div className="container">
      {/* <div className="card"> */}
      <div className="header">
        <h2 className="title">Cash Flow</h2>
        <p className="subtitle">Find your perfect investment deal</p>
      </div>
      <form className="login-inputs" onSubmit={(e) => handleSubmit(e)}>
        <label>
          <input
            type="text"
            id="emailInput"
            placeholder="Email or Username"
            className="input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        {errors.email && <p>{errors.email}</p>}
        <label>
          <input
            type="password"
            id="passwordInput"
            placeholder="Password"
            className="input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        {errors.password && <p>{errors.password}</p>}
        <button className="login-button" type="submit">
          Sign In
        </button>
        <div className="demo-login-button" onClick={demoLogin}>
          Admin Login
        </div>
      </form>
      {/* </div> */}
    </div>
  );
}

export default LoginFormModal;
