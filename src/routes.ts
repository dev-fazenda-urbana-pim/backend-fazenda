import { Router } from "express"
import EmployeesController from "./employees/employees-controller"
import { isAdmin } from "./middlewares/isAdmin"
import { isAuthenticated } from "./middlewares/isAuthenticated"
import { isSupplier } from "./middlewares/isSupplier"
import { limiter } from "./middlewares/rateLimit"
import { validateRequest } from "./middlewares/validationMiddleware"
import ProductController from "./product/product-controller"
import { employeeSchemaCreate, employeeSchemaUpdate } from "./schemas/employeeSchemas"
import { productSchemaCreate, productSchemaDelete } from "./schemas/productSchemas"
import { supplierSchemaCreate, supplierSchemaUpdate } from "./schemas/supplierSchemas"
import { userSchemaLogin, userSchemaSignup, userSchemaUpdate } from "./schemas/userSchemas"
import SupplierController from "./supplier/supplier-controller"
import UserController from "./user/user-controller"

const router = Router()

router.get("/user/me", isAuthenticated, UserController.me)
router.post("/user/register", [validateRequest(userSchemaSignup), limiter], UserController.create)
router.post("/user/login", [validateRequest(userSchemaLogin), limiter], UserController.login)
router.patch("/user/update/:userId", validateRequest(userSchemaUpdate), UserController.update)

router.get("/products", ProductController.index)
router.post("/products", [validateRequest(productSchemaCreate), isSupplier], ProductController.create)
router.delete("/products/:productId", [validateRequest(productSchemaDelete), isSupplier], ProductController.delete)

router.get("/suppliers", SupplierController.index)
router.post("/suppliers", [validateRequest(supplierSchemaCreate), isAdmin], SupplierController.create)
router.patch("/suppliers/:supplierId", [validateRequest(supplierSchemaUpdate), isAdmin], SupplierController.update)

router.get("/employees", EmployeesController.index)
router.post("/employees", [validateRequest(employeeSchemaCreate), isAdmin], EmployeesController.create)
router.patch("/employees/:employeeId", [validateRequest(employeeSchemaUpdate), isAdmin], EmployeesController.update)

export { router }
