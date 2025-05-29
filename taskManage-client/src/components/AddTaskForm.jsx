import { useContext, useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { AuthContext } from "../providers/AuthProvider";
import { useNavigate } from "react-router-dom";

const AddTaskForm = () => {
  const { user } = useContext(AuthContext);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) {
      toast.error("Title is required");
      return;
    }
    const taskData = {
      title,
      description,
      dueDate,
      email: user?.email,
      category: "todo",
      createdAt: new Date().toISOString(),
    };

    try {
      const {data} = await axios.post(
        `${import.meta.env.VITE_LOCAL_HOST}/tasks`,
        taskData,
        { withCredentials: true }
      );
      // console.log(response.data);
      if (data._id) {
        toast.success("task added to the list");
        navigate("/dashboard");
        setTitle("");
        setDescription("");
        setDueDate("");
      } else {
        toast.error("something went wrong! please try again later");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-3xl p-8 shadow-xl border border-white/20 dark:border-gray-700/50 overflow-hidden relative">
      {/* Decorations */}
      <div className="absolute -top-20 -right-20 w-40 h-40 bg-blue-400/30 rounded-full filter blur-3xl"></div>
      <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-purple-400/20 rounded-full filter blur-3xl"></div>

      <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-8 text-center relative">
        <span className="relative z-10">Add A Task</span>
        <span className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-1/2 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></span>
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
        <div className="grid md:grid-cols-2 gap-6">
          {/* Title */}
          <div className="group">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 transition-all duration-300 group-focus-within:text-blue-500">
              Title
            </label>
            <input
              type="text"
              maxLength={50}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="w-full px-5 py-3 bg-white/70 dark:bg-gray-700/70 border-2 border-gray-200/80 dark:border-gray-600/50 rounded-xl focus:border-blue-500 focus:ring-0 focus:shadow-lg focus:shadow-blue-500/20 dark:focus:shadow-blue-500/10 text-gray-800 dark:text-white transition-all duration-300"
            />
          </div>

          {/* Due Date */}
          <div className="group">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 transition-all duration-300 group-focus-within:text-blue-500">
              Due Date
            </label>
            <input
              type="date"
              value={dueDate}
              required
              onChange={(e) => setDueDate(e.target.value)}
              className="w-full px-5 py-3 bg-white/70 dark:bg-gray-700/70 border-2 border-gray-200/80 dark:border-gray-600/50 rounded-xl focus:border-blue-500 focus:ring-0 focus:shadow-lg focus:shadow-blue-500/20 dark:focus:shadow-blue-500/10 text-gray-800 dark:text-white transition-all duration-300"
            />
          </div>
        </div>

        {/* Description */}
        <div className="group">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 transition-all duration-300 group-focus-within:text-blue-500">
            Description
          </label>
          <textarea
            maxLength={200}
            value={description}
            rows={4}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-5 py-3 bg-white/70 dark:bg-gray-700/70 border-2 border-gray-200/80 dark:border-gray-600/50 rounded-xl focus:border-blue-500 focus:ring-0 focus:shadow-lg focus:shadow-blue-500/20 dark:focus:shadow-blue-500/10 text-gray-800 dark:text-white transition-all duration-300"
          ></textarea>
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full py-4 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl active:scale-[0.98] transform"
        >
          <span className="flex items-center justify-center space-x-2">
            <span className="text-xl">+</span>
            <span>Add Task</span>
          </span>
        </button>
      </form>
    </div>
  );
};

export default AddTaskForm;
