import { Product } from "@/domain/model";
import { UpdateProduct } from "@/domain/usecase";
import { mockProduct } from "test/unit/domain/mock";

export class UpdateProductSpy implements UpdateProduct {
    params: UpdateProduct.Request
    result: Product = mockProduct()

    async update (params: UpdateProduct.Request): Promise<Product> {
        this.params = params
        return this.result
    }
}