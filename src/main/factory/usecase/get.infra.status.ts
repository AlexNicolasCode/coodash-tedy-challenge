import { LocalGetInfraStatus } from "@/data/usecase";
import { GetInfraStatus } from "@/domain/usecase";

export const makeGetInfraStatus = (): GetInfraStatus => {
    return new LocalGetInfraStatus()
}