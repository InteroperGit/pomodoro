import * as React from 'react';
import { Button } from "@/components/ui/button"
import {cn} from "@/libs/utils";
import {PomodoroTimerState} from "@/types/pomodoroTimerState";

type Props = {
    pomodoroTimerState: PomodoroTimerState,
    setPomodoroTimerState: React.Dispatch<React.SetStateAction<PomodoroTimerState>>,
};

const buttonStyle = cn("w-50 border border-white/80 rounded-xl",
    "text-white hover:text-white hover:bg-black/10");

// ---------------------------------------------
// ВНУТРЕННИЕ КОМПОНЕНТЫ КНОПОК
// ---------------------------------------------

type ButtonHandlerProps = {
    setState: React.Dispatch<React.SetStateAction<PomodoroTimerState>>;
    disabled?: boolean;
};

const StartButton = ({ setState }: ButtonHandlerProps) => (
    <Button
        variant="ghost"
        className={buttonStyle}
        onClick={() => setState(PomodoroTimerState.Started)}
    >
        Начать
    </Button>
);

const PauseButton = ({ setState }: ButtonHandlerProps) => (
    <Button
        variant="ghost"
        className={buttonStyle}
        onClick={() => setState(PomodoroTimerState.Paused)}
    >
        Пауза
    </Button>
);

const StopButton = ({ setState, disabled }: ButtonHandlerProps) => (
    <Button
        variant="ghost"
        className={buttonStyle}
        onClick={() => setState(PomodoroTimerState.Stopped)}
        disabled={disabled}
    >
        Остановить
    </Button>
);

const ResumeButton = ({ setState }: ButtonHandlerProps) => (
    <Button
        variant="ghost"
        className={buttonStyle}
        onClick={() => setState(PomodoroTimerState.Started)}
    >
        Продолжить
    </Button>
);

const CompleteButton = ({ setState }: ButtonHandlerProps) => (
    <Button
        variant="ghost"
        className={buttonStyle}
        onClick={() => setState(PomodoroTimerState.Completed)}
    >
        Завершить
    </Button>
);

/**
 * Компонент PomodoroControls
 *
 * Отвечает за отображение и поведение управляющих кнопок Pomodoro-
 * таймера в зависимости от текущего состояния таймера (Pending, Started,
 * Paused и т.д.).
 *
 * Принимает два пропса:
 * - `pomodoroTimerState` — текущее состояние таймера, на основе которого
 *   определяется, какие кнопки показывать пользователю (например, «Начать»,
 *   «Пауза», «Продолжить», «Завершить» и т.п.).
 * - `setPomodoroTimerState` — функция, позволяющая изменить состояние
 *   таймера, вызываемая из обработчиков событий кнопок.
 *
 * Принцип работы:
 * - В состоянии `Pending` пользователь может начать Pomodoro-сессию
 *   (кнопка "Начать").
 * - В состоянии `Started` доступны кнопки «Пауза» и «Остановить».
 * - В состоянии `Paused` — «Продолжить» и «Завершить».
 * - По нажатию соответствующей кнопки вызывается функция
 *   `setPomodoroTimerState` с нужным значением.
 *
 * Использует стили TailwindCSS и Button-компонент из UI-библиотеки.
 */
const PomodoroControls = ({
        pomodoroTimerState,
        setPomodoroTimerState,
    }: Props) => {

    return (
        <div className={cn("flex justify-center items-center gap-7")}>
            {
                 pomodoroTimerState === PomodoroTimerState.Pending
                    ? (
                        <>
                            <StartButton setState={setPomodoroTimerState} />
                            <StopButton setState={setPomodoroTimerState} disabled />
                        </>
                     )
                    : pomodoroTimerState === PomodoroTimerState.Started
                         ?  (
                            <>
                                <PauseButton setState={setPomodoroTimerState} />
                                <StopButton setState={setPomodoroTimerState} />
                            </>
                         )
                         : (
                             <>
                                 <ResumeButton setState={setPomodoroTimerState} />
                                 <CompleteButton setState={setPomodoroTimerState} />
                             </>
                         )
            }
        </div>
    );
};

export default PomodoroControls;