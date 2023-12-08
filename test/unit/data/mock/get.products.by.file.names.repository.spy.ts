import { GetProductsByFileNameRepository } from "@/data/protocol/http";
import { Product } from "@/domain/model";
import { mockProductList } from "test/unit/domain/mock";

export class GetProductsByFileNameRepositorySpy implements GetProductsByFileNameRepository {
    name: string
    count: number = 0
    result: Product[] = mockProductList()

    async getProductsByFileName (name: string): Promise<Product[]> {
        this.name = name
        this.count++
        return this.result
    }
}