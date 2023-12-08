import { GetFileNamesRepositorySpy, GetProductsByFileNameRepositorySpy, SetFileStatusRepositorySpy } from "../mock"
import { RemoteGetProductSeeds } from "@/data/usecase"

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
})