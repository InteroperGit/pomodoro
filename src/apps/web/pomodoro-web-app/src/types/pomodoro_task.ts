export type PomodoroTask = {
    category: string;
    description: string;
}

export type PomodoroTaskItem = PomodoroTask & {
    id: number;
    count: number;
}