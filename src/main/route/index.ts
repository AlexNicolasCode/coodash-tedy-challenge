
import { Router } from "express"

import { adaptRoute } from "@/main/adapter"
import {
  makeGetProductsController,
  makeGetProductController,
  makeUpdateProductStatusToTrashController,
} from "@/main/factory/controller"

export default (router: Router): void => {
  router.get("/products", adaptRoute(makeGetProductsController()))
  router.get("/products/:code", adaptRoute(makeGetProductController()))
  router.delete("/products/:code", adaptRoute(makeUpdateProductStatusToTrashController()))
}