"use client";

import React from "react";
import { bootstrap } from "@/bootstrap/bootstrap";
import {PomodoroTask} from "@/types/pomodoroTask";
import {useTaskStore} from "@/stores/pomodoroTaskStore";
import {useCompletedTaskStore} from "@/stores/completedPomodoroTaskStore";

const initTasks: PomodoroTask[] = [{
    id: crypto.randomUUID(),
    category: "test",
    description: "test",
    count: 1,
}, {
    id: crypto.randomUUID(),
    category: "test",
    description: "test2",
    count: 1,
}];

const initCompletedTasks: PomodoroTask[] = [{
    id: crypto.randomUUID(),
    category: "test",
    description: "test",
    count: 1
}, {
    id: crypto.randomUUID(),
    category: "test",
    description: "test2",
    count: 1
}]

const Bootstrap = () => {
    const addTask = useTaskStore((state) => state.addTask);
    const addCompletedTask = useCompletedTaskStore((state) => state.addTask);
    const tasks = useTaskStore((state) => state.tasks);

    React.useEffect(() => {
        if (tasks.length > 0) {
            return;
        }

        initTasks.map((task) => {
            addTask(task);
        });

        initCompletedTasks.map((task) => {
            addCompletedTask(task, new Date(Date.now() - 25 * 60 * 1000));
        });
    }, [tasks.length]);

    React.useEffect(() => {
        bootstrap();
    }, []);

    return null;
}

export default Bootstrap;
