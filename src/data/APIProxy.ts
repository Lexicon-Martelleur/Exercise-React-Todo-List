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
                try {
                    return await targetProperty.apply(target, args);
                } catch (err) {
                    const internalErr = err instanceof Error ? err : undefined
                    throw new APIError(internalErr);
                }
            };
        }
    });
}
