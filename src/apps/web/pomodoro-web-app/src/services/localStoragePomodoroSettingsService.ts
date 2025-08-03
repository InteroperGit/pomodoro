import {PomodoroSettings, PomodoroTimerSettings} from "@/types/pomodoroSettings";

/**
 * LocalStoragePomodoroSettingsService — сервис для управления настройками Pomodoro таймера.
 *
 * Хранит параметры периодов работы и перерывов,
 * а также интервал длинного перерыва.
 * Предоставляет методы для получения и обновления настроек.
 */
export default class LocalStoragePomodoroSettingsService {
    private settings: PomodoroSettings;
    private readonly STORAGE_KEY = "pomodoroSettings";

    /**
     * Конструктор инициализирует сервис с дефолтными значениями настроек.
     */
    constructor() {
        const runOnClient = typeof window !== "undefined"

        if (runOnClient) {
            const raw = localStorage.getItem(this.STORAGE_KEY);
            if (raw) {
                try {
                    this.settings = JSON.parse(raw);
                } catch {
                    this.settings = LocalStoragePomodoroSettingsService.getDefault();
                }
            } else {
                this.settings = LocalStoragePomodoroSettingsService.getDefault();
            }
        } else {
            this.settings = LocalStoragePomodoroSettingsService.getDefault();
        }
    }

    /**
     * Возвращает дефолтные настройки Pomodoro.
     */
    private static getDefault(): PomodoroSettings {
        return {
            timerSettings: {
                pomodoroDuration: 25,
                shortBreak: 5,
                longBreak: 15,
                longBreakInterval: 4,
            },
        };
    }


    /**
     * Возвращает текущий объект настроек Pomodoro.
     * @returns {PomodoroSettings} текущие настройки
     */
    getSettings(): PomodoroSettings {
        return this.settings;
    }

    /**
     * Возвращает текущий объект настроек PomodoroTimerSettings
     * @returns {PomodoroTimerSettings} текущие настройки
     */
    getTimerSettings(): PomodoroTimerSettings {
        return this.settings.timerSettings;
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

        this.settings = { ...this.settings, ...newSettings };
        try {
            localStorage.setItem(
                this.STORAGE_KEY,
                JSON.stringify(this.settings)
            );
        } catch (e) {
            console.error("Failed to save Pomodoro settings to localStorage:", e);
        }
    }
}

const pomodoroSettingsService = new LocalStoragePomodoroSettingsService();

export const getPomodoroSettingsService = (): LocalStoragePomodoroSettingsService => (pomodoroSettingsService);