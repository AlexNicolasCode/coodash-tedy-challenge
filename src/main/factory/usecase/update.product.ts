import { DbUpdateProduct } from "@/data/usecase";
import { UpdateProduct} from "@/domain/usecase";
import { ProductMongoRepository } from "@/infra/db/mongodb";

export const makeUpdateProduct = (): UpdateProduct => {
    const updateProductRepository = new ProductMongoRepository()
    const updateProductStatusToTrashRepository = new ProductMongoRepository()
    return new DbUpdateProduct(
        updateProductRepository,
        updateProductStatusToTrashRepository
    )
}