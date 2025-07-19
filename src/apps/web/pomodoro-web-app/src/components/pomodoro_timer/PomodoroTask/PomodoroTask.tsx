import * as React from 'react';
import {cn} from "@/libs/utils";

type Props = {
    className?: string;
};

/**
 * Компонент PomodoroTask — простой визуальный элемент для задачи.
 *
 * Props:
 * - className (string, optional): дополнительные CSS-классы.
 *
 * Реализация:
 * - Flexbox центрирует содержимое по горизонтали и вертикали.
 * - Цвет текста — белый с 80% прозрачностью (text-white/80).
 * - Текст по умолчанию — "Задача".
 * - Классы объединяются через функцию cn.
 *
 * Анализ:
 * - Компонент минимален, скорее заглушка.
 * - Нет пропса для передачи текста задачи.
 * - Рекомендуется добавить пропсы для содержимого.
 * - Отсутствует интерактивность.
 * - Использование cn оправдано, но нужно контролировать классы.
 * - Семантика div подходит, зависит от контекста.
 *
 * Итог:
 * - PomodoroTask — базовый компонент, требует расширения.
 */
const PomodoroTask = ({
        className
    }: Props) => {
    return (
        <div className={cn("flex justify-center items-center text-white/80", className)}>
            Задача
        </div>
    );
};

export default PomodoroTask;