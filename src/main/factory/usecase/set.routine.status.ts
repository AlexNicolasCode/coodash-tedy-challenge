import { DbRoutineStatus } from "@/data/usecase/db.routine.status";
import { SetRoutineStatus } from "@/domain/usecase";
import { RoutineMongoRepository } from "@/infra/db/mongodb/routine.mongo.repository";

export const makeSetRoutineStatus = (): SetRoutineStatus => {
    const setRoutineStatusRepository = new RoutineMongoRepository()
    const getLastRoutineExecutionDateRepository = new RoutineMongoRepository()
    return new DbRoutineStatus(setRoutineStatusRepository, getLastRoutineExecutionDateRepository)
}