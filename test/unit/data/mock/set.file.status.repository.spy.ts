import { SetFileStatusRepository } from "@/data/protocol/db";

export class SetFileStatusRepositorySpy implements SetFileStatusRepository {
    params: SetFileStatusRepository.Request

    async setFileStatus (params: SetFileStatusRepository.Request): Promise<void> {
        this.params = params
    }
}