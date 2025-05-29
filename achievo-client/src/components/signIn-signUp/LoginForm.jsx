import { useState } from "react";
import SignInForm from "./SignInForm";
import SignUpForm from "./SignUpForm";
import GoogleSignInButton from "./GoogleSignInButton";
import logo from "../../assets/achieveoDark.png";
import logo2 from "../../assets/achievoLight.png";
import { useTheme } from "../../context/themeContext/ThemeProvider";
import { Link } from "react-router-dom";

const LoginForm = () => {
  const [activeTab, setActiveTab] = useState("signin");
  const { theme } = useTheme();

  return (
    <div className="w-full max-w-md mx-auto md:my-10 bg-white rounded-xl shadow-md p-8">
      {/* Logo */}
      <Link to="/" className="text-center">
        <img
          src={theme === "light" ? logo : logo2}
          alt="Achievo logo"
          className="w-36 mx-auto"
        />
        <p className="text-gray-500 mt-2 mb-4">
          Track your goals, boost productivity
        </p>
      </Link>

      {/* Tabs */}
      <div className="flex border-b mb-6">
        <button
          className={`flex-1 py-2 font-medium ${
            activeTab === "signin"
              ? "text-blue-600 border-b-2 border-blue-600"
              : "text-gray-500"
          }`}
          onClick={() => setActiveTab("signin")}
        >
          Sign In
        </button>
        <button
          className={`flex-1 py-2 font-medium ${
            activeTab === "signup"
              ? "text-blue-600 border-b-2 border-blue-600"
              : "text-gray-500"
          }`}
          onClick={() => setActiveTab("signup")}
        >
          Sign Up
        </button>
      </div>

      {/* Forms */}
      {activeTab === "signin" ? <SignInForm /> : <SignUpForm />}

      {/* border */}
      <div className="flex items-center my-6">
        <div className="flex-grow border-t border-gray-300"></div>
        <span className="mx-4 text-gray-500">or</span>
        <div className="flex-grow border-t border-gray-300"></div>
      </div>

      {/* Google signin button */}
      <GoogleSignInButton />
    </div>
  );
};
export default LoginForm;
