import * as React from 'react';
import {cn} from "@/libs/utils";
import CompletedTaskList from "@/components/pomodoro_complete_tasks/CompletedTaskList/CompletedTaskList";
import CompletedTaskSummary from "@/components/pomodoro_complete_tasks/CompletedTaskSummary/CompletedTaskSummary";

type Props = {

};

const CompletedTaskContainer = (props: Props) => {
    return (
        <div className={cn("flex flex-col items-center gap-5")}>
            <div className="w-full">
                <CompletedTaskSummary />
            </div>

            <div className="w-full">
                <CompletedTaskList />
            </div>
        </div>
    );
};

export default CompletedTaskContainer;