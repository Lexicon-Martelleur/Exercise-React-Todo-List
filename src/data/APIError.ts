import { getTodoAPI, isDevelopment } from "../config"

const errorMsg = `Api error from ${getTodoAPI()}`

export class APIError extends Error {
    readonly name = "APIError"
    readonly internalError: Error | null;

    constructor(internalError?: Error) {
        super(errorMsg)
        this.internalError = internalError ?? null 
        if (isDevelopment()) {
            console.log(`Error: ${errorMsg}`)
            internalError != null && console.log(`Internal error: ${internalError.message}`)
        }
    }
}