export interface UpdateProductStatusToTrash {
    updateStatusToTrash: (code: number) => Promise<void> 
}