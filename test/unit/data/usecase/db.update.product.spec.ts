import { faker } from "@faker-js/faker"

import { UpdateProductRepositorySpy, UpdateProductStatusRepositorySpy } from "../mock"
import { throwError } from "test/unit/domain/helper"
import { DbUpdateProduct } from "@/data/usecase"
import { mockProduct } from "test/unit/domain/mock"

describe('DbUpdateProduct', () => {
    test('should call UpdateProductStatusRepositorySpy with correct params', async () => {
        const updateProductRepositorySpy = new UpdateProductRepositorySpy()
        const updateProductStatusRepositorySpy = new UpdateProductStatusRepositorySpy()
        const sut = new DbUpdateProduct(updateProductRepositorySpy, updateProductStatusRepositorySpy)
        const fakeCode = faker.number.int()
        
        await sut.updateStatusToTrash(fakeCode)

        expect(updateProductStatusRepositorySpy.params).toStrictEqual({
            code: fakeCode,
            status: 'trash'
        })
    })
    
    test('should throw if UpdateProductStatusRepositorySpy throws', async () => {
        const updateProductRepositorySpy = new UpdateProductRepositorySpy()
        const updateProductStatusRepositorySpy = new UpdateProductStatusRepositorySpy()
        const sut = new DbUpdateProduct(updateProductRepositorySpy, updateProductStatusRepositorySpy)
        const fakePage = faker.number.int()
        jest.spyOn(updateProductStatusRepositorySpy, 'updateStatus').mockImplementationOnce(throwError)
        
        const promise = sut.updateStatusToTrash(fakePage)

        await expect(promise).rejects.toThrow()
    })

    test('should call UpdateProductRepository with correct params', async () => {
        const updateProductRepositorySpy = new UpdateProductRepositorySpy()
        const updateProductStatusRepositorySpy = new UpdateProductStatusRepositorySpy()
        const sut = new DbUpdateProduct(updateProductRepositorySpy, updateProductStatusRepositorySpy)
        const fakeParams = {
            code: faker.number.int(),
            product: mockProduct()
        }
        
        await sut.update(fakeParams)

        expect(updateProductRepositorySpy.params).toStrictEqual(fakeParams)
    })
    
    test('should throw if UpdateProductRepository throws', async () => {
        const updateProductRepositorySpy = new UpdateProductRepositorySpy()
        const updateProductStatusRepositorySpy = new UpdateProductStatusRepositorySpy()
        const sut = new DbUpdateProduct(updateProductRepositorySpy, updateProductStatusRepositorySpy)
        const fakeParams = {
            code: faker.number.int(),
            product: mockProduct()
        }
        jest.spyOn(updateProductRepositorySpy, 'update').mockImplementationOnce(throwError)
        
        const promise = sut.update(fakeParams)

        await expect(promise).rejects.toThrow()
    })
    
    test('should return correct product on success', async () => {
        const updateProductRepositorySpy = new UpdateProductRepositorySpy()
        const updateProductStatusRepositorySpy = new UpdateProductStatusRepositorySpy()
        const sut = new DbUpdateProduct(updateProductRepositorySpy, updateProductStatusRepositorySpy)
        const fakeParams = {
            code: faker.number.int(),
            product: mockProduct()
        }
        updateProductRepositorySpy.result = fakeParams.product
        
        const product = await sut.update(fakeParams)

        expect(product).toStrictEqual(fakeParams.product)
    })
})