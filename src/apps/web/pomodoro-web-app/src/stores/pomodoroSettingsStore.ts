import {PomodoroSettings, PomodoroTimerSettings} from "@/types/pomodoroSettings";
import {create} from "zustand";
import {getPomodoroSettingsService} from "@/services/localStoragePomodoroSettingsService";
import {registerBootstrapInitializer} from "@/bootstrap/bootstrap";

type PomodoroSettingsStore = {
    settings: PomodoroSettings;
    initSettings: () => void;
    saveTimerSettings: (timerSettings: PomodoroTimerSettings) => void;
}

const settingsService = getPomodoroSettingsService();

export const usePomodoroSettingsStore = create<PomodoroSettingsStore>((set) => {
    const initializeSettings = settingsService.getSettings();

    return {
        settings: initializeSettings,
        initSettings:  () => {
            set((state) =>
            {
                const tSettings = settingsService.getTimerSettings();

                return {
                    settings: {
                        timerSettings: {
                            ...tSettings,
                        }
                    }
                }
            });
        },
        saveTimerSettings: (timerSettings: PomodoroTimerSettings) => {
            set((state) => {

                const newSettings = {
                    ...state.settings,
                    timerSettings: { ...timerSettings },
                }

                settingsService.updateSettings(newSettings);

                return {
                    settings: {
                        timerSettings: { ...timerSettings },
                    }
                }
            });
        },
    }
});

registerBootstrapInitializer(() => {
    usePomodoroSettingsStore.getState().initSettings();
});

