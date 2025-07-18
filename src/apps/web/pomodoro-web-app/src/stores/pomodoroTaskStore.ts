import { create } from "zustand";
import {PomodoroTask} from "@/types/pomodoroTask";

type PomodoroTaskStore = {
    tasks: PomodoroTask[];
    addTask: (task: Omit<PomodoroTask, "id">) => void;
}

export const useTaskStore = create<PomodoroTaskStore>((set) => ({
    tasks: [],
    addTask: (task: Omit<PomodoroTask, "id">) =>
        set((state) => ({
            tasks: [
                { id: crypto.randomUUID(), ...task },
                ...state.tasks,
            ]
        }))
}));