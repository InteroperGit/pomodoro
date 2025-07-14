"use client"

import * as React from 'react';
import {cn} from "@/libs/utils";
import {PomodoroTaskItem} from "@/types/pomodoro_task";
import TaskItemControls from "@/components/pomodoro_tasks/TaskItemControls/TaskItemControls";

type Props = {
    task: PomodoroTaskItem,
};

const TaskItem = ({
    task
}: Props) => {
    const [taskCount, setTaskCount] = React.useState(task.count);

    return (
        <div className="hover:bg-gray-100 px-4 py-3">
            <div className={cn("flex flex-row items-center cursor-pointer ")}>
                <div className="w-[130px]">{task.category}</div>
                <div className="flex-grow">{task.description}</div>
                <TaskItemControls taskCount={taskCount} setTaskCount={setTaskCount} />
            </div>
        </div>

    );
};

export default TaskItem;