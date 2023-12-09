export interface SetRoutineStatus {
    setStatus: (params: SetRoutineStatus.Params) => Promise<void> 
}

export namespace SetRoutineStatus {
    export type Params = {
        name: string
        status: 'running' | 'done' | 'error'
    }
}