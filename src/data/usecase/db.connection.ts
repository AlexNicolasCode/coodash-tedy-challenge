import { CheckDatabaseConnection } from "@/domain/usecase";
import { CheckDatabaseConnectionRepository } from "../protocol/db";

export class DbConnection implements CheckDatabaseConnection {
    constructor (
        private readonly checkDatabaseConnectionRepository: CheckDatabaseConnectionRepository
    ) {}

    async checkConnection (): Promise<boolean> {
        return this.checkDatabaseConnectionRepository.checkConnection()
    }
}