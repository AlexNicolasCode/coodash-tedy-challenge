import { connection } from "mongoose";

import { CheckDatabaseConnectionRepository } from "@/data/protocol/db";

export class ConnectionMongoRepository implements CheckDatabaseConnectionRepository {
    async checkConnection (): Promise<boolean> {
        const connectedStatus = 1
        return connection.readyState === connectedStatus
    }
}