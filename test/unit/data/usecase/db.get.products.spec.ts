import { faker } from "@faker-js/faker"

import { DbGetProducts } from "@/data/usecase"
import { GetProductsRepositorySpy } from "../mock"
import { throwError } from "test/unit/domain/helper"

describe('DbGetProducts', () => {
    test('should call GetProductsRepositorySpy with correct page', async () => {
        const getProductsRepositorySpy = new GetProductsRepositorySpy()
        const sut = new DbGetProducts(getProductsRepositorySpy)
        const fakePage = faker.number.int()
        
        await sut.get_products(fakePage)

        expect(getProductsRepositorySpy.page).toStrictEqual(fakePage)
    })

    test('should throw if GetProductsRepositorySpy throws', async () => {
        const getProductsRepositorySpy = new GetProductsRepositorySpy()
        const sut = new DbGetProducts(getProductsRepositorySpy)
        const fakePage = faker.number.int()
        jest.spyOn(getProductsRepositorySpy, 'get_products').mockImplementationOnce(throwError)
        
        const promise = sut.get_products(fakePage)

        await expect(promise).rejects.toThrow()
    })
})