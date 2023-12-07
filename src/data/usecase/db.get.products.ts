import { Product } from "@/domain/model";
import { GetProducts } from "@/domain/usecase";
import { GetProductsRepository } from "../protocol/db";

export class DbGetProducts implements GetProducts {
    constructor (
        private readonly getProductsRepository: GetProductsRepository
    ) {}

    async get_products (page: number): Promise<Product[]> {
        return this.getProductsRepository.get_products(page)
    }
}