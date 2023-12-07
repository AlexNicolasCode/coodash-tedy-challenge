import { GetProductsController } from "@/presentation/controller";
import { Controller } from "@/presentation/protocol";
import { makeGetProducts } from "../usecase";

export const makeGetProductsController = (): Controller<GetProductsController.Request, GetProductsController.Result> => {
    const getProducts = makeGetProducts()
    return new GetProductsController(getProducts)
}