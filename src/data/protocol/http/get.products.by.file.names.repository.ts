import { Product } from "@/domain/model";

export interface GetProductsByFileNameRepository {
    getProductsByFileName: (name: string) => Promise<Product[]> 
}