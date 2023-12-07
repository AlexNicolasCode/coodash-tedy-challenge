import { GetProductController } from "@/presentation/controller";
import { Controller } from "@/presentation/protocol";
import { makeGetProduct } from "../usecase";

export const makeGetProductController = (): Controller<GetProductController.Request, GetProductController.Result> => {
    const getProduct = makeGetProduct()
    return new GetProductController(getProduct)
}