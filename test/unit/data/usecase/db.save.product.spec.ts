import { DbSaveProduct } from "@/data/usecase"
import { BulkSaveProductRepositorySpy } from "../mock"
import { mockProductList } from "test/unit/domain/mock"
import { throwError } from "test/unit/domain/helper"

describe('DbSaveProduct', () => {
    test('should call BulkSaveProductRepository with correct code', async () => {
        const bulkSaveProductRepositorySpy = new BulkSaveProductRepositorySpy()
        const sut = new DbSaveProduct(bulkSaveProductRepositorySpy)
        const fakeProducts = mockProductList()
        
        await sut.bulkSave(fakeProducts)

        expect(bulkSaveProductRepositorySpy.products).toStrictEqual(fakeProducts)
    })

    test('should return false if BulkSaveProductRepositorySpy throws', async () => {
        const bulkSaveProductRepositorySpy = new BulkSaveProductRepositorySpy()
        const sut = new DbSaveProduct(bulkSaveProductRepositorySpy)
        const fakeProducts = mockProductList()
        jest.spyOn(bulkSaveProductRepositorySpy, 'bulkSave').mockImplementationOnce(throwError)
        
        const result = await sut.bulkSave(fakeProducts)

        expect(result).toBe(false)
    })

    test('should return true on success', async () => {
        const bulkSaveProductRepositorySpy = new BulkSaveProductRepositorySpy()
        const sut = new DbSaveProduct(bulkSaveProductRepositorySpy)
        const fakeProducts = mockProductList()
        
        const result = await sut.bulkSave(fakeProducts)

        expect(result).toBe(true)
    })
})