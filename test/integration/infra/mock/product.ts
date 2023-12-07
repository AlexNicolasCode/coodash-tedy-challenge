import { Product } from "@/domain/model"
import { ProductEntity } from "@/infra/db/entity"
import { mockProduct } from "test/unit/domain/mock"

export const mockProductEntity = async (): Promise<Product> => {
    return await ProductEntity.create(mockProduct())
}