import * as React from 'react';
import {cn} from "@/libs/utils";
import TaskEditor from "@/components/pomodoro_tasks/TaskEditor/TaskEditor";
import TaskList from "@/components/pomodoro_tasks/TaskList/TaskList";
import TaskSummary from "@/components/pomodoro_tasks/TaskSummary/TaskSummary";
import TaskCategoryList from "@/components/pomodoro_tasks/TaskCategoryList/TaskCategoryList";

type Props = {
};

const TaskContainer = (props: Props) => {
    return (
        <div className={cn("flex flex-col items-center gap-5")}>
            <div className="w-full">
                <TaskSummary />
            </div>

            <div className="w-full">
                <TaskEditor />
            </div>

            <div className="w-full">
                <TaskList />
            </div>

            <div className="w-full">
                <TaskCategoryList />
            </div>
        </div>
    );
};

export default TaskContainer;