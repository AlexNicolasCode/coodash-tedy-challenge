import { Product } from "@/domain/model";
import { BulkSaveProduct } from "@/domain/usecase";
import { BulkSaveProductRepository } from "../protocol/db";

export class DbSaveProduct implements BulkSaveProduct {
    constructor (
        private readonly bulkSaveProductRepository: BulkSaveProductRepository,
    ) {}

    async bulkSave (products: Product[]): Promise<boolean> {
        try {
            await this.bulkSaveProductRepository.bulkSave(products)
            return true
        } catch(error) {
            return false
        }
    }
}