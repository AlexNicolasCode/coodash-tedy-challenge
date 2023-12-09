export interface CheckDatabaseConnectionRepository {
    checkConnection: () => Promise<boolean> 
}