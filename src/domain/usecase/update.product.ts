import { Product } from "../model"

export interface UpdateProduct {
    update: (params: UpdateProduct.Request) => Promise<UpdateProduct.Result> 
}

export namespace UpdateProduct {
    export type Request = {
        code: number,
        product: Product
    } 
    export type Result = Product
}