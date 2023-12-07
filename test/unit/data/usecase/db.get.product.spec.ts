import { faker } from "@faker-js/faker"

import { DbGetProduct } from "@/data/usecase"
import { GetProductRepositorySpy } from "../mock"

describe('DbGetProduct', () => {
    test('should call GetProductRepositorySpy with correct code', async () => {
        const getProductRepositorySpy = new GetProductRepositorySpy()
        const sut = new DbGetProduct(getProductRepositorySpy)
        const fakeCode = faker.number.int()
        
        await sut.getProduct(fakeCode)

        expect(getProductRepositorySpy.code).toStrictEqual(fakeCode)
    })
})