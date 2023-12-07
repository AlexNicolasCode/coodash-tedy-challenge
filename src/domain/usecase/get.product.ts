import { Product } from "@/domain/model";

export interface GetProduct {
    getProduct: (code: number) => Promise<Product> 
}