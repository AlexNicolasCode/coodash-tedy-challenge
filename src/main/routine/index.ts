import { adaptRoutine } from "@/main/adapter"
import { makeSeedProductRoutine } from "../factory/routine"

export default (): void => {
    adaptRoutine('0 1 * * *', makeSeedProductRoutine())
}