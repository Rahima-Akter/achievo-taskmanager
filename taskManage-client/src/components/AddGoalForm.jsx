import { useState } from "react";
import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const AddGoalForm = () => {
  const { user } = useContext(AuthContext);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("weekly");
  const [target, setTarget] = useState(1);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const goalData = { title, category, target: Number(target), completed: 0 };
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_LOCAL_HOST}/goal/${user?.email}`,
        goalData,
        { withCredentials: true }
      );
      if (data._id) {
        toast.success("goal added");
        navigate("/dashboard");
      }
    } catch (error) {
      console.log(error);
      toast.error("faild to add goal");
    }
    setTitle("");
    setTarget("");
  };

  return (
    <div className="w-full max-w-2xl mx-auto bg-[#eaeadd]/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-3xl p-8 shadow-xl border border-white/20 dark:border-gray-700/50 overflow-hidden relative">
      {/* Decorations */}
      <div className="absolute -top-20 -right-20 w-40 h-40 bg-amber-400/30 rounded-full filter blur-3xl"></div>
      <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-rose-400/20 rounded-full filter blur-3xl"></div>

      <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-8 text-center relative">
        <span className="relative z-10">Add New Goal</span>
        <span className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-1/4 h-0.5 bg-gradient-to-r from-amber-500 to-rose-500 rounded-full"></span>
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
        {/* Title */}
        <div className="group">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 transition-all duration-300 group-focus-within:text-amber-500">
            Goal Title
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="w-full px-5 py-3 bg-white/90 dark:bg-gray-700/70 border-2 border-gray-200/80 dark:border-gray-600/50 rounded-xl focus:border-amber-500 focus:ring-0 focus:shadow-lg focus:shadow-amber-500/20 dark:focus:shadow-amber-500/10 text-gray-800 dark:text-white transition-all duration-300 font-semibold"
            placeholder="Enter goal title, ** for currency add $ (e.g - $500)"
          />
        </div>

        {/* Categorys */}
        <div className="group">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 transition-all duration-300 group-focus-within:text-amber-500">
            Category
          </label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full px-5 py-3 bg-white/90 dark:bg-gray-700/70 border-2 border-gray-200/80 dark:border-gray-600/50 rounded-xl focus:border-amber-500 focus:ring-0 focus:shadow-lg focus:shadow-amber-500/20 dark:focus:shadow-amber-500/10 text-gray-800 dark:text-white transition-all duration-300 font-semibold appearance-none"
          >
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
          </select>
        </div>

        {/* Target */}
        <div className="group">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 transition-all duration-300 group-focus-within:text-amber-500">
            Target
          </label>
          <input
            type="number"
            value={target}
            onChange={(e) => setTarget(e.target.value)}
            required
            className="w-full px-5 py-3 bg-white/90 dark:bg-gray-700/70 border-2 border-gray-200/80 dark:border-gray-600/50 rounded-xl focus:border-amber-500 focus:ring-0 focus:shadow-lg focus:shadow-amber-500/20 dark:focus:shadow-amber-500/10 text-gray-800 dark:text-white transition-all duration-300 font-semibold"
            placeholder="enter your targeted number"
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full py-4 bg-gradient-to-r from-amber-400 to-rose-500 hover:from-amber-500 hover:to-rose-600 text-gray-800 font-bold uppercase rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl active:scale-[0.98] transform hover:-translate-y-1"
        >
          + Add Goal
        </button>
      </form>
    </div>
  );
};

export default AddGoalForm;
