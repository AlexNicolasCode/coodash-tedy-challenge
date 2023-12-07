import { Product } from "@/domain/model";

export interface GetProductsRepository {
    getProducts: (page: number) => Promise<Product[]> 
}