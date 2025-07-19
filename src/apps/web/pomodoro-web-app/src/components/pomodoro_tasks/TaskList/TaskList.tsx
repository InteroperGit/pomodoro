"use client"

import * as React from 'react';
import {cn} from "@/libs/utils";
import TaskItem from "@/components/pomodoro_tasks/TaskItem/TaskItem";
import {useTaskStore} from "@/stores/pomodoroTaskStore";

type Props = {
};

/**
 * Компонент TaskList отображает список задач Pomodoro.
 *
 * Основная цель компонента — получить список задач из состояния стора (useTaskStore) и отобразить их с использованием компонента TaskItem.
 *
 * Ключевые особенности:
 * - Используется Zustand store (useTaskStore) для управления состоянием задач на клиенте.
 * - Каждая задача отображается внутри <div> с обёрткой и стилизацией.
 * - Для первой задачи добавляется верхняя граница (`border-t`), чтобы визуально отделить список от остального контента.
 *
 * Технические детали:
 * @param {Props} props — пустой объект пропсов; компонент не принимает внешних параметров.
 *
 * Состав компонента:
 * - `tasks` — массив задач из Zustand стора.
 * - Рендеринг задач через метод `.map()` с использованием компонента TaskItem для каждой задачи.
 * - У каждой задачи задаётся уникальный `key` по идентификатору задачи (task.id), что важно для оптимизации React-рендеринга.
 *
 * Используемые библиотеки:
 * - Zustand (`useTaskStore`) для управления состоянием задач.
 * - Утилита cn() для условного объединения CSS классов (tailwind).
 * - Компонент TaskItem — отрисовка отдельной задачи.
 *
 * Поведение:
 * - Если `tasks` пустой или undefined — список не отображает ничего (нет задачи — нет DOM-элементов).
 * - При изменении состояния стора, компонент автоматически реагирует на изменения благодаря подписке на Zustand.
 *
 * Применение:
 * - Используется в клиентских компонентах Next.js (директива "use client").
 * - Идеально подходит для отображения динамического списка задач с реактивным обновлением.
 */
const TaskList = (props: Props) => {
    const tasks = useTaskStore((state) => state.tasks);

    return (
        <div className={cn("flex flex-col items-center")}>
            {
                tasks?.map((task, index) => (
                    <div key={task.id}
                         className={cn("w-full",
                             "border-b border-black/20 text-black/80",
                             index === 0 && "border-t")}>
                        <TaskItem task={task} />
                    </div>
                ))
            }
        </div>
    );
};

export default TaskList;