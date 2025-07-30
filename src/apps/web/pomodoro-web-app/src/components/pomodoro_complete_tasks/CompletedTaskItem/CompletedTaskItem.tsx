import * as React from 'react';
import {CompletedPomodoroTask} from "@/types/completedPomodoroTask";
import {cn} from "@/libs/utils";
import {format} from "date-fns";

type Props = {
    task: CompletedPomodoroTask
};

const CompletedTaskItem = ({ task }: Props) => {
    return (
        <div className={cn("flex flex-col gap-5 cursor-pointer hover:bg-gray-100 py-3")}>
            {/* Заголовок */}
            <div className={cn("flex flex-row")}>
                {/* фиксированная ширина */}
                <div className="flex-1">{task.category}</div>

                {/* плавающая */}
                <div className="flex-5">{task.description}</div>

                {/* фиксированная ширина */}
                <div className="flex-1">{format(task.timeStart, "HH:mm:ss")}</div>

                {/* фиксированная ширина */}
                <div className="flex-1">{format(task.timeEnd, "HH:mm:ss")}</div>
            </div>
        </div>
    );
};

export default CompletedTaskItem;