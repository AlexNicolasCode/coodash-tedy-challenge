import { Product } from "@/domain/model";

export interface GetProducts {
    get_products: (page: number) => Product[] 
}