import { faker } from "@faker-js/faker"
import { connect, disconnect } from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server"

import { ProductMongoRepository } from "@/infra/db/mongodb"
import { mockProductEntity } from "../mock";

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
        const fakePage = faker.number.int({ max: 9 })
        
        const products = await sut.get_products(fakePage)

        expect(products.some((product) => product.code === fakeProduct.code)).toBe(true)
    })
})