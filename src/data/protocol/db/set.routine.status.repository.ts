export interface SetRoutineStatusRepository {
    setStatus: (params: SetRoutineStatusRepository.Params) => Promise<void> 
}

export namespace SetRoutineStatusRepository {
    export type Params = {
        status: 'running' | 'done'
        date: Date
    }
}