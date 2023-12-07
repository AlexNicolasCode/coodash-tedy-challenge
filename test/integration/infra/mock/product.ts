import { ProductEntity } from "@/infra/db/entity"
import { mockProduct } from "test/unit/domain/mock"

export const mockProductEntity = async (): Promise<void> => {
    await ProductEntity.create(mockProduct())
}