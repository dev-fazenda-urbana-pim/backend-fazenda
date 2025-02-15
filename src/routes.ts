import { Router } from "express"
import EmployeesController from "./employees/employees-controller"
import { isAdmin } from "./middlewares/isAdmin"
import { isAuthenticated } from "./middlewares/isAuthenticated"
import { isSupplier } from "./middlewares/isSupplier"
import { limiter } from "./middlewares/rateLimit"
import { userSchemaLogin, userSchemaSignup } from "./middlewares/validations/userSchemas"
import { validateData } from "./middlewares/validations/validationMiddleware"
import ProductController from "./product/product-controller"
import SupplierController from "./supplier/supplier-controller"
import UserController from "./user/user-controller"

const router = Router()

router.get("/user/me", isAuthenticated, UserController.me)
router.post("/user/register", [validateData(userSchemaSignup), limiter], UserController.create)
router.post("/user/login", [validateData(userSchemaLogin), limiter], UserController.login)
router.patch("/user/update/:userId", UserController.update)

router.get("/products", ProductController.index)
router.post("/products", isSupplier, ProductController.create)
router.delete("/products/:productId", isSupplier, ProductController.delete)

router.get("/suppliers", SupplierController.index)
router.post("/suppliers", isAdmin, SupplierController.create)
router.patch("/suppliers/:supplierId", isAdmin, SupplierController.update)

router.get("/employees", EmployeesController.index)
router.post("/employees", EmployeesController.create)
router.patch("/employees/:employeeId", EmployeesController.update)

export { router }
