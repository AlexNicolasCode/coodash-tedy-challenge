import { connect, disconnect } from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server"

import { ProductBulkMongoRepository } from "@/infra/db/mongodb"
import { ProductEntity } from "@/infra/db/entity";
import { mockProductList } from "test/unit/domain/mock";

describe('ProductBulkMongoRepository', () => {
    let mongoDb: MongoMemoryServer;

    beforeAll(async () => {
        mongoDb = await MongoMemoryServer.create();
        await connect(mongoDb.getUri())
    })

    afterEach(async () => {
        await ProductEntity.deleteMany()
    })

    afterAll(async () => {
        await disconnect()
        await mongoDb.stop()
    })

    test('should save products correctly', async () => {
        const sut = new ProductBulkMongoRepository()
        const fakeProducts = mockProductList()
        
        await sut.bulkSave(fakeProducts)

        const productsCount = await ProductEntity.countDocuments()
        expect(productsCount).toBe(fakeProducts.length)
    })
})