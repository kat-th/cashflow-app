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
    setEmail("spongebob@aa.io");
    setPassword("$2a$10$RWA3t0FVaTYW1AOKNz5La.3jZDoe0RRqfZ3GFIIrmuNxnjHS0bxu6");
  };

  return (
    <div className="modal-content">
      <h1>Log In</h1>
      <form className="modal-input" onSubmit={(e) => handleSubmit(e)}>
        <label>
          Email
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        {errors.email && <p>{errors.email}</p>}
        <label>
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        {errors.password && <p>{errors.password}</p>}
        <button className="login-button" type="submit">
          Log In
        </button>
        <div className="demo-login-button" onClick={demoLogin}>
          Demo Login
        </div>
      </form>
    </div>
  );
}

export default LoginFormModal;
