import { Controller } from "@/presentation/protocol/controller";
import { HttpResponse } from "@/presentation/protocol";
import { noContent, serverError } from "@/presentation/helper";
import { UpdateProductStatusToTrash } from "@/domain/usecase";

export class UpdateProductStatusToTrashController implements Controller<UpdateProductStatusToTrashController.Request, UpdateProductStatusToTrashController.Result> {
    constructor (
        private readonly updateProductStatusToTrash: UpdateProductStatusToTrash
    ) {}

    async handle (request: UpdateProductStatusToTrashController.Request): Promise<HttpResponse<void>> {
        try {
            const code = request.params.code
            await this.updateProductStatusToTrash.updateStatusToTrash(code)
            return noContent()
        } catch (error) {
            return serverError()
        }
    }
}

export namespace UpdateProductStatusToTrashController {
    export type Request = {
        params: {
            code: number
        }
    }
    export type Result = void
}