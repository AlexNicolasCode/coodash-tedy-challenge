import path from 'path'
import { existsSync, createReadStream, createWriteStream } from 'node:fs'
import { writeFile, unlink } from 'node:fs/promises'
import { createInterface } from 'readline/promises'
import { createGunzip } from 'zlib'
import { pipeline } from 'node:stream/promises'

import { Product } from '@/domain/model'
import { GetFileNamesRepository, GetProductsByFileNameRepository } from "@/data/protocol/http";
import { makeHttpProductClient } from "./http.product.client";

const httpProductClient = makeHttpProductClient()

export class HttpProductRepository implements GetFileNamesRepository, GetProductsByFileNameRepository {    
    async getFileNames (): Promise<string[]> {
        const response = await httpProductClient.get('index.txt')
        if (response.status === 200) {
            const fileNames = response.data.split('\n')
            fileNames.pop()
            return fileNames
        }
        return []
    }

    async getProductsByFileName (name: string): Promise<Product[]> {
        const response = await httpProductClient.get(
            name,
            { responseType: "stream" }
        )
        if (response.status === 200) {
            const filePath = path.resolve(__dirname, '../../main/temp', name)
            if (!existsSync(filePath)) {
                await writeFile(filePath, response.data);
            }
            const jsonFilePath = filePath.replace('.gz', '')
            if (!existsSync(jsonFilePath)) {
                const gzip = createGunzip()
                const source = createReadStream(filePath);
                const destination = createWriteStream(jsonFilePath)
                await pipeline(source, gzip, destination)
            }
            const readableStream = createReadStream(jsonFilePath, 'utf8')
            const readline = createInterface({
                input: readableStream,
            });
            const products: Product[] = []
            for await (const line of readline) {
                products.push(this.convertToProductFormat(line));
                if (products.length >= 100) {
                    readline.close()
                    unlink(filePath)
                    unlink(jsonFilePath)
                    break
                }
            }
            return products
        }
    }

    convertToProductFormat (line: string): Product {
        const json = JSON.parse(line)
        return {
            code: Number(json.code.replace('"', '')),
            status: 'draft',
            url: json.url,
            creator: json.creator,
            created_t: json.created_t,
            last_modified_t: Number(json.last_modified_t),
            product_name: json.product_name,
            quantity: json.quantity,
            brands: json.brands,
            categories: json.categories,
            labels: json.labels,
            cities: json.cities,
            purchase_places: json.purchase_places,
            stores: json.stores,
            ingredients_text: json.ingredients_text,
            traces: json.traces,
            serving_size: json.serving_size,
            serving_quantity: json.serving_quantity,
            nutriscore_score: json.nutriscore_score,
            nutriscore_grade: json.nutriscore_grade,
            main_category: json.main_category,
            image_url: json.image_url
        }
    }
}