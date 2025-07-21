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

/**
 * PomodoroTimer — компонент таймера Помодоро с управлением и визуализацией.
 *
 * Props:
 * - initTaskType (PomodoroTaskType, optional): начальный тип задачи.
 *
 * Локальный стейт:
 * - currentTaskType: текущий тип задачи (работа, короткий/длинный перерыв).
 * - pomodoroTimerState: состояние таймера (ожидание, старт, стоп, завершение).
 * - pomodoroTimeElapsed: оставшееся время в секундах.
 *
 * Цвет фона выбирается по типу задачи:
 * - Task — красный,
 * - ShortBreak — синий,
 * - LongBreak — зелёный.
 *
 * Логика таймера:
 * - При Completed или Stopped сбрасывает время и состояние на Pending.
 * - Если не Started — не запускает таймер.
 * - При Started запускает интервал, который каждую секунду уменьшает время.
 * - При достижении 0 секунд останавливает таймер и переводит в Completed.
 * - Очищает интервал при размонтировании или изменении состояния.
 *
 * Визуализация:
 * - Обёртка с цветным фоном и отступами.
 * - Внутри выводит PomodoroClock (время),
 *   PomodoroTask (описание задачи),
 *   PomodoroControls (управление старт/стоп).
 *
 * Особенности:
 * - Использует React.useEffect для управления жизненным циклом таймера.
 * - Использует TypeScript enum для строгой типизации.
 * - Легко расширяем для добавления новых типов задач и логики.
 */
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
        <div className={cn("rounded-md p-5", bgColor)}>
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