import { faker } from "@faker-js/faker"
import { connect, disconnect } from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server"

import { ProductMongoRepository } from "@/infra/db/mongodb"
import { mockProductEntity, mockProductEntityList } from "../mock";

describe('ProductMongoRepository', () => {
    let mongoDb: MongoMemoryServer;

    beforeAll(async () => {
        mongoDb = await MongoMemoryServer.create();
        await connect(mongoDb.getUri())
    })

    afterAll(async () => {
        await disconnect()
        await mongoDb.stop()
    })

    test('should return correct products on success', async () => {
        const fakeProduct = await mockProductEntity()
        const sut = new ProductMongoRepository()
        const fakePage = 1
        
        const products = await sut.get_products(fakePage)

        expect(products.some((product) => product.code === fakeProduct.code)).toBe(true)
    })

    test('should return only 10 products by request', async () => {
        const productEntityLenght = faker.number.int({ min: 10, max: 20 }) 
        await mockProductEntityList(productEntityLenght)
        const sut = new ProductMongoRepository()
        const fakePage = faker.number.int({ max: 2 })
        const maxProductsPerPage = 10
        
        const products = await sut.get_products(fakePage)

        expect(products.length).toBe(maxProductsPerPage)
    })

    test('should return different products when page selected change', async () => {
        const productEntityLenght = faker.number.int({ min: 11, max: 19 }) 
        await mockProductEntityList(productEntityLenght)
        const sut = new ProductMongoRepository()
        
        const productsFromFirstQuery = await sut.get_products(1)
        const productsFromSecondQuery = await sut.get_products(2)

        expect(productsFromFirstQuery.some((product) => productsFromSecondQuery.includes(product))).toBe(false)
    })
})