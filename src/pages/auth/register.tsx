import { useAuthViewModal } from "./authViewModal";
import AuthWrapper from "./authWrapper";

const Register = () => {
  const {
    goToLogin,
    handleRegister,
    handleRegisterFormChange,
    registerFormData,
    setreferralCode,
    referralCode,
  } = useAuthViewModal();
  return (
    <AuthWrapper>
      <div className="fullWidth">
        <h1>Register</h1>

        <form onSubmit={handleRegister}>
          <div>
            <p className="topLabel">First Name*</p>
            <input
              className="inputField"
              type="text"
              name="firstname"
              value={registerFormData.firstname}
              onChange={handleRegisterFormChange}
              placeholder="First Name"
            />
          </div>
          <div>
            <p className="topLabel">Last Name*</p>
            <input
              className="inputField"
              type="text"
              name="lastname"
              value={registerFormData.lastname}
              onChange={handleRegisterFormChange}
              placeholder="Last Name"
            />
          </div>
          <div>
            <p className="topLabel">Email*</p>
            <input
              className="inputField"
              type="email"
              name="email"
              value={registerFormData.email}
              onChange={handleRegisterFormChange}
              placeholder="Email"
            />
          </div>

          <div>
            <p className="topLabel">Password*</p>
            <input
              className="inputField"
              type="password"
              name="password"
              value={registerFormData.password}
              onChange={handleRegisterFormChange}
              placeholder="Password"
            />
          </div>
          <div>
            <p className="topLabel">Referral Code</p>
            <input
              className="inputField"
              value={referralCode}
              onChange={(e) => setreferralCode(e.target.value)}
              placeholder="Referral code"
            />
          </div>
          <button type="submit" className="successButton">
            Register
          </button>
        </form>
        <p className="bottomText">
          Already registered?{" "}
          <b className="pointer" onClick={goToLogin}>
            Login
          </b>
        </p>
      </div>
    </AuthWrapper>
  );
};

export default Register;
