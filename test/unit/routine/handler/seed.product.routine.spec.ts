import { SeedProductRoutine } from "@/routine/handler/seed.product.routine"
import { BulkSaveProductSpy, GetProductSeedsSpy, SetRoutineStatusSpy } from "../mock"

describe('SeedProductRoutine', () => {
    test('should call BulkSaveProduct with correct params', async () => {
        const setRoutineStatusSpy = new SetRoutineStatusSpy()
        const getProductSeedsSpy = new GetProductSeedsSpy()
        const bulkSaveProductSpy = new BulkSaveProductSpy()
        const sut = new SeedProductRoutine(setRoutineStatusSpy, getProductSeedsSpy, bulkSaveProductSpy)
        
        await sut.handle()

        expect(bulkSaveProductSpy.products).toBe(getProductSeedsSpy.result)
    })
})