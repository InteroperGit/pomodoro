/**
 * Описывает выполненную Pomodoro-задачу с информацией о времени и категории.
 */
export type CompletedPomodoroTask = {
    /**
     * Уникальный идентификатор задачи.
     */
    id: string;

    /**
     * Категория или тег задачи (например, "Work", "Study").
     */
    category: string;

    /**
     * Краткое описание задачи.
     */
    description: string;

    /**
     * Время начала Pomodoro-сессии.
     */
    timeStart: Date;

    /**
     * Время окончания Pomodoro-сессии.
     */
    timeEnd: Date;
};
