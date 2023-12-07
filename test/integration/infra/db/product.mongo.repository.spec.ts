import { faker } from "@faker-js/faker"
import { connect, disconnect } from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server"

import { ProductMongoRepository } from "@/infra/db/mongodb"
import { mockProductEntity, mockProductEntityList } from "../mock";
import { ProductEntity } from "@/infra/db/entity";
import { mockProduct } from "test/unit/domain/mock";

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

        test('should return null when product not found', async () => {
            const fakeProductCode = faker.number.int()
            const sut = new ProductMongoRepository()
            
            const product = await sut.getProduct(fakeProductCode)
    
            expect(product).toBeNull()
        })
    })

    describe('updateStatus', () => {
        test('should update status on success', async () => {
            const fakeProduct = mockProduct()
            fakeProduct.status = faker.helpers.arrayElement(['draft', 'published'])
            const fakeProductEntity = await mockProductEntity(fakeProduct)
            const sut = new ProductMongoRepository()
            
            await sut.updateStatus({ code: fakeProductEntity.code, status: 'trash' })

            const productFetched = await ProductEntity.findOne({ code: fakeProduct.code })    
            expect(productFetched.status).toBe('trash')
        })
    })

    describe('update', () => {
        test('should preserve code when product is updated', async () => {
            const fakeProductEntity = await mockProductEntity()
            const sut = new ProductMongoRepository()
            const fakeRequest = {
                code: fakeProductEntity.code,
                product: mockProduct()
            }

            await sut.update(fakeRequest)
            
            const productFetched = await ProductEntity.findOne({ code: fakeProductEntity.code })    
            expect(productFetched.code).toBe(fakeProductEntity.code)
        })

        test('should return correct product on success', async () => {
            const fakeProductEntity = await mockProductEntity()
            const sut = new ProductMongoRepository()
            const fakeRequest = {
                code: fakeProductEntity.code,
                product: mockProduct()
            }

            const product = await sut.update(fakeRequest)
            
            const productFetched = await ProductEntity.findOne({ code: fakeProductEntity.code })    
            expect({
                code: productFetched.code,
                status: productFetched.status,
                imported_t: productFetched.imported_t,
                url: productFetched.url,
                creator: productFetched.creator,
                product_name: productFetched.product_name,
                quantity: productFetched.quantity,
                brands: productFetched.brands,
                categories: productFetched.categories,
                labels: productFetched.labels,
                cities: productFetched.cities,
                purchase_places: productFetched.purchase_places,
                stores: productFetched.stores,
                ingredients_text: productFetched.ingredients_text,
                traces: productFetched.traces,
                serving_size: productFetched.serving_size,
                serving_quantity: productFetched.serving_quantity,
                nutriscore_score: productFetched.nutriscore_score,
                nutriscore_grade: productFetched.nutriscore_grade,
                main_category: productFetched.main_category,
                image_url: productFetched.image_url,
            }).toStrictEqual({
                code: product.code,
                status: product.status,
                imported_t: product.imported_t,
                url: product.url,
                creator: product.creator,
                product_name: product.product_name,
                quantity: product.quantity,
                brands: product.brands,
                categories: product.categories,
                labels: product.labels,
                cities: product.cities,
                purchase_places: product.purchase_places,
                stores: product.stores,
                ingredients_text: product.ingredients_text,
                traces: product.traces,
                serving_size: product.serving_size,
                serving_quantity: product.serving_quantity,
                nutriscore_score: product.nutriscore_score,
                nutriscore_grade: product.nutriscore_grade,
                main_category: product.main_category,
                image_url: product.image_url,
            })
        })

        test('should update product on sucess', async () => {
            const fakeProductEntity = await mockProductEntity()
            const sut = new ProductMongoRepository()
            const fakeRequest = {
                code: fakeProductEntity.code,
                product: mockProduct()
            }

            await sut.update(fakeRequest)

            const productFetched = await ProductEntity.findOne({ code: fakeProductEntity.code })    
            expect({
                code: productFetched.code,
                status: productFetched.status,
                imported_t: productFetched.imported_t,
                url: productFetched.url,
                creator: productFetched.creator,
                product_name: productFetched.product_name,
                quantity: productFetched.quantity,
                brands: productFetched.brands,
                categories: productFetched.categories,
                labels: productFetched.labels,
                cities: productFetched.cities,
                purchase_places: productFetched.purchase_places,
                stores: productFetched.stores,
                ingredients_text: productFetched.ingredients_text,
                traces: productFetched.traces,
                serving_size: productFetched.serving_size,
                serving_quantity: productFetched.serving_quantity,
                nutriscore_score: productFetched.nutriscore_score,
                nutriscore_grade: productFetched.nutriscore_grade,
                main_category: productFetched.main_category,
                image_url: productFetched.image_url,
            }).toStrictEqual({
                code: fakeRequest.code,
                status: fakeRequest.product.status,
                imported_t: fakeRequest.product.imported_t,
                url: fakeRequest.product.url,
                creator: fakeRequest.product.creator,
                product_name: fakeRequest.product.product_name,
                quantity: fakeRequest.product.quantity,
                brands: fakeRequest.product.brands,
                categories: fakeRequest.product.categories,
                labels: fakeRequest.product.labels,
                cities: fakeRequest.product.cities,
                purchase_places: fakeRequest.product.purchase_places,
                stores: fakeRequest.product.stores,
                ingredients_text: fakeRequest.product.ingredients_text,
                traces: fakeRequest.product.traces,
                serving_size: fakeRequest.product.serving_size,
                serving_quantity: fakeRequest.product.serving_quantity,
                nutriscore_score: fakeRequest.product.nutriscore_score,
                nutriscore_grade: fakeRequest.product.nutriscore_grade,
                main_category: fakeRequest.product.main_category,
                image_url: fakeRequest.product.image_url,
            })
        })
    })
})