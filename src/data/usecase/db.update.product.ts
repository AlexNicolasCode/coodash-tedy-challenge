import { UpdateProductStatusToTrash } from "@/domain/usecase";
import { UpdateProductStatusRepository } from "../protocol/db";

export class DbUpdateProduct implements UpdateProductStatusToTrash {
    constructor (
        private readonly updateProductStatusRepository: UpdateProductStatusRepository
    ) {}

    async updateStatusToTrash (code: number): Promise<void> {
        await this.updateProductStatusRepository.updateStatus({
            code,
            status: 'trash'
        })
    }
}