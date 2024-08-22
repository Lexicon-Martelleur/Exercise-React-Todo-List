export function getTodoAPI (): string {
    return import.meta.env.VITE_TODO_API;
}

export function isDevelopment (): boolean {
    return import.meta.env.DEV;
}
