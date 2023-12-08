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
})