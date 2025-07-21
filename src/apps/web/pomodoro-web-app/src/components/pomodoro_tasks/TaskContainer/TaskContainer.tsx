import * as React from 'react';
import {cn} from "@/libs/utils";
import TaskEditor from "@/components/pomodoro_tasks/TaskEditor/TaskEditor";
import TaskList from "@/components/pomodoro_tasks/TaskList/TaskList";
import TaskSummary from "@/components/pomodoro_tasks/TaskSummary/TaskSummary";

type Props = {
};

const TaskContainer = (props: Props) => {
    return (
        <div className={cn("flex flex-col items-center")}>
            <div className="w-full mb-5">
                <TaskSummary />
            </div>

            <div className="w-full mb-5">
                <TaskEditor />
            </div>

            <div className="w-full">
                <TaskList />
            </div>

        </div>
    );
};

export default TaskContainer;