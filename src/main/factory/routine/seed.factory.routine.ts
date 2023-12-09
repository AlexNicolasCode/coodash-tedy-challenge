import { makeBulkSaveProduct, makeGetProductSeeds, makeSetRoutineStatus } from "../usecase";
import { Routine } from "@/routine/protocol";
import { SeedProductRoutine } from "@/routine/handler";

export const makeSeedProductRoutine = (): Routine => {
    const setStatusRoutine = makeSetRoutineStatus()
    const getProductSeeds = makeGetProductSeeds()
    const bulkSaveProduct = makeBulkSaveProduct()
    return new SeedProductRoutine(
        setStatusRoutine,
        getProductSeeds,
        bulkSaveProduct
    )
}