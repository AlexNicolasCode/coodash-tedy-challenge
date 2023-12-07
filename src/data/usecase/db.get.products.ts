import { Product } from "@/domain/model";
import { GetProducts } from "@/domain/usecase";
import { GetProductsRepository } from "../protocol/db";

export class DbGetProducts implements GetProducts {
    constructor (
        private readonly getProductsRepository: GetProductsRepository
    ) {}

    async getProducts (page: number): Promise<Product[]> {
        return this.getProductsRepository.getProducts(page)
    }
}