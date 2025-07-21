type PomodoroSettings = {
    taskPeriodMinutes: number;
    shortBreakMinutes: number;
    longBreakMinutes: number;
    longBreakInterval: number;
}

/**
 * SettingsService — сервис для управления настройками Pomodoro таймера.
 *
 * Хранит параметры периодов работы и перерывов,
 * а также интервал длинного перерыва.
 * Предоставляет методы для получения и обновления настроек.
 */
export default class SettingsService {
    private settings: PomodoroSettings;

    /**
     * Конструктор инициализирует сервис с дефолтными значениями настроек.
     */
    constructor() {
        this.settings = {
            taskPeriodMinutes: 25,
            shortBreakMinutes: 5,
            longBreakMinutes: 15,
            longBreakInterval: 4
        }
    }

    /**
     * Возвращает текущий объект настроек Pomodoro.
     * @returns {PomodoroSettings} текущие настройки
     */
    getSettings(): PomodoroSettings {
        return this.settings;
    }

    /**
     * Возвращает длительность рабочего периода в минутах.
     * @returns {number} длительность рабочего периода
     */
    getTaskPeriodMinutes(): number {
        return this.settings.taskPeriodMinutes;
    }

    /**
     * Возвращает длительность короткого перерыва в минутах.
     * @returns {number} длительность короткого перерыва
     */
    getShortBreakMinutes(): number {
        return this.settings.shortBreakMinutes;
    }

    /**
     * Возвращает длительность длинного перерыва в минутах.
     * @returns {number} длительность длинного перерыва
     */
    getLongPeriodMinutes(): number {
        return this.settings.longBreakMinutes;
    }

    /**
     * Возвращает интервал между длинными перерывами,
     * то есть количество рабочих периодов перед длинным перерывом.
     * @returns {number} интервал длинного перерыва
     */
    getLongPeriodInterval(): number {
        return this.settings.longBreakInterval;
    }

    /**
     * Обновляет настройки Pomodoro,
     * сливая переданные значения с текущими.
     * @param {PomodoroSettings} newSettings — новые значения настроек
     * @throws {Error} если newSettings не переданы
     */
    updateSettings(newSettings: PomodoroSettings) {
        if (!newSettings) {
            throw new Error("Settings not set.");
        }

        this.settings = { ...this.settings, ...newSettings };
    }
}
