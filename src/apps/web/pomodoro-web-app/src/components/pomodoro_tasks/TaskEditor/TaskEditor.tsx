"use client"

import * as React from 'react';
import { Input } from "@/components/ui/input"
import {cn} from "@/libs/utils";
import {Button} from "@/components/ui/button";
import { HiPlus } from "react-icons/hi";
import { useTaskStore } from "@/stores/pomodoroTaskStore";

type Props = {

};

const TaskEditor = (props: Props) => {
    const [category, setCategory] = React.useState("");
    const [description, setDescription] = React.useState("");

    const addTask = useTaskStore((state) => state.addTask);

    const handleAdd = () => {
        if (!category.trim() || !description.trim()) {
            return;
        }

        addTask({ category, description, count: 0 });
        setCategory("");
        setDescription("");
    }

    return (
        <div className={cn("flex flex-row gap-2 justify-around")}>
            {/* Первый input: фиксированная ширина 150px */}
            <Input
                className="w-[150px] border border-gray-400 placeholder:text-gray-400"
                placeholder="Категория"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
            />

            {/* Второй input: занимает оставшееся пространство */}
            <Input
                className="flex-grow border border-gray-400 placeholder:text-gray-400"
                placeholder="Описание задачи"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            />

            {/* Кнопки: стандартные, но variant="ghost" */}
            <Button variant="ghost"
                    className="border border-gray-400"
                    onClick={handleAdd}>
                <HiPlus />
            </Button>
        </div>
    );
};

export default TaskEditor;