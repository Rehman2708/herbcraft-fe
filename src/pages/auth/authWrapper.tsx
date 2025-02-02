import React from "react";
import "./style.scss";
import LogoText from "../../components/logo";
const AuthWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="authContainer">
      <div className="center leftDiv">
        <LogoText size={60} />
      </div>
      <div className="center rightDiv">{children}</div>
    </div>
  );
};

export default AuthWrapper;
