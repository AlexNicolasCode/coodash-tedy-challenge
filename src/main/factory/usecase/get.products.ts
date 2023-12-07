import { DbGetProducts } from "@/data/usecase";
import { GetProducts } from "@/domain/usecase";
import { ProductMongoRepository } from "@/infra/db/mongodb";

export const makeGetProducts = (): GetProducts => {
    const getProductsRepository = new ProductMongoRepository()
    return new DbGetProducts(getProductsRepository)
}