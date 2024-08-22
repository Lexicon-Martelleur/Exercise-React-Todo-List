export interface IPaginationMetaData {
    TotalItemCount: number;
    TotalPageCount: number;
    PageSize: number;
    CurrentPage: number;
}

export function isPaginationMetaData(obj: unknown): obj is IPaginationMetaData {
    if (obj == null || typeof obj !== "object") {
        return false
    }

    const castedObj = obj as IPaginationMetaData

    return (
        typeof castedObj.TotalItemCount === "number" &&
        typeof castedObj.TotalPageCount === "number" &&
        typeof castedObj.PageSize === "number" &&
        typeof castedObj.CurrentPage === "number"
    );
} 
