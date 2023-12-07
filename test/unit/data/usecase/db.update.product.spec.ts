import { faker } from "@faker-js/faker"

import { UpdateProductStatusRepositorySpy } from "../mock"
import { throwError } from "test/unit/domain/helper"
import { DbUpdateProduct } from "@/data/usecase"

describe('DbUpdateProduct', () => {
    test('should call UpdateProductStatusRepositorySpy with correct params', async () => {
        const updateProductStatusRepositorySpy = new UpdateProductStatusRepositorySpy()
        const sut = new DbUpdateProduct(updateProductStatusRepositorySpy)
        const fakeCode = faker.number.int()
        
        await sut.updateStatusToTrash(fakeCode)

        expect(updateProductStatusRepositorySpy.params).toStrictEqual({
            code: fakeCode,
            status: 'trash'
        })
    })
    
    test('should throw if UpdateProductStatusRepositorySpy throws', async () => {
        const updateProductStatusRepositorySpy = new UpdateProductStatusRepositorySpy()
        const sut = new DbUpdateProduct(updateProductStatusRepositorySpy)
        const fakePage = faker.number.int()
        jest.spyOn(updateProductStatusRepositorySpy, 'updateStatus').mockImplementationOnce(throwError)
        
        const promise = sut.updateStatusToTrash(fakePage)

        await expect(promise).rejects.toThrow()
    })
})