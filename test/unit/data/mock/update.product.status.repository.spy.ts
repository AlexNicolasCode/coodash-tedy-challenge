import { UpdateProductStatusRepository } from "@/data/protocol/db";

export class UpdateProductStatusRepositorySpy implements UpdateProductStatusRepository {
    params: UpdateProductStatusRepository.Request

    async updateStatus (params: UpdateProductStatusRepository.Request): Promise<void> {
        this.params = params
    }
}