import { faker } from "@faker-js/faker"

import { UpdateProductController } from "@/presentation/controller"
import {UpdateProductSpy } from "../mock"
import { mockProduct } from "test/unit/domain/mock"
import { ok } from "@/presentation/helper"

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

    test('should return correct product on success', async () => {
        const updateProductSpy = new UpdateProductSpy()
        const sut = new UpdateProductController(updateProductSpy)
        const request = mockRequest()
        
        const product = await sut.handle(request)
        
        expect(product).toStrictEqual(ok(updateProductSpy.result))
    })
})