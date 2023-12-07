import { faker } from "@faker-js/faker"
import { connect, disconnect } from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server"

import { ProductMongoRepository } from "@/infra/db/mongodb"
import { mockProductEntity, mockProductEntityList } from "../mock";
import { ProductEntity } from "@/infra/db/entity";

describe('ProductMongoRepository', () => {
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

    describe('getProducts', () => {
        test('should return correct products on success', async () => {
            const fakeProduct = await mockProductEntity()
            const sut = new ProductMongoRepository()
            const fakePage = 1
            
            const products = await sut.getProducts(fakePage)
    
            expect(products.some((product) => product.code === fakeProduct.code)).toBe(true)
        })
    
        test('should return only 10 products by request', async () => {
            const productEntityLenght = faker.number.int({ min: 10, max: 20 }) 
            await mockProductEntityList(productEntityLenght)
            const sut = new ProductMongoRepository()
            const fakePage = 1
            const maxProductsPerPage = 10
            
            const products = await sut.getProducts(fakePage)
    
            expect(products.length).toBe(maxProductsPerPage)
        })
    
        test('should return different products when page selected change', async () => {
            const productEntityLenght = faker.number.int({ min: 11, max: 19 }) 
            await mockProductEntityList(productEntityLenght)
            const sut = new ProductMongoRepository()
            
            const productsFromFirstQuery = await sut.getProducts(1)
            const productsFromSecondQuery = await sut.getProducts(2)
    
            expect(productsFromFirstQuery.some((product) => productsFromSecondQuery.includes(product))).toBe(false)
        })
    
        test('should return correctly last page lenght', async () => {
            const productEntityLenght = faker.number.int({ min: 11, max: 100 }) 
            await mockProductEntityList(productEntityLenght)
            const sut = new ProductMongoRepository()
            const maxProductsPerPage = 10
            const fakePage = Math.ceil(productEntityLenght / maxProductsPerPage)
            const lastPageLenght = (productEntityLenght % maxProductsPerPage) !== 0 
                ? (productEntityLenght % maxProductsPerPage)
                : maxProductsPerPage 
            
            const products = await sut.getProducts(fakePage)
    
            expect(products.length).toBe(lastPageLenght)
        })
    })

    describe('getProduct', () => {
        test('should return correct product on success', async () => {
            const fakeProduct = await mockProductEntity()
            const sut = new ProductMongoRepository()
            
            const product = await sut.getProduct(fakeProduct.code)
    
            expect(product.code).toBe(fakeProduct.code)
        })
    })
})