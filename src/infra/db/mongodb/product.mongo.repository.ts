import { GetProductsRepository } from "@/data/protocol/db";
import { Product } from "@/domain/model";
import { ProductEntity } from "../entity";

export class ProductMongoRepository implements GetProductsRepository {
    async getProducts (page: number): Promise<Product[]> {
        const maxPerPage = 10
        const skipCount = maxPerPage * (page - 1)
        return await ProductEntity
            .find()
            .skip(skipCount)
            .limit(maxPerPage)
    }
}