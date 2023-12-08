export interface SetFileStatusRepository {
    setFileStatus: (params: SetFileStatusRepository.Request) => Promise<void>
}

export namespace SetFileStatusRepository {
    export type Request = {
        name: string,
        status: 'error' | 'fetched' | 'applied'
    }
}