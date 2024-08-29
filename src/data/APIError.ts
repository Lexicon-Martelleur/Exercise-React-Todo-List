import { getTodoAPI, isDevelopment } from "../config"

const errorMsg = `Api error from ${getTodoAPI()}`

export const APIErrorCode = {
    DEFAULT: 0, 
    ABORTED: 1
} as const;

export type APIErrorCodeType = typeof APIErrorCode[
    keyof typeof APIErrorCode
]

export class APIError extends Error {
    readonly name = "APIError"
    readonly internalError: Error | null;
    readonly errorCode: APIErrorCodeType; 

    constructor(
        message?: string | null,
        internalError?: Error | null,
        erroCode?: APIErrorCodeType | null
    ) {
        super(message ? message : errorMsg);
        this.internalError = internalError ?? null;
        this.errorCode = erroCode ?? APIErrorCode.DEFAULT; 
        
        if (isDevelopment()) {
            console.log(`Error: ${errorMsg}`);
            internalError != null && console.log(`Internal error: ${internalError}`);
        } else {
            console.log(`Error: ${errorMsg}`);
        }
    }
}
