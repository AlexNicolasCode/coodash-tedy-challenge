import { Product } from "@/domain/model";

export interface SaveBulkProduct {
    saveBulk: (products: Product[]) => Promise<boolean>
}