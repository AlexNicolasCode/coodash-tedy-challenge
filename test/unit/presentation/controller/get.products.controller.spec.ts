import { faker } from "@faker-js/faker"

import { GetProductsController } from "@/presentation/controller"
import { GetProductsSpy } from "../mock"

const mockRequest = (): GetProductsController.Request => ({
    params: {
        page: faker.number.int()
    }   
})

describe('GetProductsController', () => {
    test('should call GetProducts with correct page', async () => {
        const getProductsSpy = new GetProductsSpy()
        const sut = new GetProductsController(getProductsSpy)
        const request = mockRequest()
        
        await sut.handle(request)
        
        expect(getProductsSpy.page).toStrictEqual(request.params.page)
    })

    test('should return correct producs on success', async () => {
        const getProductsSpy = new GetProductsSpy()
        const sut = new GetProductsController(getProductsSpy)
        const request = mockRequest()
        
        const products = await sut.handle(request)
        
        expect(products.body).toStrictEqual(getProductsSpy.result)
    })
})