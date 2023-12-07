import { faker } from "@faker-js/faker"

import { UpdateProductStatusToTrashController } from "@/presentation/controller"
import { UpdateProductStatusToTrashSpy } from "../mock"
import { noContent, serverError } from "@/presentation/helper"
import { throwError } from "test/unit/domain/helper"

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

    
    test('should return 204 on success', async () => {
        const updateProductStatusToTrashSpy = new UpdateProductStatusToTrashSpy()
        const sut = new UpdateProductStatusToTrashController(updateProductStatusToTrashSpy)
        const request = mockRequest()
        
        const response = await sut.handle(request)
        
        expect(response).toStrictEqual(noContent())
    })

    test('should return 500 when UpdateProductStatusToTrashSpy throws', async () => {
        const updateProductStatusToTrashSpy = new UpdateProductStatusToTrashSpy()
        const sut = new UpdateProductStatusToTrashController(updateProductStatusToTrashSpy)
        const request = mockRequest()
        jest.spyOn(updateProductStatusToTrashSpy, 'updateStatusToTrash').mockImplementationOnce(throwError)
        
        const response = await sut.handle(request)
        
        expect(response).toStrictEqual(serverError())
    })
})