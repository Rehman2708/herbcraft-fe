import { useAuthViewModal } from "./authViewModal";
import AuthWrapper from "./authWrapper";

const Login = () => {
  const { goToRegister, handleLogin, handleLoginFormChange, loginFormData } =
    useAuthViewModal();

  return (
    <AuthWrapper>
      <div className="fullWidth">
        <h1>Login</h1>
        <form onSubmit={handleLogin}>
          <div>
            <p className="topLabel">Email*</p>
            <input
              className="inputField"
              type="email"
              name="email"
              value={loginFormData.email}
              onChange={handleLoginFormChange}
              placeholder="Email"
            />
          </div>

          <div>
            <p className="topLabel">Password*</p>
            <input
              className="inputField"
              type="password"
              name="password"
              value={loginFormData.password}
              onChange={handleLoginFormChange}
              placeholder="Password"
            />
          </div>

          <button type="submit" className="successButton w-full">
            Login
          </button>
        </form>
        <p className="bottomText">
          Don't have an account?{" "}
          <b className="pointer" onClick={goToRegister}>
            Register
          </b>
        </p>
      </div>
    </AuthWrapper>
  );
};

export default Login;
