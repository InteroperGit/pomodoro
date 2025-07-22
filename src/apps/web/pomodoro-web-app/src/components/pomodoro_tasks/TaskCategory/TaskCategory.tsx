import * as React from 'react';
import { cn } from "@/libs/utils";
import { Dot } from "lucide-react";

type Props = {
    name: string;
    count: number;
};

/**
 * TaskCategory — компонент отображения категории задачи с её количеством.
 *
 * Особенности:
 * - Рамка с плавным изменением цвета фона при наведении
 * - Скруглённые углы и приятный отступ
 */
const TaskCategory = ({ name, count }: Props) => {
    return (
        <div
            className={cn(
                "flex flex-row items-center justify-between",
                "border border-gray-300 rounded-lg p-1",
                "hover:bg-gray-100 transition-colors duration-200",
                "cursor-pointer text-gray-800"
            )}
        >
            <span className="font-medium text-sm">{name}</span>
            <Dot className="w-4 h-4 text-gray-400" />
            <span className="ttext-gray-600 text-sm">{count}</span>
        </div>
    );
};

export default TaskCategory;
