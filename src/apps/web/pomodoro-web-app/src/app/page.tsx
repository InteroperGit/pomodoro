"use client";

import {cn} from "@/libs/utils";
import PomodoroTimer from "@/components/pomodoro_timer/PomodoroTimer/PomodoroTimer";
import TaskContainer from "@/components/pomodoro_tasks/TaskContainer/TaskContainer";
import {useTaskStore} from "@/stores/pomodoroTaskStore";
import React from "react";
import {PomodoroTask} from "@/types/pomodoroTask";

const initTasks: PomodoroTask[] = [{
    id: crypto.randomUUID(),
    category: "test",
    description: "test",
    count: 1,
}, {
    id: crypto.randomUUID(),
    category: "test",
    description: "test2",
    count: 1,
}]

const Home = () => {
    const addTask = useTaskStore((state) => state.addTask);

    React.useEffect(() => {
        initTasks.map((task) => {
            addTask(task);
        })
    }, []);

    return (
      <div className={cn("max-w-6xl mx-auto p-5 flex flex-col gap-5")}>
          <PomodoroTimer />
          <TaskContainer />
      </div>
    );
}

export default Home;
