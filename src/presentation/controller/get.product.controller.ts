import { GetProduct } from "@/domain/usecase";
import { Controller } from "@/presentation/protocol/controller";
import { Product } from "@/domain/model";
import { HttpResponse } from "@/presentation/protocol";
import { notFound, ok, serverError } from "@/presentation/helper";

export class GetProductController implements Controller<GetProductController.Request, GetProductController.Result> {
    constructor (
        private readonly getProduct: GetProduct
    ) {}

    async handle (request: GetProductController.Request): Promise<HttpResponse<GetProductController.Result>> {
        try {
            const code = request.params.code;
            const product = await this.getProduct.getProduct(code)
            if (!product) {
                return notFound()
            }
            return ok<Product>(product)
        } catch (error) {
            return serverError()
        }
    }
}

export namespace GetProductController {
    export type Request = {
        params: {
            code: number
        }
    }
    export type Result = Product
}