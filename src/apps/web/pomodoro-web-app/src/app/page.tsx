import {cn} from "@/libs/utils";
import PomodoroTimer from "@/components/pomodoro_timer/PomodoroTimer/PomodoroTimer";
import TaskContainer from "@/components/pomodoro_tasks/TaskContainer/TaskContainer";
import {PomodoroTaskItem} from "@/types/pomodoro_task";

const tasks: PomodoroTaskItem[] = [
    {
        id: 1,
        category: "test",
        description: "test",
        count: 2
    }
];


const Home = () => {
  return (
      <div className={cn("max-w-6xl mx-auto p-5 flex flex-col gap-5")}>
          <PomodoroTimer />
          <TaskContainer tasks={tasks} />
      </div>
  );
}

export default Home;
