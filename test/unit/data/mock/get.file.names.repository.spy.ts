import { GetFileNamesRepository } from "@/data/protocol/http";
import { faker } from "@faker-js/faker";

export class GetFileNamesRepositorySpy implements GetFileNamesRepository {
    result: string[] = [faker.string.sample(), faker.string.sample(), faker.string.sample()]

    async getFileNames (): Promise<string[]> {
        return this.result
    }
}