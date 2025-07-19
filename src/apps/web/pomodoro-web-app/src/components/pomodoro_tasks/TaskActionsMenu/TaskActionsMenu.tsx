import * as React from 'react';
import { DropDown } from "@/components/inner/dropDown";
import { Plus, Trash } from "lucide-react";
import {cn} from "@/libs/utils";

type TaskActionsMenuProps = {
    taskCount: number;
    setTaskCount: React.Dispatch<React.SetStateAction<number>>;
    children: React.ReactNode;
};

/**
 * TaskActionsMenu — компонент контекстного меню действий над задачей Pomodoro.
 *
 * Назначение:
 * - Отображает всплывающее меню с кнопками для увеличения и уменьшения количества повторений задачи.
 * - Используется внутри карточек задачи для дополнительных действий.
 *
 * Пропсы:
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
