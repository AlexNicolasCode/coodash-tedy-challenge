import { UpdateProductStatusToTrashController } from "@/presentation/controller";
import { Controller } from "@/presentation/protocol";
import { makeUpdateProductStatusToTrash } from "../usecase";

export const makeUpdateProductStatusToTrashController = (): Controller<UpdateProductStatusToTrashController.Request, UpdateProductStatusToTrashController.Result> => {
    const updateProductStatusToTrash = makeUpdateProductStatusToTrash()
    return new UpdateProductStatusToTrashController(updateProductStatusToTrash)
}