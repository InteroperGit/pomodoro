import * as React from 'react';
import { DropDown } from "@/components/inner/dropDown";
import { Plus, Minus, Trash } from "lucide-react";
import {cn} from "@/libs/utils";
import {useTaskStore} from "@/stores/pomodoroTaskStore";

type TaskActionsMenuProps = {
    taskId: string;
    taskCount: number;
    setTaskCount: React.Dispatch<React.SetStateAction<number>>;
    children: React.ReactNode;
};

const COMMON_BUTTON_STYLE = "flex w-full items-center gap-2 px-4 py-2 hover:bg-gray-100 transition-colors";

/**
 * TaskActionsMenu — компонент контекстного меню действий над задачей Pomodoro.
 *
 * Назначение:
 * - Отображает всплывающее меню с кнопками для увеличения и уменьшения количества повторений задачи.
 * - Используется внутри карточек задачи для дополнительных действий.
 *
 * Пропсы:
 * @param {string} taskId - идентификатор задачи
 * @param {number} taskCount — текущее количество повторений задачи.
 * @param {React.Dispatch<React.SetStateAction<number>>} setTaskCount — функция обновления счётчика повторений через локальный useState.
 * @param {React.ReactNode} children — элемент-триггер для открытия меню (например, кнопка с иконкой).
 *
 * Логика работы:
 * - При клике на кнопку "Добавить" вызывается `setTaskCount`, увеличивая количество задач на 1.
 * - При клике на кнопку "Удалить" количество уменьшается на 1, но кнопка блокируется (`disabled`), если `taskCount <= 1`, чтобы не допустить значения меньше 1.
 * - Используется событие `stopPropagation()` для предотвращения закрытия меню при клике по кнопке.
 *
 * Стилизация:
 * - Используется Tailwind CSS с утилитой `cn()` для условного добавления классов.
 * - При отключении кнопки "Удалить" добавляется `opacity-50`, `cursor-not-allowed` и убирается фон при наведении.
 *
 * Важные детали реализации:
 * - Меню реализовано через DropDown с порталом (рендерится в `document.body`), что устраняет проблемы с вложенностью DOM.
 * - `console.log()` добавлен для отладки кликов на кнопку "Добавить".
 *
 * Поведение:
 * - Компонент полностью управляется локальным состоянием счётчика.
 * - Простой API: родительский компонент передаёт `taskCount`, `setTaskCount` и элемент-триггер.
 *
 * Применение:
 * - Используется совместно с компонентом TaskItem для управления количеством повторений задачи.
 * - Готов к расширению дополнительными действиями в меню (например, редактирование или удаление задачи).
 */
export const TaskActionsMenu: React.FC<TaskActionsMenuProps> = ({ taskId, taskCount, setTaskCount, children }) => {
    const removeTask = useTaskStore((state) => (state.removeTask));

    const [confirmDelete, setConfirmDelete] = React.useState(false);

    const resetConfirm = React.useCallback(() => setConfirmDelete(false), []);

    // Сброс подтверждения при открытии меню
    const handleOpen = () => resetConfirm();

    return (
        <DropDown
            trigger={
                <div onClick={handleOpen}>
                    {children}
                </div>
            }
        >
            <button
                className={COMMON_BUTTON_STYLE}
                onClick={(e) => {
                    e.stopPropagation();
                    console.log('Добавить нажатие'); // для проверки срабатывания
                    setTaskCount(count => count + 1)
                } }
            >
                <Plus className="w-4 h-4" /> Добавить
            </button>

            <button
                className={
                    cn(COMMON_BUTTON_STYLE,
                        taskCount <= 1 && "opacity-50 cursor-not-allowed hover:bg-transparent")
                }
                onClick={
                    (e) => {
                        e.stopPropagation();
                        if (taskCount > 1) {
                            setTaskCount(count => count - 1);
                        }
                    }
                }
                disabled={taskCount <= 1}
            >
                <Minus className="w-4 h-4" /> Убрать
            </button>

            <button
                className={cn("flex w-full items-center gap-2 px-4 py-2 hover:bg-gray-100",
                    confirmDelete
                        ? "text-white bg-red-600 hover:bg-red-600"
                        : "text-red-600 transition-colors"
                )}
                onClick={(e) => {
                    e.stopPropagation();
                    if (!confirmDelete) {
                        setConfirmDelete(true);
                        return;
                    }
                    removeTask(taskId);
                }}
            >
                <Trash className="w-4 h-4" /> {confirmDelete ? "Удалить?" : "Удалить"}
            </button>
        </DropDown>
    );
};
