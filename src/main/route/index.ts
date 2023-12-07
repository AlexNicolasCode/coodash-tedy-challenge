
import { Router } from "express"

import { adaptRoute } from "@/main/adapter"
import { makeGetProductsController } from "@/main/factory/controller"

export default (router: Router): void => {
  router.get("/products", adaptRoute(makeGetProductsController()))
}