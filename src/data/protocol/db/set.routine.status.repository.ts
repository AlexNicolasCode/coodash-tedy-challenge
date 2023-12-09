export interface SetRoutineStatusRepository {
    setStatus: (params: SetRoutineStatusRepository.Params) => Promise<void> 
}

export namespace SetRoutineStatusRepository {
    export type Params = {
        name: string
        status: 'running' | 'done' | 'error'
        date: Date
    }
}