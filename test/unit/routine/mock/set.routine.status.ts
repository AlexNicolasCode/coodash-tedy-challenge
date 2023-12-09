import { SetRoutineStatus } from "@/domain/usecase";

export class SetRoutineStatusSpy implements SetRoutineStatus {
    params: SetRoutineStatus.Params

    async setStatus (params: SetRoutineStatus.Params): Promise<void> {
        this.params = params
    }
}