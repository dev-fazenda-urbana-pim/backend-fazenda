import { Router } from "express"
import { isAdmin } from "./middlewares/isAdmin"
import { isSupplier } from "./middlewares/isSupplier"
import ProductController from "./product/product-controller"
import SupplierController from "./supplier/supplier-controller"
import UserController from "./user/user-controller"

const router = Router()

router.post("/user/register", UserController.create)
router.post("/user/session", UserController.login)
router.patch("/user/update/:userId", UserController.update)

router.get("/products", ProductController.index)
router.post("/products", isSupplier, ProductController.create)
router.delete("/products/:productId", isSupplier, ProductController.delete)

router.get("/suppliers", SupplierController.index)
router.post("/suppliers", isAdmin, SupplierController.create)
router.patch("/suppliers/:supplierId", isAdmin, SupplierController.update)

export { router }
