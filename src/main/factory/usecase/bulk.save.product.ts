import { DbSaveProduct } from "@/data/usecase";
import { BulkSaveProduct } from "@/domain/usecase";
import { ProductBulkMongoRepository } from "@/infra/db/mongodb";

export const makeBulkSaveProduct = (): BulkSaveProduct => {
    const bulkSaveProductRepository = new ProductBulkMongoRepository()
    return new DbSaveProduct(bulkSaveProductRepository)
}