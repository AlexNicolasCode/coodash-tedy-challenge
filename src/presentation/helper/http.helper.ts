import { HttpResponse } from "../protocol";

export const ok = <T>(data: T): HttpResponse<T> => ({
    statusCode: 200,
    body: data
})

export const notFound = (): HttpResponse<null>  => ({
    statusCode: 404,
    body: null
})

export const serverError = (): HttpResponse<null>  => ({
    statusCode: 500,
    body: null
})
