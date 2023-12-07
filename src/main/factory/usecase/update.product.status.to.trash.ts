import { DbUpdateProduct } from "@/data/usecase";
import { UpdateProductStatusToTrash } from "@/domain/usecase";
import { ProductMongoRepository } from "@/infra/db/mongodb";

export const makeUpdateProductStatusToTrash = (): UpdateProductStatusToTrash => {
    const updateProductStatusToTrashRepository = new ProductMongoRepository()
    return new DbUpdateProduct(updateProductStatusToTrashRepository)
}