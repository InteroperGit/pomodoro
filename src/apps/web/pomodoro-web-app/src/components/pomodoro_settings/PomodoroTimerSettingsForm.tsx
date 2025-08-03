"use client"

import * as React from 'react';
import {Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import equal from 'fast-deep-equal';
import * as z from "zod";
import {PomodoroTimerSettings} from "@/types/pomodoroSettings";
import {usePomodoroSettingsStore} from "@/stores/pomodoroSettingsStore";

// Схема валидации с помощью Zod
const settingsFormSchema = z.object({
    pomodoroDuration: z
        // initial‐type error:
        .number({ error: "Введите число" })
        // range‐check error:
        .min(1, { error: "Минимум 1 минута" }),

    shortBreak: z
        .number({ error: "Введите число" })
        .min(1, { error: "Минимум 1 минута" }),

    longBreak: z
        .number({ error: "Введите число" })
        .min(1, { error: "Минимум 1 минута" }),

    longBreakInterval: z
        .number({ error: "Введите число" })
        .min(1, { error: "Минимум 1 помидор" }),
});

const fieldData: { name: string, label: string, desc: string }[] = [
    { name: 'pomodoroDuration', label: 'Продолжительность помидора', desc: 'в минутах' },
    { name: 'shortBreak',       label: 'Продолжительность короткого перерыва', desc: 'в минутах' },
    { name: 'longBreak',        label: 'Продолжительность длинного перерыва', desc: 'в минутах' },
    { name: 'longBreakInterval',label: 'Длинный перерыв через каждые', desc: 'Количество помидоров' },
];

export type SettingsFormValues = z.infer<typeof settingsFormSchema>

// Убираем ведущие нули, оставляя хотя бы одну цифру
const stripLeadingZeros = (value: string) => {
    // Regex: удаляем нули перед значащей цифрой
    return value.replace(/^0+(?=\d)/, '');
};

type Props = {
};

const PomodoroTimerSettingsForm = (props: Props) => {
    const timerSettings = usePomodoroSettingsStore((state) => state.settings.timerSettings);
    const saveTimerSettings = usePomodoroSettingsStore((state) => state.saveTimerSettings);

    const form = useForm<SettingsFormValues>({
        resolver: zodResolver(settingsFormSchema),
        defaultValues: {
            pomodoroDuration: timerSettings?.pomodoroDuration ?? 25,
            shortBreak: timerSettings?.shortBreak ?? 5,
            longBreak: timerSettings?.longBreak ?? 15,
            longBreakInterval: timerSettings?.longBreakInterval ?? 4,
        },
    });

    const defaultValuesRef = React.useRef(form.getValues());

    // подписываемся на все поля
    const watchedValues = form.watch();

    // вычисляем, вернулось ли всё в начальное состояние
    const canSubmit = React.useMemo(
        () => (
            !equal(watchedValues, defaultValuesRef.current) && form.formState.isValid
        ),
        [watchedValues, form.formState.isValid]
    );

    // Хендлер для числовых инпутов с удалением ведущих нулей
    const createNumberHandler = (field: any) => (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        let str = e.target.value;
        str = stripLeadingZeros(str);
        const val = str === '' ? 0 : parseInt(str, 10);
        field.onChange(val);
    };

    const onSubmit = (data: SettingsFormValues) => {
        const newSettings: PomodoroTimerSettings = data as PomodoroTimerSettings;
        saveTimerSettings(newSettings);

        // Обновляем форму и исходные значения
        form.reset(data);
        defaultValuesRef.current = data;
    }

    return (
        <div>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    {fieldData.map(({ name, label, desc }) => (
                        <FormField
                            key={name}
                            control={form.control}
                            name={name as any}
                            render={({ field }) => (
                                <FormItem className="flex items-start space-x-2">
                                    <FormLabel className="m-0 mt-3 w-1/5">{label}</FormLabel>
                                    <div className="flex-1 flex flex-col gap-2">
                                        <FormControl>
                                            <Input
                                                type="number"
                                                min={1}
                                                value={stripLeadingZeros(String(field.value)) ?? "0"}
                                                onChange={createNumberHandler(field)}
                                                onBlur={field.onBlur}
                                            />
                                        </FormControl>
                                        <FormDescription>{desc}</FormDescription>
                                    </div>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    ))}
                    <div className="flex justify-end">
                        <Button type="submit" variant="outline" disabled={!canSubmit}>
                            Сохранить
                        </Button>
                    </div>
                </form>
            </Form>
        </div>
    );
};

export default PomodoroTimerSettingsForm;