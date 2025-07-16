import {cn} from "@/libs/utils";
import PomodoroTimer from "@/components/pomodoro_timer/PomodoroTimer/PomodoroTimer";
import TaskContainer from "@/components/pomodoro_tasks/TaskContainer/TaskContainer";

const Home = () => {
  return (
      <div className={cn("max-w-6xl mx-auto p-5 flex flex-col gap-5")}>
          <PomodoroTimer />
          <TaskContainer />
      </div>
  );
}

export default Home;
