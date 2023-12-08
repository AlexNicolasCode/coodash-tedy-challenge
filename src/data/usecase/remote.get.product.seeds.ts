import { Product } from "@/domain/model";
import { GetProductSeeds } from "@/domain/usecase";
import { GetFileNamesRepository, GetProductsByFileNameRepository } from "../protocol/http";
import { SetFileStatusRepository } from "../protocol/db";

export class RemoteGetProductSeeds implements GetProductSeeds {
    constructor (
        private readonly getFileNamesRepository: GetFileNamesRepository,
        private readonly getProductsByFileNameRepository: GetProductsByFileNameRepository,
        private readonly setFileStatusRepository: SetFileStatusRepository,
    ) {}

    async getSeeds (): Promise<Product[]> {
        const fileNames = await this.getFileNamesRepository.getFileNames()
        const products: Product[] = []
        for (const name of fileNames) {
            try {
                const productsByName = await this.getProductsByFileNameRepository.getProductsByFileName(name)
                productsByName.forEach((product) => products.push(product))
                await this.setFileStatusRepository.setFileStatus({
                    name: name,
                    status: 'fetched'
                })
            } catch(error) {
                await this.setFileStatusRepository.setFileStatus({
                    name: name,
                    status: 'error'
                })
            }
        }
        return products
    }
}