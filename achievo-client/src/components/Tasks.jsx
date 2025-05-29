import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { IoIosCloseCircle } from "react-icons/io";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import useTasks from "../hooks/useTasks";
import { FaEye, FaPlus } from "react-icons/fa";
import { FaRegEdit } from "react-icons/fa";
import { AiOutlineDelete } from "react-icons/ai";
import { VscDebugStart } from "react-icons/vsc";
import { MdOutlineDoneOutline } from "react-icons/md";

// Drag and Drop imports
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { FiCheckCircle, FiClipboard, FiClock } from "react-icons/fi";

const Tasks = () => {
  const [tasks, todoTask, progressTask, doneTask, ,refetch] = useTasks();
  const navigate = useNavigate();
  const [todos, setTodos] = useState(todoTask || []);
  const [progresses, setProgresses] = useState(progressTask || []);
  const [doneTasks, setDoneTasks] = useState(doneTask || []);
  const [detail, setDetail] = useState("");

  const prevTodosRef = useRef();
  const prevProgressesRef = useRef();
  const prevDoneTasksRef = useRef();

  useEffect(() => {
    // Only update state if data has changed (use refs to store previous data)
    if (JSON.stringify(todoTask) !== JSON.stringify(prevTodosRef.current)) {
      setTodos(todoTask);
      prevTodosRef.current = todoTask;
    }

    if (
      JSON.stringify(progressTask) !== JSON.stringify(prevProgressesRef.current)
    ) {
      setProgresses(progressTask);
      prevProgressesRef.current = progressTask;
    }

    if (JSON.stringify(doneTask) !== JSON.stringify(prevDoneTasksRef.current)) {
      setDoneTasks(doneTask);
      prevDoneTasksRef.current = doneTask;
    }
  }, [todoTask, progressTask, doneTask]);

  const handleModal = (id) => {
    const singleDetail = tasks.find((detail) => detail._id === id);
    setDetail(singleDetail);
    document.getElementById("my_modal_5").showModal();
  };

  const handleDelete = async (id) => {
    try {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then(async (result) => {
        if (result.isConfirmed) {
          const deletedTodo = todos.filter((deleted) => deleted._id !== id);
          setTodos(deletedTodo);
          const deletedProgress = progresses.filter(
            (deleted) => deleted._id !== id
          );
          setProgresses(deletedProgress);
          const deletedDone = doneTasks.filter((deleted) => deleted._id !== id);
          setDoneTasks(deletedDone);

          const { data } = await axios.delete(
            `${import.meta.env.VITE_LOCAL_HOST}/delete-single-task/${id}`,
            { withCredentials: true }
          );
          if (data.insertedId) {
            Swal.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success",
            });
          }
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleInProgress = async (id, category) => {
    const { data } = await axios.patch(
      `${import.meta.env.VITE_LOCAL_HOST}/${category}/${id}`,
      {},
      { withCredentials: true }
    );
    if (data._id) {
      toast.success(`Task moved to ${category}`);
      refetch();
    } else {
      toast.error("something went wrong! please try again");
    }
  };

  const handleDragEnd = async (result) => {
    const { destination, source } = result;

    // If dropped outside the list or no move (same index)
    if (
      !destination ||
      (destination.index === source.index &&
        destination.droppableId === source.droppableId)
    ) {
      return;
    }

    const movedTaskId = result.draggableId;
    let newCategory = destination.droppableId;

    // Reorganize the tasks in the UI
    const updatedTodos = [...todos];
    const updatedProgresses = [...progresses];
    const updatedDoneTasks = [...doneTasks];

    let movedTask;

    // Handle reordering within the same category (source === destination)
    if (source.droppableId === destination.droppableId) {
      if (source.droppableId === "todo") {
        movedTask = updatedTodos.splice(source.index, 1)[0];
        updatedTodos.splice(destination.index, 0, movedTask); // Reorder within the same category
      } else if (source.droppableId === "in-progress") {
        movedTask = updatedProgresses.splice(source.index, 1)[0];
        updatedProgresses.splice(destination.index, 0, movedTask); // Reorder within the same category
      } else if (source.droppableId === "done") {
        movedTask = updatedDoneTasks.splice(source.index, 1)[0];
        updatedDoneTasks.splice(destination.index, 0, movedTask); // Reorder within the same category
      }
    } else {
      // If tasks are moved to different categories
      if (source.droppableId === "todo") {
        movedTask = updatedTodos.splice(source.index, 1)[0];
        if (newCategory === "in-progress")
          updatedProgresses.splice(destination.index, 0, movedTask);
        if (newCategory === "done")
          updatedDoneTasks.splice(destination.index, 0, movedTask);
      } else if (source.droppableId === "in-progress") {
        movedTask = updatedProgresses.splice(source.index, 1)[0];
        if (newCategory === "todo")
          updatedTodos.splice(destination.index, 0, movedTask);
        if (newCategory === "done")
          updatedDoneTasks.splice(destination.index, 0, movedTask);
      } else if (source.droppableId === "done") {
        movedTask = updatedDoneTasks.splice(source.index, 1)[0];
        if (newCategory === "todo")
          updatedTodos.splice(destination.index, 0, movedTask);
        if (newCategory === "in-progress")
          updatedProgresses.splice(destination.index, 0, movedTask);
      }
    }

    // Update the states with the new task order
    setTodos(updatedTodos);
    setProgresses(updatedProgresses);
    setDoneTasks(updatedDoneTasks);

    // Optionally refetch tasks from the backend
    try {
      await axios.patch(
        `${import.meta.env.VITE_LOCAL_HOST}/update-categories/${movedTaskId}`,
        { category: newCategory }
      );
      toast.success("Task moved successfully!");
    } catch (error) {
      console.error("Error updating task category:", error);
      toast.error("An error occurred while moving the task.");
    }
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div className="bg-[#FFFDF6] dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-200 dark:border-gray-700 p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
        <div className="flex justify-between items-center pb-4 border-b border-gray-100 dark:border-gray-700 mb-6">
          <h2 className="font-bold text-2xl dark:text-white flex items-center gap-2">
            <span className="text-purple-500 dark:text-purple-400">📋</span>
            <span className="bg-gradient-to-r from-purple-400 to-blue-400 dark:from-purple-300 dark:to-blue-300 bg-clip-text text-transparent">
              Daily Tasks
            </span>
          </h2>
          <NavLink to="/" className="hover:underline">
            Home
          </NavLink>
          <NavLink
            to="create-task"
            className="flex items-center gap-2 bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white px-4 py-2 rounded-xl font-medium shadow-lg hover:shadow-blue-500/30 transition-all text-sm"
          >
            <FaPlus className="text-xs" />
            Add Task
          </NavLink>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* To-Do Column */}
          <Droppable droppableId="todo">
            {(provided) => (
              <div
                className="bg-gray-100 dark:bg-gray-700/30 rounded-xl border border-gray-200 dark:border-gray-600 p-4 min-h-[300px"
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                <div className="flex items-center justify-between mb-4 pb-2 border-b border-gray-200 dark:border-gray-600]">
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 flex items-center gap-2">
                    <span className="w-3 h-3 bg-red-500 rounded-full"></span>
                    To-Do
                  </h3>
                  <span className="text-xs bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300 px-2 py-1 rounded-full">
                    {todos.length}
                  </span>
                </div>

                {todos.length === 0 ? (
                  <div className="text-center py-8">
                    <FiClipboard className="mx-auto text-3xl text-gray-400 dark:text-gray-500 mb-3" />
                    <p className="text-gray-500 dark:text-gray-400">
                      No tasks here yet
                    </p>
                  </div>
                ) : (
                  <div className="space-y-3 lg:h-[320px] h-[250px] overflow-y-auto">
                    {todos.map((todo, index) => (
                      <Draggable
                        key={todo._id}
                        draggableId={todo._id}
                        index={index}
                      >
                        {(provided) => (
                          <div
                            className={`bg-white dark:bg-gray-900 p-3 pb- rounded-lg shadow-sm border-l-4 ${
                              new Date().setHours(0, 0, 0, 0) >
                              new Date(todo.dueDate).setHours(0, 0, 0, 0)
                                ? "border-red-500"
                                : "border-blue-500"
                            } hover:shadow-md transition-all`}
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                          >
                            <div className="flex justify-between items-start">
                              <p
                                className={`font-medium ${
                                  new Date().setHours(0, 0, 0, 0) >
                                  new Date(todo.dueDate).setHours(0, 0, 0, 0)
                                    ? "text-red-500"
                                    : "text-gray-800 dark:text-gray-200"
                                }`}
                              >
                                {todo.title}
                              </p>
                              <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
                                <button
                                  onClick={() => handleModal(todo._id)}
                                  className="hover:text-blue-500 transition-colors"
                                >
                                  <FaEye size={14} />
                                </button>
                                <button
                                  onClick={() =>
                                    navigate(`/dashboard/update/${todo._id}`)
                                  }
                                  className="hover:text-purple-500 transition-colors"
                                >
                                  <FaRegEdit size={14} />
                                </button>
                                <button
                                  onClick={() => handleDelete(todo._id)}
                                  className="hover:text-red-500 transition-colors"
                                >
                                  <AiOutlineDelete size={14} />
                                </button>
                                <button
                                  onClick={() =>
                                    handleInProgress(todo._id, "in-progress")
                                  }
                                  className="hover:text-green-500 transition-colors"
                                >
                                  <VscDebugStart size={14} />
                                </button>
                              </div>
                            </div>
                            {todo.dueDate && (
                              <p className="text-xs mt-1 text-gray-500 dark:text-gray-400">
                                Due:{" "}
                                {new Date(todo.dueDate).toLocaleDateString()}
                              </p>
                            )}
                          </div>
                        )}
                      </Draggable>
                    ))}
                  </div>
                )}
                {provided.placeholder}
              </div>
            )}
          </Droppable>

          {/* In Progress Column */}
          <Droppable droppableId="in-progress">
            {(provided) => (
              <div
                className="bg-gray-100 dark:bg-gray-700/30 rounded-xl border border-gray-200 dark:border-gray-600 p-4 min-h-[300px]"
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                <div className="flex items-center justify-between mb-4 pb-2 border-b border-gray-200 dark:border-gray-600">
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 flex items-center gap-2">
                    <span className="w-3 h-3 bg-yellow-500 rounded-full"></span>
                    In Progress
                  </h3>
                  <span className="text-xs bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300 px-2 py-1 rounded-full">
                    {progresses.length}
                  </span>
                </div>

                {progresses.length === 0 ? (
                  <div className="text-center py-8">
                    <FiClock className="mx-auto text-3xl text-gray-400 dark:text-gray-500 mb-3" />
                    <p className="text-gray-500 dark:text-gray-400">
                      No tasks in progress
                    </p>
                  </div>
                ) : (
                  <div className="space-y-3 lg:h-[320px] h-[250px] overflow-y-auto">
                    {progresses.map((progress, index) => (
                      <Draggable
                        key={progress._id}
                        draggableId={progress._id}
                        index={index}
                      >
                        {(provided) => (
                          <div
                            className={`bg-white dark:bg-gray-900 p-3 rounded-lg shadow-sm border-l-4 ${
                              new Date().setHours(0, 0, 0, 0) >
                              new Date(progress.dueDate).setHours(0, 0, 0, 0)
                                ? "border-red-500"
                                : "border-yellow-500"
                            } hover:shadow-md transition-all`}
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                          >
                            <div className="flex justify-between items-start">
                              <p
                                className={`font-medium ${
                                  new Date().setHours(0, 0, 0, 0) >
                                  new Date(progress.dueDate).setHours(
                                    0,
                                    0,
                                    0,
                                    0
                                  )
                                    ? "text-red-500"
                                    : "text-gray-800 dark:text-gray-200"
                                }`}
                              >
                                {progress.title}
                              </p>
                              <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
                                <button
                                  onClick={() => handleModal(progress._id)}
                                  className="hover:text-blue-500 transition-colors"
                                >
                                  <FaEye size={14} />
                                </button>
                                <button
                                  onClick={() =>
                                    navigate(
                                      `/dashboard/update/${progress._id}`
                                    )
                                  }
                                  className="hover:text-purple-500 transition-colors"
                                >
                                  <FaRegEdit size={14} />
                                </button>
                                <button
                                  onClick={() => handleDelete(progress._id)}
                                  className="hover:text-red-500 transition-colors"
                                >
                                  <AiOutlineDelete size={14} />
                                </button>
                                <button
                                  onClick={() =>
                                    handleInProgress(progress._id, "done")
                                  }
                                  className="hover:text-green-500 transition-colors"
                                >
                                  <MdOutlineDoneOutline size={14} />
                                </button>
                              </div>
                            </div>
                            {progress.dueDate && (
                              <p className="text-xs mt-1 text-gray-500 dark:text-gray-400">
                                Due:{" "}
                                {new Date(
                                  progress.dueDate
                                ).toLocaleDateString()}
                              </p>
                            )}
                          </div>
                        )}
                      </Draggable>
                    ))}
                  </div>
                )}
                {provided.placeholder}
              </div>
            )}
          </Droppable>

          {/* Done Column */}
          <Droppable droppableId="done">
            {(provided) => (
              <div
                className="bg-gray-100 dark:bg-gray-700/30 rounded-xl border border-gray-200 dark:border-gray-600 p-4 min-h-[300px]"
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                <div className="flex items-center justify-between mb-4 pb-2 border-b border-gray-200 dark:border-gray-600">
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 flex items-center gap-2">
                    <span className="w-3 h-3 bg-green-500 rounded-full"></span>
                    Completed
                  </h3>
                  <span className="text-xs bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300 px-2 py-1 rounded-full">
                    {doneTasks.length}
                  </span>
                </div>

                {doneTasks.length === 0 ? (
                  <div className="text-center py-8">
                    <FiCheckCircle className="mx-auto text-3xl text-gray-400 dark:text-gray-500 mb-3" />
                    <p className="text-gray-500 dark:text-gray-400">
                      No completed tasks
                    </p>
                  </div>
                ) : (
                  <div className="space-y-3 lg:h-[320px] h-[250px] overflow-y-auto">
                    {doneTasks.map((done, index) => (
                      <Draggable
                        key={done._id}
                        draggableId={done._id}
                        index={index}
                      >
                        {(provided) => (
                          <div
                            className="bg-white dark:bg-gray-900 p-3 rounded-lg shadow-sm border-l-4 border-green-500 hover:shadow-md transition-all"
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                          >
                            <div className="flex justify-between items-start">
                              <p className="font-medium text-gray-800 dark:text-gray-200 line-through opacity-80">
                                {done.title}
                              </p>
                              <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
                                <button
                                  onClick={() => handleModal(done._id)}
                                  className="hover:text-blue-500 transition-colors"
                                >
                                  <FaEye size={14} />
                                </button>
                                <button
                                  onClick={() =>
                                    navigate(`/dashboard/update/${done._id}`)
                                  }
                                  className="hover:text-purple-500 transition-colors"
                                >
                                  <FaRegEdit size={14} />
                                </button>
                                <button
                                  onClick={() => handleDelete(done._id)}
                                  className="hover:text-red-500 transition-colors"
                                >
                                  <AiOutlineDelete size={14} />
                                </button>
                              </div>
                            </div>
                            {done.dueDate && (
                              <p className="text-xs mt-1 text-gray-500 dark:text-gray-400">
                                Completed on: {new Date().toLocaleDateString()}
                              </p>
                            )}
                          </div>
                        )}
                      </Draggable>
                    ))}
                  </div>
                )}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </div>
      </div>

      {/* Modal */}
      <dialog id="my_modal_5" className="modal modal-middle backdrop-blur-sm">
        <div className="modal-box relative bg-white dark:bg-gray-800 max-w-md p-0 overflow-hidden">
          <div className="p-6 text-center space-y-4">
            <h2 className="font-bold text-xl text-gray-800 dark:text-white capitalize">
              {detail.title}
            </h2>
            <p className="text-gray-600 dark:text-gray-300 py-2">
              {detail.description}
            </p>
            <div className="flex justify-center items-center gap-2">
              <span className="font-medium text-gray-700 dark:text-gray-300">
                Due Date:
              </span>
              <span
                className={`text-sm px-3 py-1 rounded-full ${
                  new Date().setHours(0, 0, 0, 0) >
                  new Date(detail.dueDate).setHours(0, 0, 0, 0)
                    ? "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300"
                    : "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300"
                }`}
              >
                {detail.dueDate}
              </span>
            </div>
          </div>
          <form method="dialog">
            <button className="absolute top-4 right-4 p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
              <IoIosCloseCircle className="text-2xl text-gray-500 dark:text-gray-400" />
            </button>
          </form>
        </div>
      </dialog>
    </DragDropContext>
  );
};

export default Tasks;
