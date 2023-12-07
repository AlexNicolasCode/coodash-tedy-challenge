import { Product } from "@/domain/model";
import { GetProducts } from "@/domain/usecase";
import { mockProductList } from "test/unit/domain/mock";

export class GetProductsSpy implements GetProducts {
    page: number
    result: Product[] = mockProductList()

    async getProducts (page: number): Promise<Product[]> {
        this.page = page
        return this.result
    }
}