import { Product } from "@/domain/model"
import { ProductEntity } from "@/infra/db/entity"
import { mockProduct, mockProductList } from "test/unit/domain/mock"

export const mockProductEntity = async (params?: Product): Promise<Product> => {
    return await ProductEntity.create(mockProduct(params))
}

export const mockProductEntityList = async (lenght?: number): Promise<Product[]> => {
    return await ProductEntity.create(mockProductList(lenght))
}