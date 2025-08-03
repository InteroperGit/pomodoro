export type PomodoroSettings = {
    timerSettings: PomodoroTimerSettings;
}

export type PomodoroTimerSettings = {
    pomodoroDuration: number;
    shortBreak: number;
    longBreak: number;
    longBreakInterval: number;
}