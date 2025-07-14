import * as React from 'react';
import {cn} from "@/libs/utils";
import {Button} from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";

type Props = {
    taskCount: number,
    setTaskCount: React.Dispatch<React.SetStateAction<number>>;
};

const TaskItemControls = ({
                          taskCount,
                          setTaskCount,
}: Props) => {
    return (
        <div className={cn("flex flex-row items-center gap-2")}>
            <span>01:00</span>
            <Button variant="ghost"
                    className={cn("border border-black/30 w-10 bg-white")}
                    onClick={() => { setTaskCount((count) => (count + 1)); }}
            >
                {taskCount}
            </Button>
            <Button variant="ghost"
                    className={cn("border border-black/30 bg-white w-10 h-9 text-2xl flex items-center",
                                    "justify-center leading-none")} >
                <MoreHorizontal className="w-5 h-5" />
            </Button>
        </div>
    );
};

export default TaskItemControls;