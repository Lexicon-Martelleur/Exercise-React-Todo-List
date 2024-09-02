import { getTodoAPIMaxTime } from "../config";

const root = document.documentElement;

function loadCSSVaribaleDynamically (root: HTMLElement): void {
    root.style.setProperty("--MAX_LOADING_TIME", `${getTodoAPIMaxTime()}s`);
}

loadCSSVaribaleDynamically(root);
