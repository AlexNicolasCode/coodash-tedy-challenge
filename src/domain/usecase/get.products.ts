import { Product } from "@/domain/model";

export interface GetProducts {
    getProducts: (page: number) => Promise<Product[]> 
}