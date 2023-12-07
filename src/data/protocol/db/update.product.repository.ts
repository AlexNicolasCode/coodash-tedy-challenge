import { Product } from "@/domain/model"

export interface UpdateProductRepository {
    update: (params: UpdateProductRepository.Request) => Promise<UpdateProductRepository.Result> 
}

export namespace UpdateProductRepository {
    export type Request = {
        code: number
        product: Product
    }
    export type Result = Product
}