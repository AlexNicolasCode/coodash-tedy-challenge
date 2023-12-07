
import { Router } from "express"

import { adaptRoute } from "@/main/adapter"
import {
  makeGetProductsController,
  makeGetProductController,
  makeUpdateProductStatusToTrashController,
  makeUpdateProductController,
} from "@/main/factory/controller"

export default (router: Router): void => {
  router.get("/products", adaptRoute(makeGetProductsController()))
  router.get("/products/:code", adaptRoute(makeGetProductController()))
  router.put("/products/:code", adaptRoute(makeUpdateProductController()))
  router.delete("/products/:code", adaptRoute(makeUpdateProductStatusToTrashController()))
}