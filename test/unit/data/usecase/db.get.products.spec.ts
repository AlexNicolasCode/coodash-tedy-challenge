import { faker } from "@faker-js/faker"

import { DbGetProducts } from "@/data/usecase"
import { GetProductsRepositorySpy } from "../mock"

describe('DbGetProducts', () => {
    test('should call GetProductsRepositorySpy with correct page', async () => {
        const getProductsRepositorySpy = new GetProductsRepositorySpy()
        const sut = new DbGetProducts(getProductsRepositorySpy)
        const fakePage = faker.number.int()
        
        await sut.get_products(fakePage)

        expect(getProductsRepositorySpy.page).toStrictEqual(fakePage)
    })
})