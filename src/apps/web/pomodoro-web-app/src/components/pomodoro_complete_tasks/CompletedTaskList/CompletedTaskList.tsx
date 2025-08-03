"use client"

import * as React from 'react';
import {useCompletedTaskStore} from "@/stores/completedPomodoroTaskStore";
import {cn} from "@/libs/utils";
import CompletedTaskItem from "@/components/pomodoro_complete_tasks/CompletedTaskItem/CompletedTaskItem";

type Props = {
};

const CompletedTaskList = (props: Props) => {
    const tasks = useCompletedTaskStore((state) => state.tasks);

    return (
        <div className={cn("flex flex-col gap-5")}>
            {/* Заголовок */}
            <div className={cn("flex flex-row text-black text-xs")}>
                {/* фиксированная ширина */}
                <div className="flex-1">КАТЕГОРИЯ</div>

                {/* плавающая */}
                <div className="flex-5">ОПИСАНИЕ</div>

                {/* фиксированная ширина */}
                <div className="flex-1">ВРЕМЯ НАЧАЛА</div>

                {/* фиксированная ширина */}
                <div className="flex-1">ВРЕМЯ ОКОНЧАНИЯ</div>
            </div>

            {/* Тело */}
            <div className={cn("flex flex-col items-center")}>
                {
                    tasks?.map((task, index) => (
                        <div key={task.id}
                             className={cn("w-full ",
                                 "border-b border-black/20 text-black/80",
                                 index === 0 && "border-t")}>
                            <CompletedTaskItem task={task} />
                        </div>
                    ))
                }
            </div>
        </div>


    );
};

export default CompletedTaskList;