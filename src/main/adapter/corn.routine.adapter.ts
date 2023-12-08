import cron from "node-cron"

import { Routine } from "@/routine/protocol"

export const adaptRoutine = (time: string, routine: Routine) => {
    cron.schedule(time, routine.handle, {
        scheduled: true,
        timezone: "America/Sao_Paulo"
    })
}