import { GetAppDataController } from "@/presentation/controller";
import { Controller } from "@/presentation/protocol";
import { makeCheckDatabaseConnection, makeGetInfraStatus, makeGetLastRoutineExecutionDate } from "../usecase";

export const makeGetAppDataController = (): Controller<GetAppDataController.Request, GetAppDataController.Result> => {
    const checkDatabaseConnection = makeCheckDatabaseConnection()
    const getInfraStatus = makeGetInfraStatus()
    const getLastRoutineExecutionDate = makeGetLastRoutineExecutionDate()
    return new GetAppDataController(
        checkDatabaseConnection,
        getInfraStatus,
        getLastRoutineExecutionDate,
    )
}