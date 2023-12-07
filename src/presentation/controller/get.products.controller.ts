import { GetProducts } from "@/domain/usecase";
import { Controller } from "@/presentation/protocol/controller";
import { Product } from "@/domain/model";
import { HttpResponse } from "@/presentation/protocol";
import { ok, serverError } from "@/presentation/helper";

export class GetProductsController implements Controller<GetProductsController.Request, GetProductsController.Result> {
    constructor (
        private readonly getProducts: GetProducts
    ) {}

    async handle (request: GetProductsController.Request): Promise<HttpResponse<GetProductsController.Result>> {
        try {
            const page = request.query.page ?? 1;
            const products = await this.getProducts.getProducts(page)
            return ok<Product[]>(products)
        } catch (error) {
            return serverError()
        }
    }
}

export namespace GetProductsController {
    export type Request = {
        query: {
            page: number
        }
    }
    export type Result = Product[]
}