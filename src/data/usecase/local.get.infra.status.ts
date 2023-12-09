import { GetInfraStatus } from "@/domain/usecase";

export class LocalGetInfraStatus implements GetInfraStatus {
    constructor () {}

    async getInfraStatus (): Promise<GetInfraStatus.Result> {
        const upTimeInSeconds = Math.floor(process.uptime())
        const memoryUsed = process.memoryUsage().heapUsed
        return {
            upTime: upTimeInSeconds,
            memoryUsage: memoryUsed,
        }
    }
}