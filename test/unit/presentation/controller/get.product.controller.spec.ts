import { faker } from "@faker-js/faker"

import { GetProductController } from "@/presentation/controller"
import { GetProductSpy } from "../mock"
import { notFound, ok, serverError } from "@/presentation/helper"
import { throwError } from "test/unit/domain/helper"

const mockRequest = (): GetProductController.Request => ({
    params: {
        code: String(faker.number.int())
    }   
})

describe('GetProductController', () => {
    test('should call GetProduct with correct code', async () => {
        const getProductpy = new GetProductSpy()
        const sut = new GetProductController(getProductpy)
        const request = mockRequest()
        
        await sut.handle(request)
        
        expect(getProductpy.code).toStrictEqual(Number(request.params.code))
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

    test('should return 404 when not found product', async () => {
        const getProductSpy = new GetProductSpy()
        const sut = new GetProductController(getProductSpy)
        const request = mockRequest()
        getProductSpy.result = null
        
        const products = await sut.handle(request)
        
        expect(products.statusCode).toStrictEqual(notFound().statusCode)
    })

    test('should return 500 when GetProduct throws', async () => {
        const getProductSpy = new GetProductSpy()
        const sut = new GetProductController(getProductSpy)
        const request = mockRequest()
        jest.spyOn(getProductSpy, 'getProduct').mockImplementationOnce(throwError)
        
        const products = await sut.handle(request)
        
        expect(products.statusCode).toStrictEqual(serverError().statusCode)
    })
})