import * as React from 'react';

type Props = {
    pomodoroTimeElapsed: number;
};

const PomodoroClock = ({
        pomodoroTimeElapsed,
    }: Props) => {

    const minutes = Math.floor(pomodoroTimeElapsed / 60);
    const seconds = pomodoroTimeElapsed % 60;

    const formattedTime = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

    return (
        <div className="flex justify-center items-center">
            <div className="text-white/90 text-[6rem] leading-none font-thin">
                { formattedTime }
            </div>
        </div>
    );
};

export default PomodoroClock;