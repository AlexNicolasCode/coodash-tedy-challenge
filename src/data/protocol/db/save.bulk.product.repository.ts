import { Product } from "@/domain/model";

export interface BulkSaveProductRepository {
    bulkSave: (products: Product[]) => Promise<void>
}