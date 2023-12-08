import { Product } from "@/domain/model";
import { BulkSaveProduct } from "@/domain/usecase";

export class BulkSaveProductSpy implements BulkSaveProduct {
    products: Product[]
    result: boolean = true

    async bulkSave (products: Product[]): Promise<boolean> {
        this.products = products
        return this.result
    }
}