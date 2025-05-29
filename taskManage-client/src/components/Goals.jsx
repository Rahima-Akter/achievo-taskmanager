import axios from "axios";
import { useEffect } from "react";
import { useContext } from "react";
import { useState } from "react";
import { FaPlus, FaCheck, FaTimes, FaTrash } from "react-icons/fa";
import { FiTarget } from "react-icons/fi";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../providers/AuthProvider";
import toast from "react-hot-toast";

const Goals = () => {
  const { user } = useContext(AuthContext);
  const [goals, setGoals] = useState([]);

  useEffect(() => {
    if (!user?.email) return;
    const fetchGoals = async () => {
      const { data } = await axios.get(
        `${import.meta.env.VITE_LOCAL_HOST}/get-goal/${user?.email}`,
        { withCredentials: true }
      );
      setGoals(data);
    };
    fetchGoals();
  }, [user?.email]);

  const handleProgress = async (id, action) => {
    const goal = goals.find((goal) => goal._id == id);
    if (!goal) return;
    const actionValue =
      action === "plus"
        ? Math.min(goal.completed + 1, goal.target)
        : Math.max(goal.completed - 1, 0);
    try {
      const { data } = await axios.patch(
        `${import.meta.env.VITE_LOCAL_HOST}/completed/${id}`,
        { completed: actionValue },
        { withCredentials: true }
      );
      if (data._id) {
        const { data: updatedGoals } = await axios.get(
          `${import.meta.env.VITE_LOCAL_HOST}/get-goal/${user?.email}`,
          { withCredentials: true }
        );
        setGoals(updatedGoals);
      }
    } catch (error) {
      console.log(error);
      toast.error("something went wrong");
    }
  };

  // Delete a goal
  const handleDelete = async (id, title) => {
    const confirm = window.confirm(`delete ${title}?`);
    if (!confirm) return;

    try {
      const { data } = await axios.delete(
        `${import.meta.env.VITE_LOCAL_HOST}/delete-goal/${id}`,
        { withCredentials: true }
      );
      if (data.message) {
        const remainingGoals = goals.filter((goal) => goal._id !== id);
        setGoals(remainingGoals)
        toast.success(`${title} deleted successfully`);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="bg-[#FFFDF6] dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm hover:shadow-md transition-shadow duration-300">
      <div className="flex justify-between items-center pb-4 border-b border-gray-100 dark:border-gray-700">
        <h2 className="font-bold text-2xl dark:text-white flex items-center gap-2">
          <span className="text-blue-500 dark:text-blue-400">🎯</span>
          <span className="bg-gradient-to-r from-purple-400 to-blue-400 dark:from-purple-300 dark:to-blue-300 bg-clip-text text-transparent">
            My Goals
          </span>
        </h2>
        <NavLink
          to="create-goal"
          className="flex items-center gap-2 bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white px-4 py-2 rounded-xl font-medium shadow-lg hover:shadow-blue-500/30 transition-all text-sm"
        >
          <FaPlus className="text-xs" />
          Add Goal
        </NavLink>
      </div>

      {/* Empty div */}
      {goals.length === 0 && (
        <div className="text-center py-12">
          <div className="mx-auto w-24 h-24 bg-gradient-to-br from-purple-100 to-blue-100 dark:from-purple-900/30 dark:to-blue-900/30 rounded-full flex items-center justify-center mb-4">
            <FiTarget className="text-3xl text-purple-500 dark:text-purple-400" />
          </div>
          <h3 className="text-xl font-medium text-gray-700 dark:text-gray-300 mb-2">
            No Goals Yet
          </h3>
          <p className="text-gray-500 dark:text-gray-400 mb-6 max-w-md mx-auto">
            Start your productivity journey by adding your first goal
          </p>
          <NavLink
            to="create-goal"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white px-6 py-3 rounded-xl font-medium shadow-lg hover:shadow-blue-500/30 transition-all"
          >
            <FaPlus />
            Create First Goal
          </NavLink>
        </div>
      )}

      {/* Goals */}
      <div className="space-y-4 mt-4 h-[340px] overflow-y-auto">
        {goals.map((goal) => (
          <div
            key={goal._id}
            className="bg-gray-100 dark:bg-gray-700/30 p-4 rounded-xl border border-gray-200 dark:border-gray-600 hover:border-blue-400/30 transition-all"
          >
            <div className="flex justify-between items-start mb-3">
              <h3 className="font-medium text-gray-800 dark:text-gray-200">
                {goal.title}
              </h3>
              <span
                className={`px-3 py-1 rounded-full text-xs font-medium ${
                  goal.category === "weekly"
                    ? "bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300"
                    : "bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300"
                }`}
              >
                {goal.category}
              </span>
            </div>

            {/* Progress Bar */}
            <div className="mb-2 space-y-2">
              <p className=" text-gray-500 dark:text-gray-400 mb-1">Progress</p>
              <div className="w-full h-2 bg-gray-200 dark:bg-gray-600 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full ${
                    goal.category === "weekly" ? "bg-blue-500" : "bg-purple-500"
                  }`}
                  style={{
                    width: `${Math.min(
                      100,
                      (goal.completed / goal.target) * 100
                    )}%`,
                  }}
                />
              </div>
              <div className="flex justify-between items-center">
                <div className="mt-">
                  {goal.completed}/{goal.target}{" "}
                  {goal.category === "weekly"
                    ? "times"
                    : goal.title.includes("$")
                    ? "dollars"
                    : "units"}
                </div>

                {/* buttons */}
                <div className="flex gap-0">
                  <button
                    onClick={() => handleProgress(goal._id, "minus")}
                    disabled={goal.completed <= 0}
                    className={`p-2 rounded-lg ${
                      goal.completed <= 0
                        ? "text-gray-300 dark:text-gray-600 cursor-not-allowed"
                        : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-600/50 hover:text-blue-500"
                    } transition-colors`}
                  >
                    <FaTimes />
                  </button>
                  <button
                    onClick={() => handleProgress(goal._id, "plus")}
                    disabled={goal.completed >= goal.target}
                    className={`p-2 rounded-lg ${
                      goal.completed >= goal.target
                        ? "text-gray-300 dark:text-gray-600 cursor-not-allowed"
                        : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-600/50 hover:text-green-500"
                    } transition-colors`}
                  >
                    <FaCheck />
                  </button>
                  {/* delete button */}
                  <button
                    onClick={() => handleDelete(goal._id, goal.title)}
                    className="p-2 text-gray-600 dark:text-gray-400 hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-500 rounded-lg transition-colors"
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Goals;
