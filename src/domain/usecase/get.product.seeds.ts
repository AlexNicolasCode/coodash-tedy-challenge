import { Product } from "@/domain/model";

export interface GetProductSeeds {
    getSeeds: () => Promise<Product[]>
}