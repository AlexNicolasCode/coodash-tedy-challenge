import { GetProductRepository, GetProductsRepository, UpdateProductRepository, UpdateProductStatusRepository } from "@/data/protocol/db";
import { Product } from "@/domain/model";
import { ProductEntity } from "../entity";

export class ProductMongoRepository implements GetProductsRepository, GetProductRepository, UpdateProductRepository, UpdateProductStatusRepository {
    async getProducts (page: number): Promise<Product[]> {
        const maxPerPage = 10
        const skipCount = maxPerPage * (page - 1)
        return await ProductEntity
            .find()
            .skip(skipCount)
            .limit(maxPerPage)
    }

    async getProduct (code: number): Promise<Product> {
        return await ProductEntity.findOne({ code })
    }

    async updateStatus (params: UpdateProductStatusRepository.Request): Promise<void> {
        await ProductEntity.updateOne({
            code: params.code
        }, {
            status: params.status
        })
    }

    async update (params: UpdateProductRepository.Request): Promise<Product> {
        await ProductEntity.updateOne({
            code: params.code,
        }, {
            ...params.product,
            code: params.code
        })
        return await this.getProduct(params.code)
    }
}