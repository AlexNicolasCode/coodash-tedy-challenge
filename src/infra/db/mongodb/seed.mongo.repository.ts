import { SeedEntity } from "../entity";
import { SetFileStatusRepository } from "@/data/protocol/db";

export class SeedMongoRepository implements SetFileStatusRepository {
    async setFileStatus (params: SetFileStatusRepository.Request): Promise<void> {
        const fileExists = await SeedEntity.exists({
            name: params.name
        })
        if (!fileExists) {
            await SeedEntity.create({
                name: params.name,
                status: params.status
            })
        } else {
            await SeedEntity.updateOne({
                name: params.name
            }, {
                status: params.status
            })
        }
    }
}