import * as React from 'react';
import {cn} from "@/libs/utils";
import {PomodoroTaskItem} from "@/types/pomodoro_task";
import TaskItem from "@/components/pomodoro_tasks/TaskItem/TaskItem";

type Props = {
    tasks?: PomodoroTaskItem[],
};

const TaskList = ({
                  tasks
                }: Props) => {

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