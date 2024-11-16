import { Router } from "express"
import { isSupplier } from "./middlewares/isSupplier"
import ProductController from "./product/product-controller"
import UserController from "./user/user-controller"

const router = Router()

router.post("/user/register", UserController.create)
router.post("/user/session", UserController.login)
router.patch("/user/update/:userId", UserController.update)

router.post("/products", isSupplier, ProductController.create)

export { router }
