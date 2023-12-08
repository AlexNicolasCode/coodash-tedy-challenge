import { Product } from "@/domain/model";
import { GetProductSeeds } from "@/domain/usecase";
import { mockProductList } from "test/unit/domain/mock";

export class GetProductSeedsSpy implements GetProductSeeds {
    result: Product[] = mockProductList()

    async getSeeds (): Promise<Product[]> {
        return this.result
    }
}