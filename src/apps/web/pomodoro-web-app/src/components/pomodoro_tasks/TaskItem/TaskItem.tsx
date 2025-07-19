"use client"

import * as React from 'react';
import {cn} from "@/libs/utils";
import {PomodoroTask} from "@/types/pomodoroTask";
import TaskItemControls from "@/components/pomodoro_tasks/TaskItemControls/TaskItemControls";

type Props = {
    task: PomodoroTask,
};

/**
 * Компонент TaskItem представляет одну задачу Pomodoro с возможностью локального управления количеством повторений задачи.
 *
 * Основные функции:
 * - Отображает категорию задачи, описание и контролы управления количеством повторений.
 * - Использует локальное состояние React для управления текущим счётчиком повторений задачи.
 *
 * Пропсы:
 * @param {PomodoroTask} task — объект задачи с полями category, description, count и другими данными, определёнными в типе PomodoroTask.
 *
 * Поведение:
 * - Инициализирует локальный стейт `taskCount` значением `task.count` для изолированного управления количеством внутри компонента.
 * - Использует `TaskItemControls` для отображения UI-контролов увеличения/уменьшения количества.
 * - При изменении счётчика (taskCount) обновляется только локальное состояние, родительский стор (если он есть) не изменяется.
 *
 * Состав компонента:
 * - Блок с category фиксированной ширины.
 * - Описание задачи с флекс-растягиванием.
 * - Блок контролов (`TaskItemControls`) с передачей стейта счётчика.
 * - Визуальное выделение строки при наведении (hover:bg-gray-100).
 *
 * Важные детали реализации:
 * - Директива "use client" указывает, что компонент исполняется на клиенте (Next.js).
 * - Стилизация выполнена с помощью TailwindCSS и утилиты cn для управления классами.
 * - `TaskItemControls` инкапсулирует логику увеличения/уменьшения счётчика с дополнительными действиями через DropDown.
 *
 * Ограничение текущей реализации:
 * - Локальный `taskCount` не синхронизируется с глобальным состоянием — изменение количества задач не влияет на родительский store.
 * - Для синхронизации с глобальным состоянием потребуется дополнительная логика с колбэком или интеграцией Zustand.
 *
 * Подходит для:
 * - Отображения и локального управления отдельными задачами в списке.
 * - Быстрой интеграции с UI, где не требуется глобальная синхронизация количества задач.
 */
const TaskItem = ({
    task
}: Props) => {
    const [taskCount, setTaskCount] = React.useState(task.count);

    return (
        <div className="hover:bg-gray-100 px-4 py-3">
            <div className={cn("flex flex-row items-center cursor-pointer ")}>
                <div className="w-[130px]">{task.category}</div>
                <div className="flex-grow">{task.description}</div>
                <TaskItemControls taskCount={taskCount} setTaskCount={setTaskCount} />
            </div>
        </div>

    );
};

export default TaskItem;