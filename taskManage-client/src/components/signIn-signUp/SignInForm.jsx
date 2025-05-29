import { useContext } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const SignInForm = () => {
  const navigate = useNavigate();
  const { signin } = useContext(AuthContext);
  const handleSignIn = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    signin(email, password)
      .then(() => {
        toast.success("sign-in successfull");
        e.target.reset();
        navigate("/dashboard");
      })
      .catch((err) => {
        console.log(err);
        toast.error("sign-in faild!");
      });
  };

  return (
    <form className="space-y-4" onSubmit={handleSignIn}>
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Email
        </label>
        <input
          type="email"
          name="email"
          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg 
                focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-blue-600 dark:focus:border-blue-600
                bg-white text-gray-900"
          placeholder="your@email.com"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Password
        </label>
        <input
          type="password"
          id="password"
          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg 
                focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-blue-600 dark:focus:border-blue-600
                bg-white text-gray-900"
          placeholder="password"
          required
        />
      </div>
      <button
        type="submit"
        className="w-full bg-blue-600 dark:bg-blue-700 text-white py-2 px-4 rounded-lg 
              hover:bg-blue-700 dark:hover:bg-blue-800 transition duration-200"
      >
        Sign In
      </button>
    </form>
  );
};

export default SignInForm;
