import { APIError } from "./APIError";

/**
 * A generic proxy used to wrap api calls with a common
 * error managment strategy.
 */
export function createAPIProxy<ApiTarget extends object>(
    target: ApiTarget
): ApiTarget { 
    return new Proxy(target, {
        get(target: ApiTarget, property: PropertyKey, receiver: unknown): unknown {
            const targetProperty = Reflect.get(target, property, receiver);

            if (typeof targetProperty !== 'function') {
                return targetProperty
            }

            return async function (...args: unknown[]): Promise<unknown> {
                const [timeoutId, signal] = getTimoutSignal();
                try {
                    const extendedArgs = [...args, signal];
                    const result = await targetProperty.apply(target, extendedArgs);
                    clearTimeout(timeoutId);
                    return result;
                } catch (err) {
                    clearTimeout(timeoutId)
                    if (err instanceof Error && err.name === "AbortError" ) {
                        throw new APIError(err, "The request was aborted")
                    } else if (err instanceof Error) {
                        throw new APIError(err)
                    } else {
                        throw new  APIError()
                    };
                }
            };
        }
    });
}

function getTimoutSignal (timeout = 10000): [NodeJS.Timeout, AbortSignal] {
    const controller = new AbortController();
    const { signal } = controller;
    const reason = `The request was aborted due delay extended ${timeout}.`

    const timeoutId = setTimeout(() => controller.abort(
        new APIError(null, reason)
    ), timeout);
    return [timeoutId, signal];
}
