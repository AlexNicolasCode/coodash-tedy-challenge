import { GetProductsByFileNameRepository } from "@/data/protocol/http";
import { Product } from "@/domain/model";
import { mockProductList } from "test/unit/domain/mock";

export class GetProductsByFileNameRepositorySpy implements GetProductsByFileNameRepository {
    name: string
    result: Product[] = mockProductList()

    async getProductsByFileName (name: string): Promise<Product[]> {
        this.name = name
        return this.result
    }
}