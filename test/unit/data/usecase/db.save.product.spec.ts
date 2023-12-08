import { DbSaveProduct } from "@/data/usecase"
import { BulkSaveProductRepositorySpy } from "../mock"
import { mockProductList } from "test/unit/domain/mock"

describe('DbSaveProduct', () => {
    test('should call BulkSaveProductRepository with correct code', async () => {
        const bulkSaveProductRepositorySpy = new BulkSaveProductRepositorySpy()
        const sut = new DbSaveProduct(bulkSaveProductRepositorySpy)
        const fakeProducts = mockProductList()
        
        await sut.bulkSave(fakeProducts)

        expect(bulkSaveProductRepositorySpy.products).toStrictEqual(fakeProducts)
    })
})