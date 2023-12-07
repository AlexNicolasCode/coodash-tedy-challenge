import { DbGetProduct } from "@/data/usecase";
import { GetProduct } from "@/domain/usecase";
import { ProductMongoRepository } from "@/infra/db/mongodb";

export const makeGetProduct = (): GetProduct => {
    const getProductRepository = new ProductMongoRepository()
    return new DbGetProduct(getProductRepository)
}