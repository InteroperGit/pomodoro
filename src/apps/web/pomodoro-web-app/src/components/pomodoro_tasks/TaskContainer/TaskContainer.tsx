import * as React from 'react';
import {cn} from "@/libs/utils";
import TaskEditor from "@/components/pomodoro_tasks/TaskEditor/TaskEditor";
import TaskList from "@/components/pomodoro_tasks/TaskList/TaskList";
import {PomodoroTaskItem} from "@/types/pomodoro_task";

type Props = {
    tasks?: PomodoroTaskItem[],
};

const TaskContainer = ({ tasks }: Props) => {
    return (
        <div className={cn("flex flex-col items-center")}>
            <div className="w-full mb-5">
                <TaskEditor />
            </div>

            <div className="w-full">
                <TaskList tasks={tasks} />
            </div>

        </div>
    );
};

export default TaskContainer;