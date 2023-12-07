import { Product } from "@/domain/model";

export interface GetProductsRepository {
    get_products: (page: number) => Promise<Product[]> 
}