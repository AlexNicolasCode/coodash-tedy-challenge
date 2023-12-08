export interface CheckFileHasMappedRepository {
    checkFileHasMapped: (name: string) => Promise<boolean> 
}