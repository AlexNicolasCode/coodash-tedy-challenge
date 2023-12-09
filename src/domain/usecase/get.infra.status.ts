export interface GetInfraStatus {
    getInfraStatus: () => Promise<GetInfraStatus.Result>
}

export namespace GetInfraStatus {
    export type Result = {
        upTime: number
        memoryUsage: number
    }
}