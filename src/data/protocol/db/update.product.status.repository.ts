export interface UpdateProductStatusRepository {
    updateStatus: (params: UpdateProductStatusRepository.Request) => Promise<void> 
}

export namespace UpdateProductStatusRepository {
    export type Request = {
        code: number
        status: 'draft' | 'trash' | 'published'
    }
}