import { DbConnection } from "@/data/usecase";
import { CheckDatabaseConnection } from "@/domain/usecase";
import { ConnectionMongoRepository } from "@/infra/db/mongodb";

export const makeCheckDatabaseConnection = (): CheckDatabaseConnection => {
    const checkDatabaseConnectionRepository = new ConnectionMongoRepository()
    return new DbConnection(checkDatabaseConnectionRepository)
}