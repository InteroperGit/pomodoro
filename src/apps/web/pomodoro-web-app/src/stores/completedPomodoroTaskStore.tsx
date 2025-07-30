import { create } from "zustand";
import {CompletedPomodoroTask} from "@/types/completedPomodoroTask";
import {PomodoroTask} from "@/types/pomodoroTask";

type CompletedPomodoroTaskStore = {
    tasks: CompletedPomodoroTask[];
    addTask: (task: PomodoroTask, timeStart: Date) => void;
}

export const useCompletedTaskStore = create<CompletedPomodoroTaskStore>((set) => ({
    tasks: [],
    addTask: (task: PomodoroTask, timeStart: Date) => {
        if (!task) {
            throw new Error("Task is not initialized");
        }

        const completedTask: CompletedPomodoroTask = {
            id: crypto.randomUUID(),
            category: task.category,
            description: task.description,
            timeStart: timeStart,
            timeEnd: new Date()
        }

        return set((state) => {
            const tasks = [
                completedTask,
                ...state.tasks,
            ];

            return {
                tasks,
            }
        });
    }
}))