import { faker } from "@faker-js/faker"

import { GetProductController } from "@/presentation/controller"
import { GetProductSpy } from "../mock"

const mockRequest = (): GetProductController.Request => ({
    params: {
        code: faker.number.int()
    }   
})

describe('GetProductController', () => {
    test('should call GetProduct with correct code', async () => {
        const getProductSpy = new GetProductSpy()
        const sut = new GetProductController(getProductSpy)
        const request = mockRequest()
        
        await sut.handle(request)
        
        expect(getProductSpy.code).toStrictEqual(request.params.code)
    })
})