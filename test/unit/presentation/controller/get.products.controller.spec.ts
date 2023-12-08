import { faker } from "@faker-js/faker"

import { GetProductsController } from "@/presentation/controller"
import { GetProductsSpy } from "../mock"
import { ok, serverError } from "@/presentation/helper"
import { throwError } from "test/unit/domain/helper"

const mockRequest = (): GetProductsController.Request => ({
    query: {
        page: String(faker.number.int())
    }   
})

describe('GetProductsController', () => {
    test('should call GetProducts with correct page', async () => {
        const getProductsSpy = new GetProductsSpy()
        const sut = new GetProductsController(getProductsSpy)
        const request = mockRequest()
        
        await sut.handle(request)
        
        expect(getProductsSpy.page).toStrictEqual(Number(request.query.page))
    })

    test('should return correct producs on success', async () => {
        const getProductsSpy = new GetProductsSpy()
        const sut = new GetProductsController(getProductsSpy)
        const request = mockRequest()
        
        const products = await sut.handle(request)
        
        expect(products.body).toStrictEqual(getProductsSpy.result)
    })

    test('should return 200 on success', async () => {
        const getProductsSpy = new GetProductsSpy()
        const sut = new GetProductsController(getProductsSpy)
        const request = mockRequest()
        
        const products = await sut.handle(request)
        
        expect(products.statusCode).toStrictEqual(ok(request).statusCode)
    })

    test('should return 500 when GetProducts throws', async () => {
        const getProductsSpy = new GetProductsSpy()
        const sut = new GetProductsController(getProductsSpy)
        const request = mockRequest()
        jest.spyOn(getProductsSpy, 'getProducts').mockImplementationOnce(throwError)
        
        const products = await sut.handle(request)
        
        expect(products.statusCode).toStrictEqual(serverError().statusCode)
    })
})