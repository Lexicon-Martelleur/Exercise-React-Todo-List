import { getTodoAPIMaxTime } from "../config";


export function loadCSSVaribalesDynamically (root: HTMLElement): void {
    root.style.setProperty("--MAX_LOADING_TIME", `${getTodoAPIMaxTime()}s`);
}
