import { Product } from "@/domain/model";
import { ProductEntity } from "../entity";
import { BulkSaveProductRepository } from "@/data/protocol/db";

export class ProductBulkMongoRepository implements BulkSaveProductRepository {
    async bulkSave (products: Product[]): Promise<void> {
        const codes = products.map((product) => product.code)
        const productsFound = await ProductEntity.find({
            code: {
                $in: codes
            }
        })
        const newProducts = products.filter((product) => 
            !productsFound.some((productFound) => productFound.code == product.code)
        )
        const hasNewProducts = newProducts.length
        if (hasNewProducts) {
            await ProductEntity.insertMany(newProducts)
        }
        const productsToUpdate = products.filter((product) => 
            productsFound.some((productFound) => 
                productFound.code === product.code &&
                productFound.last_modified_t < product.last_modified_t
            )
        )
        for (const product of productsToUpdate) {
            await ProductEntity.findOneAndUpdate({
                code: product.code 
            }, { ...product })
        }
    }
}