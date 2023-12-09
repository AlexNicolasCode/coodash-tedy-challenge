import { SetRoutineStatusRepository } from "@/data/protocol/db";
import { RoutineEntity } from "../entity";

export class RoutineMongoRepository implements SetRoutineStatusRepository {
    async setStatus (params: SetRoutineStatusRepository.Params): Promise<void> {
        const exists = await RoutineEntity.exists({
            name: params.name
        })
        if (exists) {
            await RoutineEntity.updateOne({
                name: params.name
            }, {
                status: params.status,
                last_run: params.date
            })
            return
        }
        await RoutineEntity.create({
            name: params.name,
            status: params.status,
            last_run: params.date
        })
    }
}