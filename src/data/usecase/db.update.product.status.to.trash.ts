import { ChangeProductStatusToTrash } from "@/domain/usecase";
import { UpdateProductStatusRepository } from "../protocol/db";

export class DbUpdateProductStatusToTrash implements ChangeProductStatusToTrash {
    constructor (
        private readonly updateProductStatusRepository: UpdateProductStatusRepository
    ) {}

    async changeStatusToTrash (code: number): Promise<void> {
        await this.updateProductStatusRepository.updateStatus({
            code,
            status: 'trash'
        })
    }
}