export interface SetRoutineStatus {
    setStatus: (status: SetRoutineStatus.Params) => Promise<void> 
}

export namespace SetRoutineStatus {
    export type Params = 'running' | 'done'
}