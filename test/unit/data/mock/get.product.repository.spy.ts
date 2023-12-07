import { GetProductRepository } from "@/data/protocol/db";
import { Product } from "@/domain/model";
import { mockProduct } from "test/unit/domain/mock";

export class GetProductRepositorySpy implements GetProductRepository {
    code: number
    result: Product = mockProduct()

    async getProduct (code: number): Promise<Product> {
        this.code = code
        return this.result
    }
}