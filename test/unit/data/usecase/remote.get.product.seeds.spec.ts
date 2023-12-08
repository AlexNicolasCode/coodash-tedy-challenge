import { throwError } from "test/unit/domain/helper"
import { GetFileNamesRepositorySpy, GetProductsByFileNameRepositorySpy, SetFileStatusRepositorySpy } from "../mock"
import { RemoteGetProductSeeds } from "@/data/usecase"
import { faker } from "@faker-js/faker"

describe('RemoteGetProductSeeds', () => {
    test('should call GetProductsByFileNameRepository one time for each file name got', async () => {
        const getFileNamesRepositorySpy = new GetFileNamesRepositorySpy()
        const getProductsByFileNameRepositorySpy = new GetProductsByFileNameRepositorySpy()
        const setFileStatusRepositorySpy = new SetFileStatusRepositorySpy()
        const sut = new RemoteGetProductSeeds(
            getFileNamesRepositorySpy,
            getProductsByFileNameRepositorySpy,
            setFileStatusRepositorySpy
        )
        const namesCount = getFileNamesRepositorySpy.result.length
        
        await sut.getSeeds()

        expect(namesCount).toBe(getProductsByFileNameRepositorySpy.count)
    })

    test('should call GetProductsByFileNameRepository with correct name', async () => {
        const getFileNamesRepositorySpy = new GetFileNamesRepositorySpy()
        const getProductsByFileNameRepositorySpy = new GetProductsByFileNameRepositorySpy()
        const setFileStatusRepositorySpy = new SetFileStatusRepositorySpy()
        getFileNamesRepositorySpy.result = [faker.string.sample()]
        const sut = new RemoteGetProductSeeds(
            getFileNamesRepositorySpy,
            getProductsByFileNameRepositorySpy,
            setFileStatusRepositorySpy
        )
        const firstNameFetched = getFileNamesRepositorySpy.result[0]
        
        await sut.getSeeds()

        expect(getProductsByFileNameRepositorySpy.name).toStrictEqual(firstNameFetched)
    })

    test('should call SetFileStatusRepository with correct params when GetProductsByFileNameRepository throws', async () => {
        const getFileNamesRepositorySpy = new GetFileNamesRepositorySpy()
        const getProductsByFileNameRepositorySpy = new GetProductsByFileNameRepositorySpy()
        const setFileStatusRepositorySpy = new SetFileStatusRepositorySpy()
        const sut = new RemoteGetProductSeeds(
            getFileNamesRepositorySpy,
            getProductsByFileNameRepositorySpy,
            setFileStatusRepositorySpy
        )
        getFileNamesRepositorySpy.result = [faker.string.sample()]
        jest.spyOn(getProductsByFileNameRepositorySpy, 'getProductsByFileName').mockImplementationOnce(throwError)
        const firstNameFetched = getFileNamesRepositorySpy.result[0]
        
        await sut.getSeeds()

        expect(setFileStatusRepositorySpy.params).toStrictEqual({
            name: firstNameFetched,
            status: 'error'
        })
    })
    

    test('should call SetFileStatusRepository with correct params on success', async () => {
        const getFileNamesRepositorySpy = new GetFileNamesRepositorySpy()
        const getProductsByFileNameRepositorySpy = new GetProductsByFileNameRepositorySpy()
        const setFileStatusRepositorySpy = new SetFileStatusRepositorySpy()
        const sut = new RemoteGetProductSeeds(
            getFileNamesRepositorySpy,
            getProductsByFileNameRepositorySpy,
            setFileStatusRepositorySpy
        )
        getFileNamesRepositorySpy.result = [faker.string.sample()]
        const firstNameFetched = getFileNamesRepositorySpy.result[0]
        
        await sut.getSeeds()

        expect(setFileStatusRepositorySpy.params).toStrictEqual({
            name: firstNameFetched,
            status: 'fetched'
        })
    })

    test('should throw if GetFileNamesRepository throws', async () => {
        const getFileNamesRepositorySpy = new GetFileNamesRepositorySpy()
        const getProductsByFileNameRepositorySpy = new GetProductsByFileNameRepositorySpy()
        const setFileStatusRepositorySpy = new SetFileStatusRepositorySpy()
        const sut = new RemoteGetProductSeeds(
            getFileNamesRepositorySpy,
            getProductsByFileNameRepositorySpy,
            setFileStatusRepositorySpy
        )
        jest.spyOn(getFileNamesRepositorySpy, 'getFileNames').mockImplementationOnce(throwError)
        
        const promise = sut.getSeeds()

        await expect(promise).rejects.toThrow()
    })

    test('should correct products on success', async () => {
        const getFileNamesRepositorySpy = new GetFileNamesRepositorySpy()
        const getProductsByFileNameRepositorySpy = new GetProductsByFileNameRepositorySpy()
        const setFileStatusRepositorySpy = new SetFileStatusRepositorySpy()
        const sut = new RemoteGetProductSeeds(
            getFileNamesRepositorySpy,
            getProductsByFileNameRepositorySpy,
            setFileStatusRepositorySpy
        )
        getFileNamesRepositorySpy.result = [faker.string.sample()]
        
        const products = await sut.getSeeds()

        expect(products).toStrictEqual(getProductsByFileNameRepositorySpy.result)
    })
})