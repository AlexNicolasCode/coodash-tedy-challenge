import { faker } from "@faker-js/faker"

import { GetProductController } from "@/presentation/controller"
import { GetProductSpy } from "../mock"
import { ok } from "@/presentation/helper"

const mockRequest = (): GetProductController.Request => ({
    params: {
        code: faker.number.int()
    }   
})

describe('GetProductController', () => {
    test('should call GetProduct with correct code', async () => {
        const getProductpy = new GetProductSpy()
        const sut = new GetProductController(getProductpy)
        const request = mockRequest()
        
        await sut.handle(request)
        
        expect(getProductpy.code).toStrictEqual(request.params.code)
    })

    test('should return correct product on success', async () => {
        const getProductSpy = new GetProductSpy()
        const sut = new GetProductController(getProductSpy)
        const request = mockRequest()
        
        const products = await sut.handle(request)
        
        expect(products.body).toStrictEqual(getProductSpy.result)
    })

    test('should return 200 on success', async () => {
        const getProductSpy = new GetProductSpy()
        const sut = new GetProductController(getProductSpy)
        const request = mockRequest()
        
        const products = await sut.handle(request)
        
        expect(products.statusCode).toStrictEqual(ok(getProductSpy.result).statusCode)
    })
})