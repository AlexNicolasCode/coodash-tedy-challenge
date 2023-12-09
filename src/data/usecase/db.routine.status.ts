import { GetLastRoutineExecutionDate, SetRoutineStatus } from "@/domain/usecase";
import { GetLastRoutineExecutionDateRepository, SetRoutineStatusRepository } from "../protocol/db";

export class DbRoutineStatus implements SetRoutineStatus, GetLastRoutineExecutionDate {
    constructor (
        private readonly setRoutineStatusRepository: SetRoutineStatusRepository,
        private readonly getLastRoutineExecutionDateRepository: GetLastRoutineExecutionDateRepository
    ) {}

    async setStatus (params: SetRoutineStatus.Params): Promise<void> {
        this.setRoutineStatusRepository.setStatus({
            name: params.name,
            status: params.status,
            date: new Date()
        })
    }

    async getLastRoutineExecutionDate (): Promise<Date> {
        return this.getLastRoutineExecutionDateRepository.getLastRoutineExecutionDate();
    }
}