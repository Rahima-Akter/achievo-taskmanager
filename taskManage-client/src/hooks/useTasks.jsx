import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const useTasks = () => {
  const { user } = useContext(AuthContext);
  const {
    data: tasks = [],isLoading,refetch,} = useQuery({
    queryKey: ["tasks"],
    queryFn: async () => {
      const { data } = await axios.get(
        `${import.meta.env.VITE_LOCAL_HOST}/tasks/${user?.email}`,
        { withCredentials: true }
      );
      return data;
    },
  });
  const todoTask = tasks.filter((task) => task.category === "todo");
  const progressTask = tasks.filter((task) => task.category === "in-progress");
  const doneTask = tasks.filter((task) => task.category === "done");
  return [tasks, todoTask, progressTask, doneTask, isLoading, refetch];
};

export default useTasks;
