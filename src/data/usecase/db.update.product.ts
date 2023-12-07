import { UpdateProduct, UpdateProductStatusToTrash } from "@/domain/usecase";
import { UpdateProductRepository, UpdateProductStatusRepository } from "../protocol/db";
import { Product } from "@/domain/model";

export class DbUpdateProduct implements UpdateProductStatusToTrash, UpdateProduct {
    constructor (
        private readonly updateProductRepository: UpdateProductRepository,
        private readonly updateProductStatusRepository: UpdateProductStatusRepository
    ) {}

    async update ({ code, product }: UpdateProduct.Request): Promise<Product> {
        return this.updateProductRepository.update({ code, product })
    }

    async updateStatusToTrash (code: number): Promise<void> {
        await this.updateProductStatusRepository.updateStatus({
            code,
            status: 'trash'
        })
    }
}