"use client"

import * as React from 'react';
import {cn} from "@/libs/utils";
import TaskItem from "@/components/pomodoro_tasks/TaskItem/TaskItem";
import {useTaskStore} from "@/stores/pomodoro_task_store";

type Props = {
};

const TaskList = (props: Props) => {
    const tasks = useTaskStore((state) => state.tasks);

    return (
        <div className={cn("flex flex-col items-center")}>
            {
                tasks?.map((task, index) => (
                    <div key={task.id}
                         className={cn("w-full",
                             "border-b border-black/20 text-black/80",
                             index === 0 && "border-t")}>
                        <TaskItem task={task} />
                    </div>
                ))
            }
        </div>
    );
};

export default TaskList;