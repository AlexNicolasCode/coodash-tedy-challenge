import { Product } from "@/domain/model";

export interface SaveBulkProductRepository {
    saveBulk: (products: Product[]) => Promise<boolean>
}