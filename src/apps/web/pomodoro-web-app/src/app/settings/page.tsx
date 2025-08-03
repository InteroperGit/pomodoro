import * as React from 'react';
import PomodoroTimerSettingsForm, {SettingsFormValues} from "@/components/pomodoro_settings/PomodoroTimerSettingsForm";

type Props = {
    
};

const Page = (props: Props) => {
    return (
        <div className="container mx-auto p-4 max-w-6xl">
            <h1 className="text-2xl font-bold mb-4">Настройки Pomodoro</h1>

            <PomodoroTimerSettingsForm />
        </div>
    );
};

export default Page;