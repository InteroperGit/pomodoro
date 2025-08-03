import { create } from "zustand";
import {PomodoroTask} from "@/types/pomodoroTask";
import {getPomodoroSettingsService} from "@/services/localStoragePomodoroSettingsService";
import {PomodoroTaskCategory} from "@/types/pomodoroTaskCategory";

type PomodoroTaskStore = {
    tasks: PomodoroTask[];
    categories: PomodoroTaskCategory[];
    taskCount: number;
    totalTime: number;
    addTask: (task: Omit<PomodoroTask, "id">) => void;
    removeTask: (id: string) => void;
    updateTaskCount: (id: string, taskCount: number) => void;
}

const settingsService = getPomodoroSettingsService();

const POMODORO_DURATION = settingsService.getTimerSettings().pomodoroDuration;

export const useTaskStore = create<PomodoroTaskStore>((set) => ({
    tasks: [],
    categories: [],
    taskCount: 0,
    totalTime: 0,
    addTask: (task: Omit<PomodoroTask, "id">) =>
        set((state) => {
            const tasks = [
                {id: crypto.randomUUID(), ...task},
                ...state.tasks,
            ];

            const updateCategory = state.categories.find((category) => category.name === task.category);
            const categories = updateCategory
                ? state.categories.map((category) =>
                    category.name === updateCategory.name
                        ? { ...category, taskCount: category.taskCount + 1 }
                        : category)
                : [
                    { id: crypto.randomUUID(), name: task.category, taskCount: 1 },
                    ...state.categories,
                ]

            return {
                tasks: tasks,
                categories: categories,
                taskCount: state.taskCount + 1,
                totalTime: state.totalTime + POMODORO_DURATION,
            }
        }),
    removeTask: (id: string) => {
        set((state) => {
            const existsTask = state.tasks.find(task => task.id === id);

            if (!existsTask) {
                return {};
            }

            const tasks = state.tasks.filter(task => task.id !== id);
            const updateCategory = state.categories.find((category) => category.name === existsTask.category);

            if (!updateCategory) {
                throw new Error(`Failed to find category ${existsTask.category} in categories`);
            }

            const categories = updateCategory.taskCount <= 1
                ? [...state.categories.filter((category) => category.name !== updateCategory.name)]
                : state.categories.map((category) =>
                    category.name === updateCategory.name
                        ? { ...category, taskCount: category.taskCount - 1 }
                        : category
                  );

            return {
                tasks: tasks,
                categories: categories,
                taskCount: state.taskCount - 1,
                totalTime: state.totalTime - POMODORO_DURATION,
            }
        });
    },
    updateTaskCount: (id: string, taskCount: number) => {
        set((state) => {
            const updateTask = state.tasks.find(task => task.id === id);

            if (!updateTask) {
                return {}
            }

            const calcTaskCount = taskCount - updateTask.count;

            return {
                tasks: state.tasks.map((task) =>
                    task.id === id
                        ? { ...task, count: taskCount }
                        : task
                ),
                categories: state.categories.map((category) =>
                    category.name === updateTask.category
                        ? { ...category, taskCount: category.taskCount + calcTaskCount }
                        : category
                ),
                taskCount: state.taskCount + calcTaskCount,
                totalTime: state.totalTime + calcTaskCount * POMODORO_DURATION,
            }
        });
    }
}));