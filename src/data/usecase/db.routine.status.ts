import { SetRoutineStatus } from "@/domain/usecase";
import { SetRoutineStatusRepository } from "../protocol/db";

export class DbRoutineStatus implements SetRoutineStatus {
    constructor (
        private readonly setRoutineStatusRepository: SetRoutineStatusRepository,
    ) {}

    async setStatus (params: SetRoutineStatus.Params): Promise<void> {
        this.setRoutineStatusRepository.setStatus({
            name: params.name,
            status: params.status,
            date: new Date()
        })
    }
}