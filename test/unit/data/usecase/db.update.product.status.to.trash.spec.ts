import { faker } from "@faker-js/faker"

import { DbUpdateProductStatusToTrash } from "@/data/usecase"
import { UpdateProductStatusRepositorySpy } from "../mock"
import { throwError } from "test/unit/domain/helper"

describe('DbUpdateProductStatusToTrash', () => {
    test('should call UpdateProductStatusRepositorySpy with correct params', async () => {
        const updateProductStatusRepositorySpy = new UpdateProductStatusRepositorySpy()
        const sut = new DbUpdateProductStatusToTrash(updateProductStatusRepositorySpy)
        const fakeCode = faker.number.int()
        
        await sut.changeStatusToTrash(fakeCode)

        expect(updateProductStatusRepositorySpy.params).toStrictEqual({
            code: fakeCode,
            status: 'trash'
        })
    })
    
    test('should throw if UpdateProductStatusRepositorySpy throws', async () => {
        const updateProductStatusRepositorySpy = new UpdateProductStatusRepositorySpy()
        const sut = new DbUpdateProductStatusToTrash(updateProductStatusRepositorySpy)
        const fakePage = faker.number.int()
        jest.spyOn(updateProductStatusRepositorySpy, 'updateStatus').mockImplementationOnce(throwError)
        
        const promise = sut.changeStatusToTrash(fakePage)

        await expect(promise).rejects.toThrow()
    })
})