import { Schema, model } from 'mongoose'

import { Product } from '@/domain/model'

const schema = new Schema<Product>({
    code: { type: Number, unique: true },
    status: { type: String, required: true },
    imported_t: { type: Date, default: new Date() },
    url: { type: String, required: false },
    creator: { type: String, required: false },
    created_t: { type: Number },
    last_modified_t: { type: Number },
    product_name: { type: String, required: false },
    quantity: { type: String, required: false },
    brands: { type: String, required: false },
    categories: { type: String, required: false },
    labels: { type: String, required: false },
    cities: { type: String, required: false },
    purchase_places: { type: String, required: false },
    stores: { type: String, required: false },
    ingredients_text: { type: String, required: false },
    traces: { type: String, required: false },
    serving_size: { type: String, required: false },
    serving_quantity: { type: Number, required: false },
    nutriscore_score: { type: Number, required: false },
    nutriscore_grade: { type: String, required: false },
    main_category: { type: String, required: false },
    image_url: { type: String, required: false }
}, {
    timestamps: {
        createdAt: 'created_t',
        updatedAt: 'last_modified_t'
    }
})

export const ProductEntity = model('product', schema)