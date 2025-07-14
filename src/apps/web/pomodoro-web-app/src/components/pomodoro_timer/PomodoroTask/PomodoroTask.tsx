import * as React from 'react';
import {cn} from "@/libs/utils";

type Props = {
    className?: string;
};

const PomodoroTask = ({
        className
    }: Props) => {
    return (
        <div className={cn("flex justify-center items-center text-white/80", className)}>
            Задача
        </div>
    );
};

export default PomodoroTask;