export interface ChangeProductStatusToTrash {
    changeStatusToTrash: (code: number) => Promise<void> 
}