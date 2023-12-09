import { SetRoutineStatus } from "@/domain/usecase";
import { SetRoutineStatusRepository } from "../protocol/db";

export class DbRoutineStatus implements SetRoutineStatus {
    constructor (
        private readonly setRoutineStatusRepository: SetRoutineStatusRepository,
    ) {}

    async setStatus (status: SetRoutineStatus.Params): Promise<void> {
        this.setRoutineStatusRepository.setStatus({
            status,
            date: new Date()
        })
    }
}