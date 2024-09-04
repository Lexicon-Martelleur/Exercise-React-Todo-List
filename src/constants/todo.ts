export const todoConstants = {
    MIN_LENGTH_AUTHOR: 1,
    MIN_LENGTH_TITLE: 1,
    MIN_LENGTH_DESCRIPTION: 1,
    MAX_LENGTH_AUTHOR: 200,
    MAX_LENGTH_TITLE: 200,
    MAX_LENGTH_DESCRIPTION: 2000,
} as const;

export const todoOperation = {
    CREATE: "CREATE",
    DELETE: "DELETE",
    PUT: "PUT",
    PATCH: "PATCH"
} as const
