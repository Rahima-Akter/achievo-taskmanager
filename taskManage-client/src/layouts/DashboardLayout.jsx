import Goals from "../components/Goals";
import Tasks from "../components/Tasks";

const DashboardLayout = () => {
  return (
    <div className="flex flex-col gap-5 overflow-y-auto">
      <div className="">
        <Tasks />
      </div>
      <div className="lg:w-full">
        <Goals />
      </div>
    </div>
  );
};

export default DashboardLayout;
