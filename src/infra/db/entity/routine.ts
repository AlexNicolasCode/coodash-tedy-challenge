import { Schema, model } from 'mongoose'

const schema = new Schema({
    name: { type: String, required: true },
    status: { type: String, required: true },
    last_run: { type: Date, required: true },
})

export const RoutineEntity = model('routine', schema)