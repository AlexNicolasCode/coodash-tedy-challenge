import { faker } from "@faker-js/faker"

import { DbGetProduct } from "@/data/usecase"
import { GetProductRepositorySpy } from "../mock"
import { throwError } from "test/unit/domain/helper"

describe('DbGetProduct', () => {
    test('should call GetProductRepositorySpy with correct code', async () => {
        const getProductRepositorySpy = new GetProductRepositorySpy()
        const sut = new DbGetProduct(getProductRepositorySpy)
        const fakeCode = faker.number.int()
        
        await sut.getProduct(fakeCode)

        expect(getProductRepositorySpy.code).toStrictEqual(fakeCode)
    })

    test('should throw if GetProductRepositorySpy throws', async () => {
        const getProductRepositorySpy = new GetProductRepositorySpy()
        const sut = new DbGetProduct(getProductRepositorySpy)
        const fakeCode = faker.number.int()
        jest.spyOn(getProductRepositorySpy, 'getProduct').mockImplementationOnce(throwError)
        
        const promise = sut.getProduct(fakeCode)

        await expect(promise).rejects.toThrow()
    })

    test('should return correct product on success', async () => {
        const getProductRepositorySpy = new GetProductRepositorySpy()
        const sut = new DbGetProduct(getProductRepositorySpy)
        const fakeCode = faker.number.int()
        
        const products = await sut.getProduct(fakeCode)

        expect(products).toBe(getProductRepositorySpy.result)
    })
})