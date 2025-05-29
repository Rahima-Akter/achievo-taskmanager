import { Outlet } from "react-router-dom";
import ThemeToggleButton from "../context/themeContext/ThemeToggleButton";
import { useEffect } from "react";
import { useState } from "react";
import { HashLoader } from "react-spinners";
import useTasks from "../hooks/useTasks";

const Dashboard = () => {
  const [quotes, setQuotes] = useState([]);
  const [randomQuote, setRandomQuote] = useState(null);
  const [, , , , isLoading] = useTasks();

  // console.log(randomQuote);
  // console.log(quotes.slice(0,1));

  useEffect(() => {
    fetch(`${import.meta.env.VITE_LOCAL_HOST}/quotes`)
      .then((res) => res.json())
      .then((data) => {
        const quote = data.map(({ q, a }) => ({ q, a }));
        setQuotes(quote);
      });
  }, []);

  useEffect(() => {
    if (quotes.length === 0) return;
    setRandomQuote(quotes[Math.floor(Math.random() * quotes?.length)]);
    const interval = setInterval(() => {
      setRandomQuote(quotes[Math.floor(Math.random() * quotes?.length)]);
    }, 7000);
    return () => clearInterval(interval);
  }, [quotes]);

  if (isLoading)
    return (
      <div className="flex justify-center items-center text-cyan-400 mt-44">
        <HashLoader size={70} color="#0fcfd5" />
      </div>
    );

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-[#e8ede3] to-[#dbdfd8] dark:from-gray-900 dark:to-black md:p-6 flex flex-col">
      <div className="">
        <Outlet />
      </div>

      {/* quote div */}
      <div className="mt-8 px-6 py-8 rounded-xl bg-[#FFFDF6] dark:bg-gray-800/50 backdrop-blur-sm border-l-4 border-purple-500 shadow-md hover:shadow-lg transition-shadow duration-300 relative">
        <div className="text-center">
          <p className="text-xl font-serif italic text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
            &quot;{randomQuote?.q}&quot;
            {/* &quot;`, `&ldquo;`, `&#34;`, `&rdquo; */}
          </p>
          <p className="text-sm uppercase tracking-wider text-purple-600 dark:text-purple-400 font-bold">
            — {randomQuote?.a}
          </p>
        </div>
        <div className="absolute top-4 right-10 text-purple-300 dark:text-purple-700 text-5xl font-serif select-none">
          ”
        </div>
      </div>

      <div className="mt-2">
        <ThemeToggleButton />
      </div>
    </div>
  );
};

export default Dashboard;
