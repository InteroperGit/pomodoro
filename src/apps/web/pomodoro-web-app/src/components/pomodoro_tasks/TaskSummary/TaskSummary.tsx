"use client"

import * as React from 'react';
import {cn} from "@/libs/utils";
import {useTaskStore} from "@/stores/pomodoroTaskStore";

type Props = {

};

const TaskSummary = (props: Props) => {
    const taskCount = useTaskStore((state) => state.taskCount);
    const totalTime = useTaskStore((state) => state.totalTime);

    const [uiTotalTime, setUiTotalTime] = React.useState<string>("");

    React.useEffect(() => {
        const hours = Math.trunc(totalTime / 60);
        const minutes = totalTime % 60;

        if (hours <= 0) {
            setUiTotalTime(`${minutes} мин`);
        }
        else {
            setUiTotalTime(`${hours} час ${minutes} мин`);
        }
    }, [totalTime]);

    return (
        <div className={cn("relative flex flex-row items-center justify-center gap-5 text-black/70")}>
            {/* Линия */}
            <div className="absolute inset-0 flex items-center justify-center z-0">
                <div className="w-full border-t border-black/10"></div>
            </div>

            <div className="relative z-10 flex flex-row items-center gap-2 bg-white px-4">
                <div>ЗАПЛАНИРОВАНО</div>
                <div className="flex flex-row items-center gap-2">
                    <span>{taskCount}</span>
                    <span>/</span>
                    <span className={cn("text-black/50 text-sm")}>{uiTotalTime}</span>
                </div>
            </div>
        </div>
    );
};

export default TaskSummary;