import { faker } from "@faker-js/faker"

import { UpdateProductController } from "@/presentation/controller"
import {UpdateProductSpy } from "../mock"
import { mockProduct } from "test/unit/domain/mock"

const mockRequest = (): UpdateProductController.Request => ({
    params: {
        code: faker.number.int()
    },
    body: mockProduct()
})

describe('UpdateProductController', () => {
    test('should call UpdateProduct with correct params', async () => {
        const updateProductSpy = new UpdateProductSpy()
        const sut = new UpdateProductController(updateProductSpy)
        const request = mockRequest()
        
        await sut.handle(request)
        
        expect(updateProductSpy.params).toStrictEqual({
            code: request.params.code,
            product: request.body
        })
    })
})