import { Routine } from "../protocol";
import { BulkSaveProduct, GetProductSeeds, SetRoutineStatus } from "@/domain/usecase";

export class SeedProductRoutine implements Routine {
    constructor (
        private readonly setRoutineStatus: SetRoutineStatus,
        private readonly getProductSeeds: GetProductSeeds,
        private readonly bulkSaveProduct: BulkSaveProduct
    ) {}

    async handle (): Promise<void> {
        try {
            await this.setRoutineStatus.setStatus({
                name: 'product-routine',
                status: 'running'
            })
            const products = await this.getProductSeeds.getSeeds()
            const hasSaved = await this.bulkSaveProduct.bulkSave(products)
            if (!hasSaved) {
                throw new Error()
            }
            this.setRoutineStatus.setStatus({
                name: 'product-routine',
                status: 'done'
            })
        } catch (error) {
            this.setRoutineStatus.setStatus({
                name: 'product-routine',
                status: 'error'
            })
            console.log(error)
        }
    }
}