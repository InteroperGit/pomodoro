import * as React from 'react';
import {cn} from "@/libs/utils";
import {Button} from "@/components/ui/button";
import {TaskActionsMenu} from "@/components/pomodoro_tasks/TaskActionsMenu/TaskActionsMenu";
import { MoreHorizontal } from "lucide-react";

type Props = {
    taskId: string;
    taskCount: number,
    setTaskCount: React.Dispatch<React.SetStateAction<number>>;
};

/**
 * Компонент TaskItemControls отображает элементы управления задачей в Pomodoro-системе.
 *
 * Состав:
 * - Отображает таймер задачи (в данном примере статичный текст "01:00").
 * - Кнопка увеличения количества задач с отображением текущего количества.
 * - Кнопка с выпадающим меню дополнительных действий (TaskActionsMenu), включая:
 *    - Добавление задачи.
 *    - Удаление задачи (ограничено минимальным количеством).
 *
 * Принимаемые пропсы:
 * @param {string} taskId - идентификатор задачи
 * @param {number} taskCount — текущее количество задач, отображаемое на кнопке счётчика.
 * @param {React.Dispatch<React.SetStateAction<number>>} setTaskCount — функция для обновления количества задач, пробрасываемая вниз в дочерние компоненты.
 *
 * Поведение:
 * - При нажатии на кнопку-счётчик (`taskCount`), количество задач увеличивается на 1.
 * - При нажатии на кнопку с иконкой MoreHorizontal открывается выпадающее меню TaskActionsMenu.
 * - В меню доступны действия добавления и удаления задач с соответствующей логикой (например, блокировка удаления при taskCount <= 1).
 *
 * Используемые библиотеки:
 * - Компоненты Button из shadcn/ui.
 * - Иконки из библиотеки lucide-react.
 * - Служебная функция cn() для объединения CSS классов.
 * - Компонент TaskActionsMenu для управления дополнительными действиями.
 *
 * Особенности:
 * - TaskActionsMenu реализован с кастомным DropDown и учитывает клики вне меню.
 * - Компонент полностью управляем внешним состоянием (taskCount передаётся из родительского компонента).
 *
 * Этот компонент хорошо подходит для переиспользования в списке задач Pomodoro, сохраняя логику счётчика и дополнительного управления в компактной форме.
 */
const TaskItemControls = ({
                          taskId,
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

            <TaskActionsMenu taskId={taskId} taskCount={taskCount} setTaskCount={setTaskCount}>
                <Button
                    variant="ghost"
                    className={cn(
                        "border border-black/30 bg-white w-10 h-9 text-2xl flex items-center justify-center leading-none"
                    )}
                >
                    <MoreHorizontal className="w-5 h-5" />
                </Button>
            </TaskActionsMenu>
        </div>
    );
};

export default TaskItemControls;