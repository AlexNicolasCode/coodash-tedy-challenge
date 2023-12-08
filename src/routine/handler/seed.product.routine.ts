import { Routine } from "../protocol";
import { BulkSaveProduct, GetProductSeeds } from "@/domain/usecase";

export class SeedProductRoutine implements Routine {
    constructor (
        private readonly getProductSeeds: GetProductSeeds,
        private readonly bulkSaveProduct: BulkSaveProduct
    ) {}

    async handle (): Promise<void> {
        try {
            const products = await this.getProductSeeds.getSeeds()
            const hasSaved = await this.bulkSaveProduct.bulkSave(products)
            if (!hasSaved) {
                throw new Error()
            }
        } catch (error) {
            console.log(error)
        }
    }
}