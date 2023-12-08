import { Product } from "@/domain/model";

export interface BulkSaveProduct {
    bulkSave: (products: Product[]) => Promise<boolean>
}