import { faker } from "@faker-js/faker"

import { DbUpdateProductStatusToTrash } from "@/data/usecase"
import { UpdateProductStatusRepositorySpy } from "../mock"

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
})