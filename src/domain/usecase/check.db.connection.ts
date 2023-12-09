export interface CheckDatabaseConnection {
    checkConnection: () => Promise<boolean>
}