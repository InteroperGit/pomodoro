import { create } from "zustand";
import {PomodoroTask} from "@/types/pomodoroTask";

type PomodoroTaskStore = {
    tasks: PomodoroTask[];
    addTask: (task: Omit<PomodoroTask, "id">) => void;
    removeTask: (id: string) => void;
}

export const useTaskStore = create<PomodoroTaskStore>((set) => ({
    tasks: [],
    addTask: (task: Omit<PomodoroTask, "id">) =>
        set((state) => ({
            tasks: [
                { id: crypto.randomUUID(), ...task },
                ...state.tasks,
            ]
        })),
    removeTask: (id: string) => {
        set((state) => {
            const exists = state.tasks.some(task => task.id === id);

            return !exists
                ? {}
                : {
                    tasks: state.tasks.filter(task => task.id !== id),
                };
        });
    }
}));