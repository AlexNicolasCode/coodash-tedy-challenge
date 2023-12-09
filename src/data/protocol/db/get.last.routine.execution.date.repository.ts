export interface GetLastRoutineExecutionDateRepository {
    getLastRoutineExecutionDate: () => Promise<Date> 
}