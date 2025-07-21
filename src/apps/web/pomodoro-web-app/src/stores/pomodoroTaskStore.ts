import { create } from "zustand";
import {PomodoroTask} from "@/types/pomodoroTask";

type PomodoroTaskStore = {
    tasks: PomodoroTask[];
    taskCount: number;
    totalTime: number;
    addTask: (task: Omit<PomodoroTask, "id">) => void;
    removeTask: (id: string) => void;
    updateTaskCount: (id: string, taskCount: number) => void;
}

const TASK_PERIOD = 25;

export const useTaskStore = create<PomodoroTaskStore>((set) => ({
    tasks: [],
    taskCount: 0,
    totalTime: 0,
    addTask: (task: Omit<PomodoroTask, "id">) =>
        set((state) => ({
            tasks: [
                { id: crypto.randomUUID(), ...task },
                ...state.tasks,
            ],
            taskCount: state.taskCount + 1,
            totalTime: state.totalTime + TASK_PERIOD,
        })),
    removeTask: (id: string) => {
        set((state) => {
            const exists = state.tasks.some(task => task.id === id);

            return !exists
                ? {}
                : {
                    tasks: state.tasks.filter(task => task.id !== id),
                    taskCount: state.taskCount - 1,
                    totalTime: state.totalTime - TASK_PERIOD,
                };
        });
    },
    updateTaskCount: (id: string, taskCount: number) => {
        set((state) => {
            const task = state.tasks.find(task => task.id === id);

            if (!task) {
                return {}
            }

            const calcTaskCount = taskCount - task.count;

            return {
                tasks: state.tasks.map((task) =>
                    task.id === id
                        ? { ...task, count: taskCount }
                        : task
                ),
                taskCount: state.taskCount + calcTaskCount,
                totalTime: state.totalTime + calcTaskCount * TASK_PERIOD,
            }
        });
    }
}));