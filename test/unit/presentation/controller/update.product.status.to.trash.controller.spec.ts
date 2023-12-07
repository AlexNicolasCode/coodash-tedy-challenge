import { faker } from "@faker-js/faker"

import { UpdateProductStatusToTrashController } from "@/presentation/controller"
import { UpdateProductStatusToTrashSpy } from "../mock"

const mockRequest = (): UpdateProductStatusToTrashController.Request => ({
    params: {
        code: faker.number.int()
    }   
})

describe('UpdateProductStatusToTrashController', () => {
    test('should call UpdateProductStatusToTrashSpy with correct code', async () => {
        const updateProductStatusToTrashSpy = new UpdateProductStatusToTrashSpy()
        const sut = new UpdateProductStatusToTrashController(updateProductStatusToTrashSpy)
        const request = mockRequest()
        
        await sut.handle(request)
        
        expect(updateProductStatusToTrashSpy.code).toStrictEqual(request.params.code)
    })
})