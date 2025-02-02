import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../enums/routes";
import { ToastMessage } from "../../enums/toast";
import { AuthRepo } from "../../repositories/auth";
import { LocalStorageKey } from "../../enums/localStroage";
import { IUser } from "../../utils/types/user";

export const useAuthViewModal = () => {
  const [registerFormData, setRegisterFormData] = useState({
    email: "",
    password: "",
    firstname: "",
    lastname: "",
  });
  const [loginFormData, setLoginFormData] = useState({
    email: "",
    password: "",
  });
  const [referralCode, setreferralCode] = useState("");

  const navigate = useNavigate();
  const handleRegisterFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setRegisterFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (
      !registerFormData.email.trim() ||
      !registerFormData.firstname.trim() ||
      !registerFormData.lastname.trim() ||
      !registerFormData.password.trim()
    ) {
      return toast.error(ToastMessage.requiredField);
    }

    try {
      const payload = {
        name: {
          first: registerFormData.firstname,
          last: registerFormData.lastname,
        },
        email: registerFormData.email,
        password: registerFormData.password,
        isAdmin: referralCode === "MariyaGreat" ? true : false,
      };
      const response = await AuthRepo.register(payload);
      if (response.success) {
        localStorage.setItem(
          LocalStorageKey.USER,
          JSON.stringify(response.data.user)
        );
        navigate(ROUTES.Home);
        return toast.success(ToastMessage.loginSuccess);
      }
    } catch (error: Error | any) {
      return toast.error(error.message);
    }
  };
  const goToLogin = () => {
    navigate(ROUTES.Login);
  };

  const handleLoginFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setLoginFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const user: IUser = JSON.parse(localStorage.getItem(LocalStorageKey.USER)!);

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!loginFormData.email.trim() || !loginFormData.password.trim()) {
      return toast.error(ToastMessage.requiredField);
    }

    try {
      const response = await AuthRepo.login({
        email: loginFormData.email,
        password: loginFormData.password,
      });
      if (response.success) {
        localStorage.setItem(
          LocalStorageKey.USER,
          JSON.stringify(response.data.user)
        );
        navigate(ROUTES.Home);
        return toast.success(ToastMessage.loginSuccess);
      }
    } catch (error: Error | any) {
      return toast.error(error.message);
    }
  };

  const goToRegister = () => {
    navigate(ROUTES.Register);
  };
  const goToHome = () => {
    navigate(ROUTES.Home);
  };
  const handleLogout = () => {
    navigate(ROUTES.Login);
    localStorage.removeItem(LocalStorageKey.USER);
    return toast.success(ToastMessage.logoutSuccess);
  };

  return {
    goToLogin,
    handleRegister,
    handleRegisterFormChange,
    registerFormData,
    goToRegister,
    handleLogin,
    handleLoginFormChange,
    loginFormData,
    handleLogout,
    goToHome,
    user,
    setreferralCode,
    referralCode,
  };
};
