import * as React from 'react';
import { DropDown } from "@/components/inner/dropDown";
import { Plus, Trash } from "lucide-react";
import {cn} from "@/libs/utils";

type TaskActionsMenuProps = {
    taskCount: number;
    setTaskCount: React.Dispatch<React.SetStateAction<number>>;
    children: React.ReactNode;
};

export const TaskActionsMenu: React.FC<TaskActionsMenuProps> = ({ taskCount, setTaskCount, children }) => {
    return (
        <DropDown
            trigger={
                children
            }
        >
            <button
                className="flex w-full items-center gap-2 px-4 py-2 hover:bg-gray-100 transition-colors"
                onClick={(e) => {
                    e.stopPropagation();
                    console.log('Добавить нажатие'); // для проверки срабатывания
                    setTaskCount(count => count + 1)
                } }
            >
                <Plus className="w-4 h-4" /> Добавить
            </button>
            <button
                className={cn("flex w-full items-center gap-2 px-4 py-2 hover:bg-gray-100 text-red-600 transition-colors",
                    taskCount <= 1 && "opacity-50 cursor-not-allowed hover:bg-transparent")}
                onClick={(e) => {
                    e.stopPropagation();
                    if (taskCount > 1) {
                        setTaskCount(count => count - 1);
                    }
                } }
                disabled={taskCount <= 1}
            >
                <Trash className="w-4 h-4" /> Удалить
            </button>
        </DropDown>
    );
};
