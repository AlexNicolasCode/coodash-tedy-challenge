export interface GetFileNamesRepository {
    getFileNames: () => Promise<string[]> 
}
