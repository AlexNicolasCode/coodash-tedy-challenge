import { Schema, model } from 'mongoose'

const schema = new Schema({
    name: { type: String, required: true },
    status: { type: String, required: true },
})

export const SeedEntity = model('seed', schema)