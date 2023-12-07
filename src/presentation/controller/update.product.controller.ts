import { Controller } from "@/presentation/protocol/controller";
import { HttpResponse } from "@/presentation/protocol";
import { ok, serverError } from "@/presentation/helper";
import { UpdateProduct } from "@/domain/usecase";
import { Product } from "@/domain/model";

export class UpdateProductController implements Controller<UpdateProductController.Request, UpdateProductController.Result> {
    constructor (
        private readonly updateProduct: UpdateProduct
    ) {}

    async handle (request: UpdateProductController.Request): Promise<HttpResponse<UpdateProductController.Result>> {
        try {
            const code = request.params.code
            const product = request.body
            const updatedProduct = await this.updateProduct.update({ code, product })
            return ok(updatedProduct)
        } catch (error) {
            return serverError()
        }
    }
}

export namespace UpdateProductController {
    export type Request = {
        params: {
            code: number
        }
        body: Product
    }
    export type Result = Product
}