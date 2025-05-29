import { useContext } from "react";
import toast from "react-hot-toast";
import { AuthContext } from "../../providers/AuthProvider";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaGoogle } from "react-icons/fa";

const GoogleSignInButton = () => {
  const { signInWithGoogle, logOut } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithGoogle();
      const { email, displayName, uid, photoURL } = result.user;

      // Create JWT token
      const tokenResponse = await axios.post(
        `${import.meta.env.VITE_LOCAL_HOST}/jwt`,
        { email },
        { withCredentials: true }
      );

      const userData = {
        email,
        name: displayName,
        id: uid,
        photo: photoURL || null,
      };

      const { data: user } = await axios.post(
        `${import.meta.env.VITE_LOCAL_HOST}/users/${email}`,
        userData,
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${tokenResponse.data.token}`,
            "Content-Type": "application/json",
          },
        }
      );

      toast.success(`Welcome ${user.name || "User"}!`);
      navigate("/dashboard");
    } catch (error) {
      console.error("Sign-in error:", error);
      toast.error("Sign-in failed. Please try again.");
      await logOut();
      navigate('/')
    }
  };

  return (
    <button
      onClick={handleGoogleSignIn}
      className="flex items-center justify-center gap-2 bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 md:px-5 md:py-2.5 px-2 py-1.5 text-xs md:font-bold md:text-sm rounded-lg shadow-lg hover:shadow-purple-500/20 transition-all w-full font-bold text-white"
    >
      <FaGoogle />
      <span>Sign-in with Google</span>
    </button>
  );
};

export default GoogleSignInButton;
