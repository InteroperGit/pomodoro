type InitFn = () => void | Promise<void>;

const initializers: InitFn[] = [];

/**
 * Регистрирует функцию, которая будет вызвана при старте приложения.
 */
export function registerBootstrapInitializer(fn: InitFn) {
    initializers.push(fn);
}

export async function bootstrap() {
    for (const init of  initializers) {
        await init();
    }
}