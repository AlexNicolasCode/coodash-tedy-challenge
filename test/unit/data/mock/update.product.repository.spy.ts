import { UpdateProductRepository } from "@/data/protocol/db";
import { mockProduct } from "test/unit/domain/mock";

export class UpdateProductRepositorySpy implements UpdateProductRepository {
    params: UpdateProductRepository.Request
    result: UpdateProductRepository.Result = mockProduct()

    async update (params: UpdateProductRepository.Request): Promise<UpdateProductRepository.Result> {
        this.params = params
        return this.result
    }
}