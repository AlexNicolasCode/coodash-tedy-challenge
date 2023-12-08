import { BulkSaveProductRepository } from "@/data/protocol/db";
import { Product } from "@/domain/model";

export class BulkSaveProductRepositorySpy implements BulkSaveProductRepository {
    products: Product[]

    async bulkSave (products: Product[]): Promise<void> {
        this.products = products
    }
}