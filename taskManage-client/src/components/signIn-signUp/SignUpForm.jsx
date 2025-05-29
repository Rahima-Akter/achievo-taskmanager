import { useContext } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const SignUpForm = () => {
  const navigate = useNavigate();
  const { signup } = useContext(AuthContext);
  const handleSignUp = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const name = e.target.name.value;
    const password = e.target.password.value;
    signup(email, password)
      .then(async (result) => {
        const userData = { email, name, uid: result.user?.uid };
        const { data } = await axios.post(
          `${import.meta.env.VITE_LOCAL_HOST}/users/${email}`,
          userData,{withCredentials: true}
        );
        if (data.insertedId) {
          toast.success("sign-up successfull");
          e.target.reset();
          navigate('/dashboard')
        }
      })
      .catch((err) => {
        console.log(err);
        toast.error("sign-up faild");
      });
  };
  return (
    <form className="space-y-4" onSubmit={handleSignUp}>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Name
        </label>
        <input
          type="text"
          name="name"
          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg 
                focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-blue-600 dark:focus:border-blue-600
                bg-white text-gray-900"
          placeholder="Your Name"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
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
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Password
        </label>
        <input
          type="password"
          name="password"
          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg 
                focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-blue-600 dark:focus:border-blue-600
                bg-white text-gray-900"
          placeholder="password"
          required
        />
      </div>
      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-200"
      >
        Create Account
      </button>
    </form>
  );
};

export default SignUpForm;
