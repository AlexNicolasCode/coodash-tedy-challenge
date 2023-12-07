import { HttpResponse } from "./http";

export interface Controller<T, R> {
    handle: (request: T) => Promise<HttpResponse<R>>
}