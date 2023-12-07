import { Product } from "@/domain/model";

export interface GetProductRepository {
    getProduct: (page: number) => Promise<Product> 
}