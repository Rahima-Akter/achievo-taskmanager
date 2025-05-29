import { FaRocket } from "react-icons/fa";
import { FiCheckCircle, FiTarget, FiAward } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";
import logo from "../assets/achieveoDark.png";
import logo2 from "../assets/achievoLight.png";
import ThemeToggleButton from "../context/themeContext/ThemeToggleButton";
import { useTheme } from "../context/themeContext/ThemeProvider";
import { BiLogOutCircle } from "react-icons/bi";
import { IoMdLogIn } from "react-icons/io";

const Home = () => {
  const { user, logOut } = useContext(AuthContext);
  const { theme } = useTheme();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-50 dark:from-gray-900 dark:to-gray-800 text-gray-900 dark:text-white">
      {/* Navbar */}
      <nav className="w-full max-w-7xl mx-auto px-6 py-5 flex justify-between items-center dark:shadow-none shadow-sm shadow-gray-200 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center gap-3">
          <img
            src={theme === "light" ? logo2 : logo}
            alt="Achievo logo"
            className="w-36"
          />
        </div>

        {user ? (
          <div className="p-[1px] rounded-lg bg-gradient-to-r from-purple-500 to-blue-500 inline-block">
            <button
              onClick={logOut}
              className="flex items-center bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 px-5 py-2.5 rounded-lg transition-all group text-gray-800 dark:text-gray-200 w-full font-bold"
            >
              <BiLogOutCircle className="group-hover:-translate-x-1 transition-transform text-xl" />
              <span className="-mt-[2px]">log-out</span>
            </button>
          </div>
        ) : (
          <div className="flex items-center justify-center gap-2">
            <Link
              to="form"
              className="flex items-center gap-2 bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 md:px-5 md:py-2.5 px-2 py-1.5 text-xs md:font-bold md:text-sm rounded-lg shadow-lg hover:shadow-purple-500/20 transition-all text-white group font-bold duration-900"
            >
              <IoMdLogIn className="text-xl group-hover:translate-x-1 transition-transform duration-900" />
              <span>Sign-in</span>
            </Link>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="max-w-6xl mx-auto text-center px-6 py-20 md:py-10">
        <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
          <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent font-extrabold">
            Achievo
          </span>{" "}
          <br />
          Where Productivity{" "}
          <span className="text-blue-400 dark:text-blue-300">
            Meets Velocity
          </span>
        </h1>

        <p className="text-xl text-gray-600 dark:text-gray-300 mb-12 max-w-2xl mx-auto leading-relaxed">
          The ultimate toolkit for high-achievers. Track goals, crush tasks, and
          <span className="text-blue-500 dark:text-blue-300 font-medium">
            {" "}
            unlock your potential
          </span>
          .
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => (user ? navigate("dashboard") : navigate("form"))}
            className="flex items-center gap-3 bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white px-8 py-4 rounded-xl text-lg font-medium shadow-lg hover:shadow-blue-500/30 transition-all justify-center"
          >
            {user ? "Launch Dashboard" : "Start Achievo"}
            <FaRocket className="animate-pulse" />
          </button>
          <a href="https://drive.google.com/file/d/166SUE_y-Zbx1t_5S1RRDf_4so_q8S4pv/view?usp=sharing" className="px-8 py-4 border border-gray-300 dark:border-gray-600 hover:border-blue-400 rounded-xl text-lg font-medium hover:text-blue-500 dark:hover:text-blue-300 transition-all text-gray-700 dark:text-gray-300">
            See Demo
          </a>
        </div>
      </section>

      {/* Feature Cards */}
      <div className="max-w-7xl mx-auto px-6 pb-28 grid md:grid-cols-3 gap-8">
        {[
          {
            icon: (
              <FiCheckCircle className="text-3xl text-blue-500 dark:text-blue-400" />
            ),
            title: "Atomic Tasks",
            desc: "Break down work into laser-focused micro-actions",
            glow: "hover:shadow-blue-500/10 dark:hover:shadow-blue-500/20",
          },
          {
            icon: (
              <FiTarget className="text-3xl text-purple-500 dark:text-purple-400" />
            ),
            title: "Goal Physics",
            desc: "Visualize progress with momentum tracking",
            glow: "hover:shadow-purple-500/10 dark:hover:shadow-purple-500/20",
          },
          {
            icon: (
              <FiAward className="text-3xl text-blue-400 dark:text-blue-300" />
            ),
            title: "Motivation Engine",
            desc: "Stay motivated with random motivational quotes",
            glow: "hover:shadow-blue-400/10 dark:hover:shadow-blue-400/20",
          },
        ].map((feature, idx) => (
          <div
            key={idx}
            className={`bg-white dark:bg-gray-800/50 backdrop-blur-sm p-8 rounded-2xl border border-gray-200 dark:border-gray-700 hover:border-blue-400/30 transition-all hover:scale-[1.02] ${feature.glow} shadow-sm dark:shadow-none`}
          >
            <div className="mb-5">{feature.icon}</div>
            <h3 className="text-xl font-bold mb-3 text-gray-800 dark:text-gray-200">
              {feature.title}
            </h3>
            <p className="text-gray-600 dark:text-gray-400">{feature.desc}</p>
          </div>
        ))}
      </div>
      <ThemeToggleButton />
    </div>
  );
};

export default Home;
