import { getTodoAPI, getTodoAPIMaxTime } from "../config";
import { APIError, APIErrorCode } from "./APIError";

const API = getTodoAPI();

/**
 * A generic proxy used to wrap api calls with a common
 * abort and error managment strategy.
 */
export function createAPIProxy<ApiTarget extends object>(
    target: ApiTarget
): ApiTarget { 
    return new Proxy(target, {
        get(target: ApiTarget, property: PropertyKey, receiver: unknown): unknown {
            const targetProperty = Reflect.get(target, property, receiver);

            if (typeof targetProperty !== 'function') {
                return targetProperty;
            }

            return async function (...args: unknown[]): Promise<unknown> {
                const [timeoutId, signal] = getTimoutSignal(getTodoAPIMaxTime());
                try {
                    const extendedArgs = [...args, signal];
                    const result = await targetProperty.apply(target, extendedArgs);
                    clearTimeout(timeoutId);
                    return result;
                } catch (err) {
                    clearTimeout(timeoutId)
                    if (err instanceof APIError && err.errorCode === APIErrorCode.ABORTED) {
                        throw new APIError(`The request was aborted from ${API}`, err);
                    } else if (err instanceof Error) {
                        throw new APIError(`Api error when requesting data from ${API}`, err);
                    } else {
                        throw new  APIError();
                    };
                }
            };
        }
    });
}

function getTimoutSignal (timeout = 15): [NodeJS.Timeout, AbortSignal] {
    console.log(`timeout`, timeout);
    const controller = new AbortController();
    const { signal } = controller;
    const reason = `The request was aborted due delay extended ${timeout}.`;

    const timeoutId = setTimeout(() => controller.abort(
        new APIError(reason, null, APIErrorCode.ABORTED)
    ), timeout);
    return [timeoutId, signal];
}
