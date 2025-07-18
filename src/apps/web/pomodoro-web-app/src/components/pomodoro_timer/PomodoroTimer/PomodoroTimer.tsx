"use client"

import * as React from 'react';
import {cn} from "@/libs/utils";
import PomodoroClock from "@/components/pomodoro_timer/PomodoroClock/PomodoroClock";
import PomodoroTask from "@/components/pomodoro_timer/PomodoroTask/PomodoroTask";
import PomodoroControls from "@/components/pomodoro_timer/PomodoroControls/PomodoroControls";
import {PomodoroTimerState} from "@/types/pomodoroTimerState";

type Props = {
    initTaskType?: PomodoroTaskType;
};

/**
 * Тип задачи
 */
enum PomodoroTaskType {
    Task,
    ShortBreak,
    LongBreak
}

const INIT_TIME_ELAPSED = 25 * 60;

const PomodoroTimer = ({
        initTaskType = PomodoroTaskType.Task,
    }: Props): React.JSX.Element => {

    const [currentTaskType, setCurrentTaskType] = React.useState<PomodoroTaskType>(initTaskType);
    const [pomodoroTimerState, setPomodoroTimerState] =
        React.useState<PomodoroTimerState>(PomodoroTimerState.Pending);
    const [pomodoroTimeElapsed, setPomodoroTimeElapsed] = React.useState<number>(INIT_TIME_ELAPSED);

    const bgColor = {
        [PomodoroTaskType.Task]: "bg-red-800/80",
        [PomodoroTaskType.ShortBreak]: "bg-blue-700/80",
        [PomodoroTaskType.LongBreak]: "bg-green-500/80",
    }[currentTaskType];

    // 🕒 Управление таймером
    React.useEffect(() => {
        if (pomodoroTimerState === PomodoroTimerState.Completed
                || pomodoroTimerState === PomodoroTimerState.Stopped) {

            setPomodoroTimeElapsed(INIT_TIME_ELAPSED);
            setPomodoroTimerState(PomodoroTimerState.Pending);
            return;
        }

        if (pomodoroTimerState !== PomodoroTimerState.Started) {
            return;
        }

        const interval = setInterval(() => {
            setPomodoroTimeElapsed((prev) => {
                if (prev <= 1) {
                    clearInterval(interval);
                    setPomodoroTimerState(PomodoroTimerState.Completed); // или Paused
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(interval);
    }, [pomodoroTimerState]);

    return (
        <div className={cn("my-10 rounded-md p-5", bgColor)}>
            <div>
                <div className={cn("flex flex-col justify-around mx-auto w-xl bg-")}>
                    <PomodoroClock pomodoroTimeElapsed={pomodoroTimeElapsed} />
                    <PomodoroTask className={"mb-5"} />
                    <PomodoroControls
                        pomodoroTimerState={pomodoroTimerState}
                        setPomodoroTimerState={setPomodoroTimerState}
                    />
                </div>
            </div>
        </div>
    );
};

export default PomodoroTimer;