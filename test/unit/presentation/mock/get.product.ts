import { Product } from "@/domain/model";
import { GetProduct } from "@/domain/usecase";
import { mockProduct } from "test/unit/domain/mock";

export class GetProductSpy implements GetProduct {
    code: number
    result: Product = mockProduct()

    async getProduct (code: number): Promise<Product> {
        this.code = code
        return this.result
    }
}