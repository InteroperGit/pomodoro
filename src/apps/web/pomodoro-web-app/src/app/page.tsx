import {cn} from "@/libs/utils";
import PomodoroTimer from "@/components/pomodoro_timer/PomodoroTimer/PomodoroTimer";
import TaskContainer from "@/components/pomodoro_tasks/TaskContainer/TaskContainer";
import React from "react";
import CompletedTaskContainer from "@/components/pomodoro_complete_tasks/CompletedTaskContainer/CompletedTaskContainer";

/**
 * Компонент Home является корневым компонентом клиентской страницы Pomodoro.
 *
 * Ключевые особенности:
 * - Отображает основной таймер Pomodoro (`PomodoroTimer`) и контейнер со списком задач (`TaskContainer`).
 * - При первом рендере инициализирует задачи из массива `initTasks` и добавляет их в глобальный Zustand store (`useTaskStore`).
 *
 * Логика работы:
 * - При монтировании компонента (пустой массив зависимостей `useEffect`) происходит инициализация стора начальными задачами.
 * - Для генерации уникальных идентификаторов используется `crypto.randomUUID()`, что предотвращает конфликты ключей React.
 * - `addTask` берётся из Zustand стора, который управляет глобальным списком задач в приложении.
 *
 * Структура данных:
 * - `initTasks` — статический массив с начальными задачами (можно расширить или загружать из внешнего источника).
 *
 * Визуальная структура:
 * - Контейнер с максимальной шириной `6xl`, центрирован по горизонтали.
 * - Внутренние отступы `p-5` и вертикальный `gap-5` для отделения компонентов друг от друга.
 * - Отдельные компоненты `PomodoroTimer` и `TaskContainer` инкапсулируют свою логику и UI.
 *
 * Применение:
 * - Является стартовой страницей приложения Pomodoro.
 * - Хорошо подходит как шаблон для страниц с задачами и таймером с использованием Zustand для глобального состояния.
 *
 * Потенциальные улучшения:
 * - Можно добавить проверку на уже существующие задачи в сторе перед добавлением, если компонент будет ререндериться.
 * - Для SSR можно перенести инициализацию данных в более высокий уровень, чтобы избежать зависимости от client-only сторов.
 */
const Home = () => {
    return (
      <div className={cn("container max-w-6xl mx-auto p-5 flex flex-col gap-5")}>
          <PomodoroTimer />
          <TaskContainer />
          <CompletedTaskContainer />
      </div>
    );
}

export default Home;
