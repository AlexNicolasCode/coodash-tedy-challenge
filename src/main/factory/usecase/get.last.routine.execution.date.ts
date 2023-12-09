import { DbRoutineStatus } from "@/data/usecase/db.routine.status";
import { GetLastRoutineExecutionDate } from "@/domain/usecase";
import { RoutineMongoRepository } from "@/infra/db/mongodb/routine.mongo.repository";

export const makeGetLastRoutineExecutionDate = (): GetLastRoutineExecutionDate => {
    const setRoutineStatusRepository = new RoutineMongoRepository()
    const getLastRoutineExecutionDateRepository = new RoutineMongoRepository()
    return new DbRoutineStatus(setRoutineStatusRepository, getLastRoutineExecutionDateRepository)
}