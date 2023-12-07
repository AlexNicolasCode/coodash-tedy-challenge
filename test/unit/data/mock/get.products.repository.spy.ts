import { GetProductsRepository } from "@/data/protocol/db";
import { Product } from "@/domain/model";
import { mockProductList } from "test/unit/domain/mock";

export class GetProductsRepositorySpy implements GetProductsRepository {
    page: number
    result: Product[] = mockProductList()

    async get_products (page: number): Promise<Product[]> {
        this.page = page
        return this.result
    }
}