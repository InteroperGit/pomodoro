import * as React from 'react';
import { Input } from "@/components/ui/input"
import {cn} from "@/libs/utils";
import {Button} from "@/components/ui/button";
import { HiPlus } from "react-icons/hi";

type Props = {

};

const TaskEditor = (props: Props) => {
    return (
        <div className={cn("flex flex-row gap-2 justify-around")}>
            {/* Первый input: фиксированная ширина 150px */}
            <Input
                className="w-[150px] border border-gray-400 placeholder:text-gray-400"
                placeholder="Категория"
            />

            {/* Второй input: занимает оставшееся пространство */}
            <Input
                className="flex-grow border border-gray-400 placeholder:text-gray-400"
                placeholder="Описание задачи"
            />

            {/* Кнопки: стандартные, но variant="ghost" */}
            <Button variant="ghost" className="border border-gray-400">
                <HiPlus />
            </Button>
        </div>
    );
};

export default TaskEditor;