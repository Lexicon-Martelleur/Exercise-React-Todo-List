export function getTodoAPI (): string {
    return import.meta.env.VITE_TODO_API;
}

export function isDevelopment (): boolean {
    return import.meta.env.DEV;
}

export function getTodoAPIMaxTimeSeconds (): number {
    return Number(import.meta.env.VITE_TODO_API_MAX_TIME);
}

export function getTodoAPIMaxTimeMilliSeconds (): number {
    return Number(import.meta.env.VITE_TODO_API_MAX_TIME) * 1000;
}
