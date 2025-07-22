"use client"

import * as React from 'react';
import {cn} from "@/libs/utils";
import {useTaskStore} from "@/stores/pomodoroTaskStore";
import TaskCategory from "@/components/pomodoro_tasks/TaskCategory/TaskCategory";

type Props = {

};

const TaskCategoryList = (props: Props) => {
    const categories = useTaskStore((state) => state.categories);

    return (
        <div className={cn("flex flex-row items-center gap-5")}>
            <div className={cn("text-black/50")}>Категории</div>
            <div className={cn("flex flex-row items-center gap-5")}>
                {
                    categories.map((category) => (
                        <div key={category.id}>
                            <TaskCategory name={category.name} count={category.taskCount} />
                        </div>
                    ))
                }
            </div>
        </div>
    );
};

export default TaskCategoryList;