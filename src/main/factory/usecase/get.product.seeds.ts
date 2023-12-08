import { RemoteGetProductSeeds } from "@/data/usecase";
import { GetProductSeeds } from "@/domain/usecase";
import { SeedMongoRepository } from "@/infra/db/mongodb";
import { HttpProductRepository } from "@/infra/http";

export const makeGetProductSeeds = (): GetProductSeeds => {
    const getFileNamesRepository = new HttpProductRepository()
    const getProductSeedsRepository = new HttpProductRepository()
    const setFileStatusRepository = new SeedMongoRepository()
    return new RemoteGetProductSeeds(
        getFileNamesRepository,
        getProductSeedsRepository,
        setFileStatusRepository
    )
}