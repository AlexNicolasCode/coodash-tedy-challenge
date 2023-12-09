import { CheckDatabaseConnection, GetInfraStatus, GetLastRoutineExecutionDate } from "@/domain/usecase";
import { Controller } from "@/presentation/protocol/controller";
import { HttpResponse } from "@/presentation/protocol";
import { ok, serverError } from "@/presentation/helper";

export class GetAppDataController implements Controller<GetAppData.Request, GetAppData.Result> {
    constructor (
        private readonly checkDatabaseConnection: CheckDatabaseConnection,
        private readonly getInfraStatus: GetInfraStatus,
        private readonly getLastRoutineExecutionDate: GetLastRoutineExecutionDate
    ) {}

    async handle (request: GetAppData.Request): Promise<HttpResponse<GetAppData.Result>> {
        try {
            const isConnect = await this.checkDatabaseConnection.checkConnection()
            const databaseConnection = isConnect ? 'connected' : 'disconnected'
            const { upTime, memoryUsage } = await this.getInfraStatus.getInfraStatus()
            const lastCronExecution = await this.getLastRoutineExecutionDate.getLastRoutineExecutionDate()
            return ok({
                databaseConnection,
                upTimeSeconds: upTime,
                memoryUsage: memoryUsage,
                lastCronExecution: lastCronExecution
            })          
        } catch (error) {
            return serverError()
        }
    }
}

export namespace GetAppData {
    export type Request = {}
    export type Result = {
        databaseConnection: 'connected' | 'disconnected'
        upTimeSeconds: number
        memoryUsage: number
        lastCronExecution: Date
    }
}