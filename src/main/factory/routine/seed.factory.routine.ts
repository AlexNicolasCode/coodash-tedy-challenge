import { makeBulkSaveProduct, makeGetProductSeeds } from "../usecase";
import { Routine } from "@/routine/protocol";
import { SeedProductRoutine } from "@/routine/handler";

export const makeSeedProductRoutine = (): Routine => {
    const getProductSeeds = makeGetProductSeeds()
    const bulkSaveProduct = makeBulkSaveProduct()
    return new SeedProductRoutine(
        getProductSeeds,
        bulkSaveProduct
    )
}