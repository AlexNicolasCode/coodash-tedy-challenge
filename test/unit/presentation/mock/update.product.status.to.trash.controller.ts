import { UpdateProductStatusToTrash } from "@/domain/usecase";

export class UpdateProductStatusToTrashSpy implements UpdateProductStatusToTrash {
    code: number

    async updateStatusToTrash (code: number): Promise<void> {
        this.code = code
    }
}