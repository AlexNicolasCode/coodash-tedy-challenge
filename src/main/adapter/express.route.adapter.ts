import { Controller } from '@/presentation/protocol'

import { Request, Response } from 'express'

export const adaptRoute = <T, R>(controller: Controller<T, R>) => {
  return async (req: Request, res: Response) => {
    const request = {
        params: req.params || {},
        body: req.body || {},
    } as T
    const httpResponse = await controller.handle(request)
    if (httpResponse.statusCode >= 200 && httpResponse.statusCode <= 299) {
      res.status(httpResponse.statusCode).json(httpResponse.body)
    } else {
      res.status(httpResponse.statusCode).json({
        error: httpResponse.body
      })
    }
  }
}