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

export type SettingsFormValues = z.infer<typeof settingsFormSchema>

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
    const isPristine = React.useMemo(
        () => (
            equal(watchedValues, defaultValuesRef.current)
        ),
        [watchedValues]
    );

    const onSubmit = (data: SettingsFormValues) => {
        const newSettings: PomodoroTimerSettings = data as PomodoroTimerSettings;
        saveTimerSettings(newSettings);
    }

    return (
        <div>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    {/* Продолжительность помидора */}
                    <FormField
                        control={form.control}
                        name="pomodoroDuration"
                        render={({ field }) => (
                            <FormItem className="flex items-start space-x-2">
                                <FormLabel className="m-0 mt-3 w-1/5">Продолжительность помидора</FormLabel>
                                <div className="flex-1 flex flex-col gap-2">
                                    <FormControl>
                                        <Input
                                            type="number"
                                            min={1}
                                            value={field.value}
                                            onChange={(e) => {
                                                const val = e.target.value;
                                                // Если строка пустая, сбрасываем значение в undefined,
                                                // иначе тащим число из valueAsNumber
                                                field.onChange(val === '' ? 0 : e.target.valueAsNumber);
                                            }}
                                            onBlur={field.onBlur}
                                        />
                                    </FormControl>
                                    <FormDescription>в минутах</FormDescription>
                                </div>

                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* Продолжительность короткого перерыва */}
                    <FormField
                        control={form.control}
                        name="shortBreak"
                        render={({ field }) => (
                            <FormItem className="flex items-start space-x-2">
                                <FormLabel className="m-0 mt-2 w-1/5">Продолжительность короткого перерыва</FormLabel>
                                <div className="flex-1 flex flex-col gap-2">
                                    <FormControl>
                                        <Input
                                            type="number"
                                            min={1}
                                            value={field.value}
                                            onChange={(e) => {
                                                const val = e.target.value;
                                                // Если строка пустая, сбрасываем значение в undefined,
                                                // иначе тащим число из valueAsNumber
                                                field.onChange(val === '' ? 0 : e.target.valueAsNumber);
                                            }}
                                            onBlur={field.onBlur}
                                        />
                                    </FormControl>
                                    <FormDescription>в минутах</FormDescription>
                                </div>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* Продолжительность длинного перерыва */}
                    <FormField
                        control={form.control}
                        name="longBreak"
                        render={({ field }) => (
                            <FormItem className="flex items-start space-x-2">
                                <FormLabel className="m-0 mt-2 w-1/5">Продолжительность длинного перерыва</FormLabel>
                                <div className="flex-1 flex flex-col gap-2">
                                    <FormControl>
                                        <Input
                                            type="number"
                                            min={1}
                                            value={field.value}
                                            onChange={(e) => {
                                                const val = e.target.value;
                                                // Если строка пустая, сбрасываем значение в undefined,
                                                // иначе тащим число из valueAsNumber
                                                field.onChange(val === '' ? 0 : e.target.valueAsNumber);
                                            }}
                                            onBlur={field.onBlur}
                                        />
                                    </FormControl>
                                    <FormDescription>в минутах</FormDescription>
                                </div>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* Длинный перерыв через каждые */}
                    <FormField
                        control={form.control}
                        name="longBreakInterval"
                        render={({ field }) => (
                            <FormItem className="flex items-start space-x-2">
                                <FormLabel className="m-0 mt-3 w-1/5">Длинный перерыв через каждые</FormLabel>
                                <div className="flex-1 flex flex-col gap-2">
                                    <FormControl>
                                        <Input
                                            type="number"
                                            min={1}
                                            value={field.value}
                                            onChange={(e) => {
                                                const val = e.target.value;
                                                // Если строка пустая, сбрасываем значение в undefined,
                                                // иначе тащим число из valueAsNumber
                                                field.onChange(val === '' ? 0 : e.target.valueAsNumber);
                                            }}
                                            onBlur={field.onBlur}
                                        />
                                    </FormControl>
                                    <FormDescription>Количество помидоров</FormDescription>
                                </div>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <div className="flex justify-end">
                        <Button type="submit" variant={"outline"} disabled={isPristine}>Сохранить</Button>
                    </div>
                </form>
            </Form>
        </div>
    );
};

export default PomodoroTimerSettingsForm;