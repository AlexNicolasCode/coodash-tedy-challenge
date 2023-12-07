import { faker } from "@faker-js/faker"

import { Product } from "@/domain/model"

export const mockProduct = (): Product => ({
    code: faker.number.int(),
    status: faker.helpers.arrayElement(['draft', 'trash', 'published']),
    imported_t: faker.date.recent(),
    url: faker.internet.url(),
    creator: faker.internet.userName(),
    created_t: Number(faker.date.recent().toISOString()),
    last_modified_t: Number(faker.date.recent().toISOString()),
    product_name: faker.commerce.productName(),
    quantity: faker.number.int().toString(),
    brands: faker.company.name(),
    categories: faker.string.alphanumeric(),
    labels: faker.string.alphanumeric(),
    cities: faker.string.alphanumeric(),
    purchase_places: faker.string.alphanumeric(),
    stores: faker.string.alphanumeric(),
    ingredients_text: faker.string.alphanumeric(),
    traces: faker.string.alphanumeric(),
    serving_size: faker.string.alphanumeric(),
    serving_quantity: faker.number.int(),
    nutriscore_score: faker.number.int(),
    nutriscore_grade: faker.string.alphanumeric(),
    main_category: faker.string.alphanumeric(),
    image_url: faker.internet.url()
})