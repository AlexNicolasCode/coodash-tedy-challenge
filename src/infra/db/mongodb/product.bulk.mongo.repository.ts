import { Product } from "@/domain/model";
import { ProductEntity } from "../entity";
import { BulkSaveProductRepository } from "@/data/protocol/db";

export class ProductBulkMongoRepository implements BulkSaveProductRepository {
    async bulkSave (products: Product[]): Promise<void> {
        await ProductEntity.insertMany(products)
    }
}