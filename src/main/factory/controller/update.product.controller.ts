import { UpdateProductController } from "@/presentation/controller";
import { Controller } from "@/presentation/protocol";
import { makeUpdateProduct } from "../usecase";

export const makeUpdateProductController = (): Controller<UpdateProductController.Request, UpdateProductController.Result> => {
    const updateProduct = makeUpdateProduct()
    return new UpdateProductController(updateProduct)
}