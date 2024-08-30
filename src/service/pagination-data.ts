export interface IPaginationData {
    TotalItemCount: number;
    TotalPageCount: number;
    PageSize: number;
    PageNr: number;
}

export function isPaginationData(obj: unknown): obj is IPaginationData {
    if (obj == null || typeof obj !== "object") {
        return false
    }

    const castedObj = obj as IPaginationData

    return (
        typeof castedObj.TotalItemCount === "number" &&
        typeof castedObj.TotalPageCount === "number" &&
        typeof castedObj.PageSize === "number" &&
        typeof castedObj.PageNr === "number"
    );
} 
