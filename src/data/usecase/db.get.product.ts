import { Product } from "@/domain/model";
import { GetProduct } from "@/domain/usecase";
import { GetProductRepository } from "../protocol/db";

export class DbGetProduct implements GetProduct {
    constructor (
        private readonly getProductRepository: GetProductRepository
    ) {}

    async getProduct (code: number): Promise<Product> {
        return this.getProductRepository.getProduct(code)
    }
}