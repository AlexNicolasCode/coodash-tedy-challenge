export interface ChangeProductStatusToTrash {
    change_status_to_trash: (code: number) => Promise<void> 
}